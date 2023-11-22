import {StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import Maps from '../components/Maps';
import Stories from '../components/Stories';
import Feed from './Feed';
import Slider from '../components/Slider';

const Home = () => {
  return (
    <SafeAreaView style={{paddingVertical: 20, paddingHorizontal: 10}}>
      <ScrollView>
        <Stories />
        <Slider />

        <Feed />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
