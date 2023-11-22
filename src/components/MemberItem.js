import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const MemberItem = ({item}) => {
  const [added, setAdded] = useState(true);
  return (
    <View
      style={{
        width: '90%',
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: 10,
        padding: 10,
        flexDirection: 'row',
        borderRadius: 10,
      }}>
      <Image
        source={{
          uri: item.avatar_url
            ? item.avatar_url
            : 'https://i.pinimg.com/474x/c0/c8/17/c0c8178e509b2c6ec222408e527ba861.jpg',
        }}
        style={{width: 40, height: 40, borderRadius: 20}}
        resizeMode="contain"
      />
      <View style={{flexDirection: 'column', marginHorizontal: 10}}>
        <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>
          {item.full_name ? item.full_name : 'User'}
        </Text>
        <Text style={{color: 'gray', fontSize: 12}}>
          @{item.username ? item.username : 'username'}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => setAdded(!added)}
        style={{
          position: 'absolute',
          right: 10,
          top: 10,
          bottom: 10,
          backgroundColor: added ? 'white' : '#3045c9',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 10,
          borderColor: added ? '#3045c9' : 'white',
          borderWidth: 1,
        }}>
        <Text style={{color: added ? 'black' : 'white', fontSize: 14}}>
          {added ? 'Release' : 'Hook'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MemberItem;

const styles = StyleSheet.create({});
