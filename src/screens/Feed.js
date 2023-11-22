import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const Feed = ({feedsData, refreshing, handleRefresh}) => {
  // const feedData = [
  //   {
  //     id: 1,
  //     username: 'Vatsal Jain',
  //     image: 'https://picsum.photos/200/300?random=9',
  //     location: 'John Street',
  //     postImage: 'https://picsum.photos/600/300?random=10',
  //     caption: 'City View',
  //   },
  //   {
  //     id: 2,
  //     username: 'Mukesh Rawat',
  //     image: 'https://picsum.photos/200/300?random=12',
  //     location: 'Collectrate',
  //     postImage:
  //       'https://firebasestorage.googleapis.com/v0/b/score-dekho-e99ca.appspot.com/o/Lost%20and%20Found%2FAdd%20a%20heading.png?alt=media&token=e62f5882-eb0c-4906-84e9-624ba7e8744d',
  //     caption: 'Lost and Found',
  //   },
  //   {
  //     id: 3,
  //     username: 'Danny Rao',
  //     image: 'https://picsum.photos/200/300?random=13',
  //     location: 'Fresh Bakes',
  //     postImage:
  //       'https://3brothersbakery.com/wp-content/uploads/2019/02/Houston%E2%80%99s-Specialty-Bakery.png',
  //     caption: 'Trying Cupcake at Fresh Bakes',
  //   },
  //   {
  //     id: 4,
  //     username: 'Viru Singh',
  //     image: 'https://picsum.photos/200/300?random=16',
  //     location: 'Sam Salon',
  //     postImage:
  //       'https://www.bodycraft.co.in/wp-content/uploads/salon-4-mens-styling.png',
  //     caption: 'Enjoying 50% discount on Sam Salon',
  //   },
  // ];

  return (
    <SafeAreaView style={{margin: 5}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 5,
          marginBottom: 5,
        }}>
        <Text
          style={{
            fontSize: 16,

            fontWeight: '700',
          }}>
          Community Feed
        </Text>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        data={feedsData}
        numColumns={2} // Set the number of columns to 2
        renderItem={({item}) => {
          return (
            <View
              style={{
                flex: 1,
                margin: 5,
                backgroundColor: 'white',
                borderRadius: 5,
                padding: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Image
                  source={{
                    uri: item.user_id.avatar_url
                      ? item.user_id.avatar_url
                      : 'https://i.pinimg.com/474x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg',
                  }}
                  style={{width: 30, height: 30, borderRadius: 15}}
                  resizeMode="contain"
                />

                <View style={{flexDirection: 'column', marginLeft: 5}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'black',
                      fontWeight: '500',
                    }}>
                    {item.user_id.full_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'gray',
                      fontWeight: '300',
                    }}>
                    {item.post_location}
                  </Text>
                </View>
              </View>
              <Image
                source={{uri: item.post_image}}
                style={{width: '100%', height: 120}}
                resizeMode="cover"
              />
              <Text style={{fontSize: 13, marginTop: 5}}>
                #{item.post_title}
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Feed;

const styles = StyleSheet.create({});
