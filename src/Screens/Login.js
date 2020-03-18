import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {Item, Input, Form, Label, Button, Thumbnail, Text} from 'native-base';
// import Bgimage from '../image/cerah.jpg';
// import Logo from '../image/tele.jpg';
import firebase from '../Config/Firebase';
import 'firebase/firestore';
import {saveToken} from '../Public/Redux/actions/user';
import {connect} from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
  }

  saveToken = async token => {
    await this.props.saveToken(token);
  };

  onPressLogin = async () => {
    this.setState({
      loading: true,
    });
    await firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        this.saveToken(res.user.uid);
        this.setState({
          loading: false,
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
        });
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };
  onChangeTextEmail = email => {
    this.setState({email});
  };
  onChangeTextPassword = password => {
    this.setState({password});
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
        {!this.state.loading ? (
          <Button
            block
            info
            style={styles.footerBottomStyle}
            onPress={() => this.onPressLogin()}>
            <Text>Sign In</Text>
          </Button>
        ) : (
          <Button style={styles.footerBottomStyle}>
            <ActivityIndicator size="small" color="white" />
          </Button>
        )}

        <View style={styles.footersignUpStyle}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.signUpStyle}>
              Don't have an account? Register Now
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
    color: 'black',
  },
  formLoginStyle: {
    marginTop: -30,
    paddingLeft: 10,
    paddingRight: 30,
  },
  inputStyle: {
    color: 'black',
    marginBottom: 6,
    fontSize: 14,
  },
  footerBottomStyle: {
    marginTop: 26,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
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

const mapDispatchToProps = dispatch => {
  return {
    saveToken: token => dispatch(saveToken(token)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Login);
