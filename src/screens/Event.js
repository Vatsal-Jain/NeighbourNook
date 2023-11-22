import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';

import {supabase} from '../services/supabaseServices';

const Event = () => {
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

  async function getBusiness() {
    try {
      setLoading(true);
      console.log('get business called');
      if (!session?.user) throw new Error('No user on the session!');

      const {data, error, status} = await supabase.from('business').select('*');

      if (error && status !== 406) {
        throw error;
      }
      // console.log('data from bsuiness is', data, status);
      if (data) {
        setBusinessName(data.business_name);
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setBusinessImage(data.business_logo_url);
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
  return (
    <View>
      <Text>Event</Text>
    </View>
  );
};

export default Event;

const styles = StyleSheet.create({});
