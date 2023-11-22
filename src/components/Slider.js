import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';

const Slider = () => {
  return (
    <View style={{marginVertical: 10, marginHorizontal: 10}}>
      <Text style={{color: 'black', fontSize: 16, fontWeight: '700'}}>
        Events and Offers
      </Text>
      <View style={styles.offerSlider}>
        <Swiper
          autoplay={true}
          autoplayTimeout={3}
          showsButtons={true}
          nextButton={<Text style={styles.btntext}>{'>'}</Text>}
          prevButton={<Text style={styles.btntext}>{'<'}</Text>}>
          <View style={styles.slide}>
            <Image
              source={{
                uri: 'https://drop.ndtv.com/albums/NEWS/tree-plantation-in-india/tree-plantation-in-india-green-yatra.jpg',
              }}
              style={styles.image}
              resizeMode="stretch"
            />
          </View>

          <View style={styles.slide}>
            <Image
              source={{
                uri: 'https://as2.ftcdn.net/v2/jpg/05/40/90/23/1000_F_540902314_FwRpb9Ud59X1vwPkSVTVdwL1CQZS503C.jpg',
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/images/slider2.jpg')}
              style={styles.image}
            />
          </View>
        </Swiper>
      </View>
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  offerSlider: {
    width: '100%',
    height: 150,

    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  image: {
    // resizeMode: 'contain',
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  slide: {
    width: '100%',
    height: 150,
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    display: 'flex',
  },
  btntext: {
    color: '#000',
    fontSize: 30,
    backgroundColor: 'white',
    fontWeight: '500',
    borderRadius: 15,
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 32,
    opacity: 1,
  },
});
