import React, {useState, useEffect} from 'react';
import {View, FlatList, Alert, ActivityIndicator} from 'react-native';
import {Input} from 'react-native-elements';
import {supabase} from '../services/supabaseServices';
import EventItem from '../components/EventItem';
import PushNotification from 'react-native-push-notification';

const Event = () => {
  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'event-channel',
      channelName: 'Event Channel',
    });
  };
  useEffect(() => {
    createChannels();
  }, []);

  const [session, setSession] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState([]);
  const [filteredEventData, setFilteredEventData] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) getEvents();
  }, [session]);

  useEffect(() => {
    // Filter events based on searchTerm
    const filteredEvents = eventData.filter(event =>
      event.event_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredEventData(filteredEvents);
  }, [searchTerm, eventData]);

  async function getEvents() {
    try {
      setLoading(true);
      console.log('get events called');
      if (!session?.user) throw new Error('No user on the session!');

      const {data, error, status} = await supabase.from('events').select('*');

      if (error && status !== 406) {
        throw error;
      }

      console.log('data from events is', data, status);
      if (data) {
        setEventData(data ?? []);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <>
          <View
            style={{
              marginTop: 5,
              paddingTop: 4,
              paddingBottom: 4,
              alignSelf: 'stretch',
              marginHorizontal: 10,
            }}>
            <Input
              // label="Search Event"
              leftIcon={{type: 'font-awesome', name: 'search'}}
              onChangeText={text => setSearchTerm(text)}
              value={searchTerm}
              placeholder="Search"
              autoCapitalize="none"
            />
          </View>
          <FlatList
            data={filteredEventData}
            style={{alignSelf: 'center', width: '90%'}}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              return <EventItem item={item} />;
            }}
          />
        </>
      )}
    </View>
  );
};

export default Event;
