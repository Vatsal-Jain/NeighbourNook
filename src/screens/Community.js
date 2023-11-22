import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Text,
  Button,
  TouchableOpacity,
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
      .select(`id, full_name, username`);
    if (error) console.log(error.message);
    setUsers(data ?? []);
  }

  useEffect(() => {
    if (session) getAllUsers();
  }, [session]);

  return (
    <View>
      <Text>Community Members</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Account')}
        style={{
          backgroundColor: 'lightblue',
          width: '90%',
          elevation: 10,
          padding: 10,
          alignSelf: 'center',
          borderRadius: 10,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'black', fontSize: 16, marginRight: 10}}>
          My Account
        </Text>
        <Ionicons name="person" color={'black'} size={20} />
      </TouchableOpacity>

      <View style={{height: 200}}>
        <FlashList
          data={users}
          renderItem={({item}) => <Text>{item.full_name}</Text>}
          estimatedItemSize={200}
        />
      </View>
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
