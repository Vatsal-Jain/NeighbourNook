import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

const RootNavigation = () => {
  const user = true;
  if (user) {
    return <AppStack />;
  } else {
    return <AuthStack />;
  }
};

export default RootNavigation;

const styles = StyleSheet.create({});
