import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OfferHeader = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        padding: 10,
        alignSelf: 'center',
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 20,
          color: '#2e2e2e',
          fontWeight: '700',

          textAlign: 'center',
        }}>
        Nearby Offers{' '}
      </Text>
      <MaterialIcons
        name="local-offer"
        color={'red'}
        size={20}
        style={{marginLeft: 5}}
      />
    </View>
  );
};

export default OfferHeader;

const styles = StyleSheet.create({});
