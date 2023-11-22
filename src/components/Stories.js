import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

const Stories = () => {
  const storyData = [
    {
      id: 1,
      name: 'Vatsal Jain',
      image: 'https://picsum.photos/200/300?random=1',
    },
    {
      id: 2,
      name: 'Ram Kapoor',
      image: 'https://picsum.photos/200/300?random=2',
    },
    {
      id: 3,
      name: 'Devesh',
      image: 'https://picsum.photos/200/300?random=3',
    },
    {
      id: 4,
      name: 'Vadim',
      image: 'https://picsum.photos/200/300?random=4',
    },
    {
      id: 5,
      name: 'Shobha',
      image: 'https://picsum.photos/200/300?random=5',
    },
    {
      id: 6,
      name: 'Mayur',
      image: 'https://picsum.photos/200/300?random=6',
    },
    {
      id: 7,
      name: 'Chirag',
      image: 'https://picsum.photos/200/300?random=7',
    },
    {
      id: 8,
      name: 'Divya',
      image: 'https://picsum.photos/200/300?random=8',
    },
  ];
  return (
    <SafeAreaView>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: 'black',
          marginHorizontal: 10,
          marginBottom: 10,
        }}>
        Recent Stories
      </Text>
      <FlatList
        data={storyData}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{
                marginRight: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                height: 70,
              }}>
              <Image
                source={{uri: item?.image}}
                style={{width: 50, height: 50, borderRadius: 25}}
              />
              <Text style={{color: 'black'}}>{item?.name?.split(' ')[0]}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Stories;

const styles = StyleSheet.create({});
