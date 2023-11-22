import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Maps from '../components/Maps';
import Stories from '../components/Stories';
import Feed from './Feed';
import Slider from '../components/Slider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {supabase} from '../services/supabaseServices';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [feedsData, setFeedsData] = useState([]);
  const navigation = useNavigation();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) getFeed();
  }, [session]);

  async function getFeed() {
    try {
      setLoading(true);
      console.log('get events called');
      if (!session?.user) throw new Error('No user on the session!');

      const {data, error, status} = await supabase.from('posts')
        .select(`id,post_image,post_title,post_location,created_at,user_id(
        id,
        full_name,
        avatar_url
      )`);

      if (error && status !== 406) {
        throw error;
      }

      console.log('data from events is', data, status);
      if (data) {
        setFeedsData(data ?? []);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true);
    getFeed();
  };
  return (
    <SafeAreaView style={{paddingVertical: 20, paddingHorizontal: 10}}>
      {/* <ScrollView> */}
      {/* <Stories /> */}
      <Slider />
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <Feed
          feedsData={feedsData}
          refreshing={refreshing}
          handleRefresh={handleRefresh}
        />
      )}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
