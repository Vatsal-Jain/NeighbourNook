import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Button,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import {supabase} from '../services/supabaseServices';
import {FlashList} from '@shopify/flash-list';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Community = ({navigation}) => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const [users, setUsers] = useState([]);
  async function getAllUsers() {
    console.log('get all users called');
    const {data, error} = await supabase
      .from('profiles')
      .select(`id, full_name, username,avatar_url`);
    if (error) console.log(error.message);
    console.log('data is', data);
    setUsers(data ?? []);
    setRefreshing(false);
  }

  useEffect(() => {
    if (session) getAllUsers();
  }, [session]);

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true);
    getAllUsers();
  };

  return (
    <View style={{flex: 1}}>
      <View style={{height: 800, backgroundColor: 'lightgray'}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '700',
            marginVertical: 10,
          }}>
          Community Memembers
        </Text>
        <FlashList
          data={users}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          renderItem={({item}) => (
            <View
              style={{
                width: '90%',
                backgroundColor: 'white',
                alignSelf: 'center',
                marginBottom: 10,
                padding: 10,
                flexDirection: 'row',
                borderRadius: 10,
              }}>
              <Image
                source={{
                  uri: item.avatar_url
                    ? item.avatar_url
                    : 'https://i.pinimg.com/474x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg',
                }}
                style={{width: 40, height: 40, borderRadius: 20}}
                resizeMode="contain"
              />
              <View style={{flexDirection: 'column', marginHorizontal: 10}}>
                <Text
                  style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
                  {item.full_name ? item.full_name : 'User'}
                </Text>
                <Text style={{color: 'gray', fontSize: 12}}>
                  @{item.username ? item.username : 'username'}
                </Text>
              </View>
            </View>
          )}
          estimatedItemSize={200}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Account')}
        style={{
          backgroundColor: 'black',
          width: '90%',
          elevation: 10,
          padding: 10,
          alignSelf: 'center',
          borderRadius: 10,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 20,
        }}>
        <Text style={{color: 'white', fontSize: 16, marginRight: 10}}>
          My Account
        </Text>
        <Ionicons name="person" color={'white'} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default Community;

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
    marginHorizontal: 10,
  },
});
