import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {Text} from 'react-native-elements';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PushNotification from 'react-native-push-notification';

const EventItem = ({item}) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const timestamp = item.event_time;
  const dateTimeMoment = moment(timestamp);
  const formattedDate = dateTimeMoment.format('MMMM Do YYYY');
  const formattedTime = dateTimeMoment.format('h:mm:ss a');
  const formattedDateTime = moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');

  const handleNotification = (item, isRegistered) => {
    PushNotification.cancelAllLocalNotifications();
    let message = `Thanks For Registration`;
    let title = `You have registered for ${item.event_name}`;
    if (!isRegistered) {
      message = 'Cancelled Registration';
      title = `Registration cancelled for ${item.event_name}`;
    }
    PushNotification.localNotification({
      channelId: 'event-channel',
      title: title,
      message: message,
      bigText: message,
      color: 'red',
      id: 1,
      picture: item.event_banner_url,
      bigLargeIconUrl: item.event_banner_url,
      largeIconUrl: item.event_banner_url,
      playSound: true,
      soundName: 'default',
    });
  };
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,

        flexDirection: 'row',
      }}>
      <View
        style={{
          flexDirection: 'column',
          width: '25%',

          alignItems: 'center',
        }}>
        <Image
          source={{uri: item.event_banner_url}}
          style={{width: '90%', height: 80, borderRadius: 10}}
          resizeMode="contain"
        />
        <View
          style={{
            marginTop: 10,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 10}}>
            {formattedDate.split(' ')[1]} {formattedDate.split(' ')[0]}
          </Text>
          <Text style={{fontSize: 10}}>{formattedTime}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',

          width: '75%',
        }}>
        <View style={{flexDirection: 'column', marginLeft: 10, width: '90%'}}>
          <Text
            style={{
              color: 'black',
              fontSize: 17,
              fontWeight: '700',
              marginLeft: 10,
            }}>
            {item.event_name}
          </Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <MaterialIcons name="description" size={15} color="black" />
            <Text style={{fontSize: 12, color: 'gray', marginLeft: 2}}>
              {item.event_description}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <Entypo name="location-pin" size={15} color="black" />
            <Text
              style={{
                fontSize: 12,
                color: 'gray',
                alignItems: 'center',
                marginLeft: 2,
              }}>
              {item.event_venue}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleNotification(item, !isRegistered);
            setIsRegistered(!isRegistered);
          }}
          style={{
            width: '95%',

            alignSelf: 'center',
            backgroundColor: isRegistered ? 'white' : 'red',
            borderRadius: 30,
            alignItems: 'center',
            marginTop: 10,
            paddingVertical: 6,
            paddingHorizontal: 6,
            borderColor: isRegistered ? 'red' : 'white',
            borderWidth: 1,
          }}>
          <Text style={{color: isRegistered ? 'red' : 'white', fontSize: 16}}>
            {isRegistered ? 'Cancel' : 'Register'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}> */}

      {/* </View> */}
    </TouchableOpacity>
  );
};

export default EventItem;

const styles = StyleSheet.create({});
