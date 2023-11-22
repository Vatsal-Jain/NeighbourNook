import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useRef, useMemo, useCallback, useEffect} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {offerData} from '../assets/json/offerData';
import {supabase} from '../services/supabaseServices';

const Offers = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const [loading, setLoading] = useState(true);
  const [businessName, setBusinessName] = useState('');
  const [longitude, setLongitude] = useState(0);
  const [businessImage, setBusinessImage] = useState('');
  const [latitude, setLatitude] = useState(0);

  const [dealsData, setDealsData] = useState([]);

  async function getBusiness() {
    try {
      setLoading(true);

      if (!session?.user) throw new Error('No user on the session!');

      const {data, error, status} = await supabase.from('deals')
        .select(`id,offer_description,offer_header,business_id (
     
        latitude,longitude,business_logo_url,locationPin,business_name
      )`);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setDealsData(data ?? []);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session) getBusiness();
  }, [session]);

  const mapView = useRef(null);

  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['30%', '50%', '70%', '90%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {}, []);

  const [selectedEvent, setSelectedEvent] = useState('');
  const [region, setRegion] = useState({
    latitude: 24.89381259,
    longitude: 74.62686419,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <>
          <MapView
            ref={mapView}
            zoomEnabled={true}
            zoomControlEnabled={true}
            showsUserLocation={true}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{width: '100%', height: '100%'}}
            initialRegion={region}
            //onRegionChange={region => setRegion(region)}
          >
            {dealsData?.map(item => {
              return (
                <Marker
                  draggable
                  key={item.id}
                  coordinate={{
                    latitude: item.business_id.latitude,
                    longitude: item.business_id.longitude,
                  }}
                  title={item.business_id.business_name}
                  description={item.offer_header}
                  onPress={() => {
                    setSelectedEvent(item);
                    bottomSheetRef.current.snapToIndex(0);
                  }}
                  pinColor={item.business_id.locationPin}
                />
              );
            })}
          </MapView>

          <BottomSheet
            enablePanDownToClose
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <BottomSheetFlatList
              data={dealsData}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedEvent(item);
                      mapView.current.animateToRegion({
                        latitude: item.business_id.latitude - 0.05,
                        longitude: item.business_id.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                      });
                      bottomSheetRef.current.snapToIndex(1);
                    }}
                    style={{
                      backgroundColor:
                        selectedEvent == item
                          ? item.business_id.locationPin
                          : 'white',
                      borderRadius: 10,
                      padding: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                      marginHorizontal: 10,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '20%',

                        justifyContent: 'center',
                      }}>
                      <Image
                        source={{uri: item?.business_id?.business_logo_url}}
                        style={{width: 30, height: 30, borderRadius: 10}}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '700',
                          marginTop: 5,
                          textAlign: 'center',
                          color: selectedEvent == item ? 'white' : 'black',
                        }}>
                        {item?.business_id?.business_name}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',

                        width: '80%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          width: '90%',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '800',
                            color: selectedEvent == item ? 'white' : 'black',
                          }}>
                          {item.offer_header}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '400',
                            color: selectedEvent == item ? 'white' : 'black',
                          }}>
                          {item.offer_description}
                        </Text>
                      </View>

                      <Ionicons
                        style={{alignSelf: 'center'}}
                        name="location"
                        color={
                          selectedEvent == item
                            ? 'white'
                            : item.business_id.locationPin
                        }
                        size={30}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </BottomSheet>
        </>
      )}
    </View>
  );
};

export default Offers;
