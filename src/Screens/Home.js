import React from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  Container,
  Header,
  Content,
  Tab,
  Left,
  Body,
  Right,
  Title,
  Tabs,
  List,
  ListItem,
  Thumbnail,
  Fab,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {saveToken} from '../Public/Redux/actions/user';
import Geolocation from '@react-native-community/geolocation';

class Home extends React.Component {
  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        firebase
          .database()
          .ref('users/' + this.props.user.token)
          .update({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            log: 'Online',
          });
      },
      error => null,
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 3600000},
    );

    // getmessage();

    return () => {
      Geolocation.clearWatch();
      Geolocation.stopObserving();
    };
  }
  logout = () => {
    Alert.alert(
      'Confirm Logout',
      'Do you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.logoutoke()},
      ],
      {cancelable: false},
    );
  };
  logoutoke = () => {
    AsyncStorage.removeItem('Token');
    this.props.dispatch(saveToken(null));
    // dispatch(savetoken(null));
    firebase
      .database()
      .ref('users/' + this.props.user.token)
      .update({
        log: 'Offline',
      });
  };
  render() {
    return (
      <>
        <Header style={{justifyContent: 'flex-end'}}>
          <Icon
            name="android"
            type="material"
            raised
            color="black"
            size={20}
            onPress={this.logout}
          />
        </Header>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Ini Home</Text>
        </View>
        <Icon
          name="android"
          color="white"
          reverse
          raised
          reverseColor="#a4c639"
          type="material"
          size={52}
          onPress={() => this.props.navigation.navigate('Friends')}
        />
      </>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {
    user,
  };
};

export default connect(mapStateToProps)(Home);
