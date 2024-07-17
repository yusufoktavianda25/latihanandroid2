import React, { Component } from 'react';
import { StyleSheet, Text,View,TextInput,AppRegistry } from 'react-native';
import { Button } from 'react-native-elements';
import { Image } from 'react-native';
import { Avatar } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';

//import nmnmn from "/src/content/nmnmnm.js"
export default class App extends Component {
  constructor()
  {
      super()
	      this.state = {
          nama:'',
        }
  }
  	     
  render() {
    return (

      <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={{width: "100%", height: 250, backgroundColor: 'powderblue', alignItems:'center',justifyContent:'center'}} >
              <Text>Hasil</Text>
              <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
       style={{width: 400, height: 400}} />
              </View>
              <View style={{width: '100%', height: '100%', backgroundColor: 'skyblue',alignItems:'center'}}>
                  
                  <View style={{width: '100%', height: 110, backgroundColor: 'green',flexDirection:'row'}}>
                  <Avatar
                    rounded
                    source={{
                      uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                  />
                  <Avatar rounded title="MD" />
                  <Avatar rounded icon={{ name: 'home' }} />
                  <Avatar
                    source={{
                      uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                    }}
                    showEditButton
                  />
                  </View>
                  <View style={{width: '100%', height: 110, backgroundColor: 'blue',flexDirection:'row'}}>
                  <TextInput
          	            onChangeText={(text) => {this.setState({nama:text})}}
          	        />
                  <Text>Saya adalah {this.state.nama}</Text>
                  </View>
                  <View style={{width: '100%', height: 110, backgroundColor: 'orange',flexDirection:'row'}}>
                      <Button buttonStyle={{width: 90, height: 110}} title='0'/>
                      <Button buttonStyle={{width: 90, height: 110}} title='.'/>
                      <Button buttonStyle={{width: 90, height: 110}} title='='/>
                      <Button buttonStyle={{width: 90, height: 110}} title='+'/>
                  </View>
              </View>
            </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});