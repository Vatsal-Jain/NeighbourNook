import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import {supabase} from '../services/supabaseServices';
import DocumentPicker, {
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import PushNotification from 'react-native-push-notification';

const UploadPost = ({navigation}) => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const [postContent, setPostContent] = useState('');
  const [location, setLocation] = useState('');

  const handlePostUpload = () => {
    // Implement logic to upload post to Supabase
    // Use the postContent state variable to send the post content
  };
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');

  async function downloadImage(path) {
    try {
      const {data, error} = await supabase.storage
        .from('avatars')
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message);
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);

      const file = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: types.images,
        mode: 'open',
      });

      const photo = {
        uri: file.fileCopyUri,
        type: file.type,
        name: file.name,
      };

      const formData = new FormData();
      formData.append('file', photo);
      const timestamp = new Date().getTime();
      const fileExt = file.name.split('.').pop();
      const filePath = `${timestamp}_${Math.floor(
        Math.random() * 10,
      )}.${fileExt}`;

      console.log('file is', filePath, formData);

      const {error} = await supabase.storage
        .from('avatars')
        .upload(filePath, formData);

      if (error) {
        throw error;
      }

      downloadImage(filePath);
    } catch (error) {
      if (isCancel(error)) {
        console.warn('cancelled');
        // User cancelled the picker, exit any dialogs or menus and move on
      } else if (isInProgress(error)) {
        console.warn(
          'multiple pickers were opened, only the last will be considered',
        );
      } else if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }

  async function uploadPost(title, imageUrl) {
    const id = session.user.id;
    console.log(session.user.id, title, imageUrl);
    try {
      setUploading(true);
      console.log('get events called');
      if (!session?.user) throw new Error('No user on the session!');
      const {data, error, status} = await supabase
        .from('posts')
        .insert([
          {
            user_id: id,
            post_title: title,
            post_image: imageUrl,
            post_location: location,
          },
        ])
        .select();
      if (error) {
        throw error;
      }
      console.log(status, data);
      // Alert.alert('Post Uploaded');
      const notify = {
        post_image: imageUrl,
        post_title: title,
      };
      handleNotification(notify);
      navigation.goBack();
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setUploading(false);
    }
  }

  const imageData = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1554844453-7ea2a562a6c8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1494386346843-e12284507169?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  const handleNotification = item => {
    PushNotification.cancelAllLocalNotifications();
    PushNotification.localNotification({
      channelId: 'event-channel',
      title: `${item.post_title}`,
      message: 'Upload Successfull',
      bigText: 'Thanks For Registration',
      color: 'red',
      id: 1,
      picture: item.post_image,
      bigLargeIconUrl: item.post_image,
      largeIconUrl: item.post_image,
      playSound: true,
      soundName: 'default',
    });
  };

  return (
    <View>
      {avatarUrl ? (
        <Image
          source={{uri: avatarUrl}}
          accessibilityLabel="Image"
          style={[
            {height: 300, width: 300, alignSelf: 'center', marginTop: 10},
            styles.image,
            styles.uploadedImage,
          ]}
        />
      ) : (
        <View
          style={[
            {height: 300, width: 300, alignSelf: 'center', marginTop: 10},
            styles.avatar,
            styles.noImage,
          ]}
        />
      )}
      <TextInput
        style={{
          width: '80%',
          borderWidth: 1,
          borderColor: 'gray',
          alignSelf: 'center',
          marginVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 20,
        }}
        multiline
        placeholder="Write your post title"
        value={postContent}
        onChangeText={text => setPostContent(text)}
      />

      <TextInput
        style={{
          width: '80%',
          borderWidth: 1,
          borderColor: 'gray',
          alignSelf: 'center',
          marginVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 20,
        }}
        multiline
        placeholder="Location"
        value={location}
        onChangeText={text => setLocation(text)}
      />
      <TouchableOpacity
        style={{
          width: '90%',
          alignSelf: 'center',
          marginVertical: 10,
          alignItems: 'center',
          justifyContent: 'center',

          backgroundColor: uploading ? 'gray' : '#2282e2',
          padding: 10,
          borderRadius: 10,
        }}
        onPress={uploadAvatar}
        disabled={uploading}>
        <Text style={{color: 'white'}}>Pick Image</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: '90%',
          alignSelf: 'center',
          marginVertical: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: uploading ? 'gray' : '#e2224f',
          padding: 10,
          borderRadius: 10,
        }}
        onPress={() => {
          uploadPost(postContent, avatarUrl, location);
        }}
        disabled={uploading}>
        <Text style={{color: 'white'}}>Post Nook</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadPost;

const styles = StyleSheet.create({
  uploadedImage: {
    borderRadius: 5,
    overflow: 'hidden',
    maxWidth: '100%',
  },
  image: {
    objectFit: 'cover',
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
});
