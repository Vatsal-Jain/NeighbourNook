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
import MemberItem from '../components/MemberItem';
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
            marginBottom: 10,
            padding: 10,
            backgroundColor: 'white',
          }}>
          Neighbour Nook Community
        </Text>
        <FlashList
          data={users}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          renderItem={({item}) => <MemberItem item={item} />}
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
          justifyContent: 'space-between',
          position: 'absolute',
          bottom: 20,
        }}>
        <Text style={{color: 'white', fontSize: 16}}>My Account</Text>
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
