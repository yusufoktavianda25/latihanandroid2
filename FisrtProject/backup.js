import React, { Component } from 'react';
import { StyleSheet, Text,View } from 'react-native';
import { Button } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';

//import nmnmn from "/src/content/nmnmnm.js"
export default class App extends Component {
  render() {
    return (

      <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={{width: "100%", height: 250, backgroundColor: 'powderblue', alignItems:'center',justifyContent:'center'}} >
              <Text>Hasil</Text>
              </View>
              <View style={{width: '100%', height: '100%', backgroundColor: 'skyblue',alignItems:'center'}}>
                  <View style={{width: '100%', height: 110, backgroundColor: 'red',flexDirection:'row'}}>
                      <Button buttonStyle={{width: 90, height: 110}} title='7'/>
                      <Button buttonStyle={{width: 90, height: 110}} title='8'/>
                      <Button buttonStyle={{width: 90, height: 110}} title='9'/>
                      <Button buttonStyle={{width: 90, height: 110}} title='÷'/>
                  </View>
                  <View style={{width: '100%', height: 110, backgroundColor: 'green',flexDirection:'row'}}>
                      <Button buttonStyle={{width: 90, height: 110}} title='4'/>
                      <Button buttonStyle={{width: 90, height: 110}} title='5'/>
                      <Button buttonStyle={{width: 90, height: 110}} title='6'/>
                      <Button buttonStyle={{width: 90, height: 110}} title='x'/>
                  </View>
                  <View style={{width: '100%', height: 110, backgroundColor: 'blue',flexDirection:'row'}}>
                      <Button buttonStyle={{width: 90, height: 110}} title='1'/>
                      <Button buttonStyle={{width: 90, height: 110}} title='2'/>
                      <Button buttonStyle={{width: 90, height: 110}} title='3'/>
                      <Button buttonStyle={{width: 90, height: 110}} title='-'/>
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