import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {Session} from '@supabase/supabase-js';
import {supabase} from '../services/supabaseServices';
import 'react-native-url-polyfill/auto';

const RootNavigation = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (session && session.user) {
    return <AppStack />;
  } else {
    return <AuthStack />;
  }
};

export default RootNavigation;

const styles = StyleSheet.create({});
