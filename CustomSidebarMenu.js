import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import DropDownPicker from 'react-native-dropdown-picker';
let customFonts={
    BubblegumSans:require("../assets/BubblegumSans-Regular.ttf")
}
import firebase from 'firebase';
export default class CustomSidebarMenu extends Component {
    constructor() {
      super();
      this.state = {
        light_theme: true,
      };
    }
    componentDidMount() {
      var theme;
      firebase
        .database()
        .ref('/users/' + firebase.auth().currentUser.uid)
        .on('value', function (data) {
          theme = data.val().current_theme;
        });
      this.setState({
        light_theme: theme === 'light' ? true : false,
      });
    }
  
    render() {
      var props = this.props;
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: this.state.light_theme ? 'white' : '#15193c',
          }}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.sideMenuProfileIcon}
          />
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    sideMenuProfileIcon: {
      width: RFValue(140),
      height: RFValue(140),
      borderRadius: RFValue(70),
      alignSelf: 'center',
      marginTop: RFValue(60),
      resizeMode: 'contain',
    },
  });
  