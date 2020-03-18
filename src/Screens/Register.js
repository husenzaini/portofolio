import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import {Item, Input, Form, Label, Button, Thumbnail, Text} from 'native-base';
// import Bgimage from '../image/cerah.jpg';
// import Logo from '../image/tele.jpg';
import firebase from '../Config/Firebase';
import 'firebase/firestore';
import md5 from 'md5';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      usersRef: firebase.database().ref('users'),
      loading: false,
      key: '',
    };
  }

  onPressCreate = async () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(createdUser => {
        createdUser.user
          .updateProfile({
            displayName: this.state.name,
            photoURL: `http://gravatar.com/avatar/${md5(
              createdUser.user.email,
            )}?d=identicon`,
          })
          .then(() => {
            this.setState({
              loading: true,
            });
            this.saveUser(createdUser).then(() => {
              ToastAndroid.show('Register Success!!', ToastAndroid.SHORT);
            });
          });

        this.props.navigation.navigate('Login');
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
        this.setState({
          loading: false,
        });
      });
  };

  saveUser = createdUser => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
      email: createdUser.user.email,
      latitude: 0,
      longitude: 0,
      log: 'offline',
      key: this.state.key,
    });
  };

  onChangeTextEmail = email => {
    this.setState({email});
  };
  onChangeTextPassword = password => {
    this.setState({password});
  };
  onChangeTextName = name => {
    this.setState({name});
  };
  render() {
    return (
      <View style={styles.containerStyle}>
        {/* <Image style={styles.BgimageStyle} source={Bgimage} /> */}
        <View style={styles.logoStyle}>
          {/* <Thumbnail square large source={Logo} /> */}
          <Text styles={styles.textLogoStyle}>React Native App</Text>
        </View>
        <Form style={styles.formLoginStyle}>
          <Item floatingLabel>
            <Label>
              <Text style={styles.inputStyle} />
              Name
              <Text />
            </Label>
            <Input
              style={styles.inputStyle}
              onChangeText={e => this.onChangeTextName(e)}
            />
          </Item>
          <Item floatingLabel>
            <Label>
              <Text style={styles.inputStyle} />
              Email
              <Text />
            </Label>
            <Input
              style={styles.inputStyle}
              onChangeText={e => this.onChangeTextEmail(e)}
            />
          </Item>
          <Item floatingLabel>
            <Label>
              <Text style={styles.inputStyle} />
              Password
              <Text />
            </Label>
            <Input
              style={styles.inputStyle}
              secureTextEntry={true}
              onChangeText={e => this.onChangeTextPassword(e)}
            />
          </Item>
        </Form>
        <Button
          block
          info
          style={styles.footerBottomStyle}
          onPress={() => this.onPressCreate()}>
          <Text>Sign Up</Text>
        </Button>
        <View style={styles.footersignUpStyle}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.signUpStyle}>
              Already have an account? sign in here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  BgimageStyle: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logoStyle: {
    marginTop: 70,
    marginBottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogoStyle: {
    fontSize: 18,
    color: 'white',
  },
  formLoginStyle: {
    marginTop: -30,
    paddingLeft: 10,
    paddingRight: 30,
  },
  inputStyle: {
    color: 'blue',
    marginBottom: 6,
    fontSize: 14,
  },
  footerBottomStyle: {
    marginTop: 26,
    paddingTop: 10,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 10,
  },
  footersignUpStyle: {
    marginTop: 25,
    alignItems: 'center',
  },
  signUpStyle: {
    color: 'black',
    fontSize: 14,
  },
});

export default Register;
