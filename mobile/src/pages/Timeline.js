import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import socket from 'socket.io-client';

import Tweet from '../components/Tweet';

import api from '../services/api';

export default class Timeline extends React.Component {

  state = {
    tweets: []
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Begin',
    headerTitleStyle: {
      width: '100%',
      textAlign: 'center',
    },
    headerRight: (
      <TouchableOpacity onPress={() => { navigation.navigate("NewTweet") }}>
        <Icon
          name="add-circle-outline"
          size={24}
          color="#4BB0EE"
          style={{ marginRight: 20 }}
        />
      </TouchableOpacity>
    )
  })

  async componentDidMount() {
    this.subscribeToEvents();
    const response = await api.get('tweets');
    this.setState({ tweets: response.data });
  }

  subscribeToEvents = () => {
    const io = socket('http://192.168.25.135:3001');
    io.on('tweet', data => {
      this.setState({ tweets: [data, ...this.state.tweets] });
    });
    io.on('like', data => {
      this.setState({
        tweets: this.state.tweets.map(tweet =>
          tweet._id === data._id ? data : tweet
        )
      })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.tweets}
          keyExtractor={tweet => tweet._id}
          renderItem={({ item }) => <Tweet tweet={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});
