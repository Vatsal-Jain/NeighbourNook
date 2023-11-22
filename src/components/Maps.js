import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {StyleSheet, View, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import React, {useState, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Maps = ({
  height,
  marginHor,
  selectedEvent,
  setSelectedEvent,
  mapView,
  data,
}) => {
  // const [currentLocation, setCurrentLocation] = useState(null);
  // const getCurrentLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const {latitude, longitude} = position.coords;
  //       console.log(latitude, longitude);
  //       setCurrentLocation({latitude, longitude});
  //     },
  //     error => {
  //       console.log('erro message', error.message);
  //     },
  //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
  //   );
  // };

  // useEffect(() => {
  //   getCurrentLocation();
  // }, []);

  const [region, setRegion] = useState({
    latitude: 24.89381259,
    longitude: 74.62686419,
    latitudeDelta: 0.07,
    longitudeDelta: 0.07,
  });
  return (
    <View
      style={{
        marginHorizontal: marginHor,
      }}>
      {/* {currentLocation && ( */}
      <MapView
        // initialRegion={{
        //   latitude: 24.89381259,
        //   longitude: 74.62686419,
        //   latitudeDelta: 0.03,
        //   longitudeDelta: 0.03,
        // }}
        ref={mapView}
        zoomEnabled={true}
        zoomControlEnabled={true}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{width: '100%', height: height}}
        initialRegion={region}
        onRegionChange={region => setRegion(region)}>
        {data?.map(item => {
          return (
            <Marker
              key={item.id}
              coordinate={{latitude: item.latitude, longitude: item.longitude}}
              title={item.brand}
              description={item.offerHeader}
              onPress={() => setSelectedEvent(item.id)}
              pinColor={item.locationPin}
            />
          );
        })}
        {/* <Marker
          coordinate={{latitude: 24.86, longitude: 74.789}}
          title="Niche Bakery"
          description="Buy 1 Get 1 on Cakes"
          onPress={() => setSelectedEvent(1)}
        />
        <Marker
          coordinate={{latitude: 24.87392618, longitude: 74.592704653}}
          title="Ram Grociers"
          description="Free Delivery"
          onPress={() => setSelectedEvent(2)}
        />
        <Marker
          coordinate={{latitude: 24.89392618, longitude: 74.652704653}}
          title="Sam Salon"
          description="Get 50% Off On Shaving"
          pinColor="orange"
          onPress={() => setSelectedEvent(3)}
        />
    
        <Marker
          pinColor="blue"
          coordinate={{latitude: 24.87392618, longitude: 74.62704653}}
          title="Ravi Juices"
          description="Kivi Milkshake @30% Off"
          onPress={() => setSelectedEvent(4)}
        />

        <Marker
          coordinate={{latitude: 24.889205, longitude: 74.6216862}}
          title="DMA Pharmacy"
          description="Get 20% Off On Medicines"
          pinColor="green"
          onPress={() => setSelectedEvent(5)}
        /> */}
      </MapView>
      {/* )} */}

      {/* <Text
        style={{
          fontSize: 20,
          color: '#2e2e2e',
          fontWeight: '700',
          position: 'absolute',
          top: 10,
          backgroundColor: 'white',
          padding: 10,
          alignSelf: 'center',
          borderRadius: 10,
        }}>
        Nearby Offers{' '}
        <MaterialIcons name="local-offer" color={'red'} size={20} />
      </Text> */}
    </View>
  );
};

export default Maps;
