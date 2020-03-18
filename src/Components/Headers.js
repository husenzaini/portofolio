import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import firebase from '../Config/Firebase';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {savetoken} from '../Public/Redux/actions/user';

export const HeaderContact = props => {
  const {loading, token} = useSelector(state => state.user);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [uid, setUid] = useState(token);
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();
  // console.warn(props.data);
  return (
    <View style={styles.containerHeader}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {props.avatar ? (
          <Image style={styles.avatar} source={{uri: props.avatar}} />
        ) : null}
        <Text style={styles.title}>{props.title}</Text>
      </View>
      {props.data ? (
        <TouchableOpacity onPress={() => props.profile(props.data)}>
          <Icon
            name="user"
            solid
            color="#ff971d"
            size={25}
            style={styles.iconSend}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOffset: {width: 2, height: 4},
    shadowColor: '#000',
    shadowRadius: 10,
    shadowOpacity: 1,

    elevation: 8,
    minHeight: 60,
  },
  title: {
    color: '#ff971d',
    fontWeight: 'bold',
    fontSize: 18,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  imgProfile: {
    width: 200,
    height: 200,
    backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 100,
  },
  textInput: {
    borderBottomColor: '#acacac',
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 1,
    fontSize: 16,
    marginTop: 20,
  },
  containerInput: {
    paddingHorizontal: 30,
    width: '100%',
  },
  btnText: {
    fontSize: 18,
    color: '#ff971d',
    fontWeight: 'bold',
  },
  btn: {
    marginTop: 30,
  },
  boxProfile: {
    position: 'relative',
  },
  edit: {
    top: -50,
    left: 90,
  },
  modal: {
    paddingVertical: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10,
  },
});
