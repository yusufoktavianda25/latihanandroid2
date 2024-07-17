import React, { Component } from 'react';
import { StyleSheet, Text,View } from 'react-native';
export default class Main {
  render() {
    return (

      <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={{width: "100%", height: 250, backgroundColor: 'powderblue', alignItems:'center',justifyContent:'center'}} >
              <Text>Hasil</Text>
              </View>
              <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}}>
              <Text>Test</Text>
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