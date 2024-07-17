import React, { Component } from 'react';
import firebase from 'firebase';
import { FlatList, Modal, Image, View, StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Footer,
  Toast,
  FooterTab,
  Content,
  Spinner,
  Title,
  List,
  ListItem,
  DatePicker,
  Text,
  Left,
  Right,
  Input,
  Button,
  Label,
  Icon,
  Form,
  Picker,
  Item,
  Body
} from 'native-base';
import { RNCamera } from "react-native-camera";
export default class Contents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      isLoading: 'false',
      active: 1,
      smashLink:'https://global-value.firebaseapp.com/sendproduct',
      upc: '',
      manufacturer: '',
      description: '',
      image: require('../img/defaultimg.jpg'),
      imageLink: '',
      retailPrice: '',
      lowestPrice: '',
      ourPrice: '',
      weight: '',
      purchaseDate: '',
      date: '',
      category: '',
      brand:'',
      tags: '',
      condition: '',
      data: [],
      basic: true,
      listViewData: []
    };
    this.setDate = this.setDate.bind(this);
  }
  process = (d) => {
    if (d.code == 'INVALID_UPC' || d.total == 0) {
      this.setState({
        isLoading: 'false'
      }, alert('Unable to find items'))
    } else {
      this.setState({
        manufacturer: d.items[0].title,
        brand:d.items[0].brand,
        description: d.items[0].description,
        image: { uri: d.items[0].images[0] },
        imageLink: d.items[0].images[0],
        retailPrice: d.items[0].lowest_recorded_price,
        lowestPrice: d.items[0].lowest_recorded_price,
        isLoading: 'false'
      })
    }
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  grabProduct = () => {
    this.setState({
      isLoading: 'true'
    })
    fetch('https://api.upcitemdb.com/prod/trial/lookup?upc=' + this.state.upc)
      .catch(error => console.log(error))
      .then((data) => data.json()).then((data) => {
        this.process(data);
      })
  }

  setDate(nd) {
    this.setState({ date: JSON.stringify(nd) })
  }

  onCatChange = (a) => {
    if (a !== '0') {
      this.setState({
        category: a
      })
    }
  }

  onTagChange = (b) => {
    if (b !== '0') {
      this.setState({
        tags: b
      })
    }
  }

  onConChange = (c) => {
    if (c !== '0') {
      this.setState({
        condition: c
      })
    }
  }

  onRead = (r) => {
    this.setState({
      upc: r.barcodes[0].data,
      active: 1
    })
    console.log(r)
  }

  openScanner = () => {
    this.setState({
      active: 2
    })
  }
  openList = () => {
    this.firebaseGet()
  }
  goBack = () => {
    this.setState({
      active: 1
    })
  }
  firebaseStart = () => {
    const firebaseConfig = {
      apiKey: "AIzaSyDF_49aTs606z1aVX0Q6rtu-snnbgEdUgw",
      authDomain: "global-value.firebaseapp.com",
      databaseURL: "https://global-value.firebaseio.com",
      projectId: "global-value",
      storageBucket: "",
      messagingSenderId: "859247064542",
      appId: "1:859247064542:web:cf1aaf7c5fb7f3b4"
    };
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }
  firebaseStop = () => {
    firebase.database().goOffline
  }

  firebaseGet = () => {
    this.setState({
      isLoading: 'true',
      active: 3
    })
    firebase.database().ref('/Products').on('value', (snapshot) => {
      obj = snapshot.val();
      this.setState({
        listViewData: Object.keys(obj)
      }, this.setState({ isLoading: 'false' }), console.log(this.state.listViewData))
    })
    clearInterval(this.interval)
  }

  firebaseSend = () => {
    this.setState({ isLoading: 'true' })
    var Upc = this.state.upc;
    var Manufacturer = this.state.manufacturer;
    var RetailPrice = this.state.retailPrice;
    var OurPrice = this.state.ourPrice;
    var Weight = this.state.weight;
    var Category = this.state.category;
    var Tags = this.state.tags;
    var Condition = this.state.condition;
    var PurchaseDate = this.state.date;
    var LowestPrice = this.state.lowestPrice;
    var ImageLink = this.state.imageLink;
    var Description = this.state.description;
    {
      !this.state.manufacturer || !this.state.upc ?
        Toast.show({
          text: 'Data is not present',
          buttonText: 'Okay',
          position: 'top'
        }, this.setState({ isLoading: 'false' }))
        :
        firebase.database().ref('Products/' + this.state.upc).set({
          Upc,
          Manufacturer,
          Description,
          RetailPrice,
          OurPrice,
          Weight,
          PurchaseDate,
          Category,
          Tags,
          Condition,
          LowestPrice,
          ImageLink
        })
          .then((data) => {
            Toast.show({
              text: 'Data Sent To Firebase',
              buttonText: 'Okay',
              position: 'top'
            })
            this.setModalVisible(!this.state.modalVisible)
            this.setState({ isLoading: 'false' });
            console.log('Sending Success ', data);
            return;
          })
          .catch((error) => console.log('Failed to send ', error))
    }
  }

  shopifySend = () => {
    this.setState({ isLoading: 'true' });
    {
      !this.state.manufacturer || !this.state.upc ?
        Toast.show({
          text: 'Data is not present',
          buttonText: 'Okay',
          position: 'top'
        }, this.setModalVisible(!this.state.modalVisible), this.setState({ isLoading: 'false' })) :
        fetch(this.state.smashLink, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "key=AAAA24aYeLs:APA91bFcO4Q7GIqQng0POSXz6Usz1VATWCeFyxhcSQI4eqc4sfhCV_0JqZIaXk8bLdeSMG1O0uQZbQ0olmniaFYt5SVXBSw_qRWfcP2DKvCJ8vSYLY8L4GMsrSZ8CicHV2JyQ7BntOVP"
          },
          body: JSON.stringify({
            "product": {
              "title": this.state.manufacturer,
              "body_html": this.state.description,
              "product_type": this.state.category,
              "tags": this.state.tags,
              "vendor":this.state.brand,
              "barcode":this.state.upc,
              "weight":this.state.weight,
              "price":this.state.ourPrice,
              "images":this.state.imageLink,
            }
          })
        }).catch((err) => console.log(err)).then((data) => {
          this.setModalVisible(!this.state.modalVisible);
          Toast.show({
            text: 'Data Sent To shopify',
            buttonText: 'Okay',
            position: 'top'
          })
          this.setState({ isLoading: 'false' });
          console.log('Sending Success ', data);
        })
    }
  }

  componentDidMount() {
    this.firebaseStart()
  }

  render() {

    switch (this.state.active) {
      case 1:
        return (
          <Container>
            <Header>
              <Left>
                <Title>Smash</Title>
              </Left>
              <Right>
                <Button style={{ marginTop: 5, marginRight: 10 }} transparent onPress={() => this.openList()}>
                  <Text>Check available data</Text>
                </Button>
                <Button
                  transparent
                  disabled={this.state.upc !== "" ? false : true}
                  onPress={() => this.grabProduct()}>
                  <Text style={this.state.upc !== '' ? styles.show : styles.noShow}>GO</Text>
                </Button>
              </Right>
            </Header>

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible(!this.state.modalVisible);
              }}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <View style={{ height: 200, width: '100%', justifyContent: 'space-evenly', backgroundColor: 'blue' }}>
                  <View style={{ width: '100%', flexDirection: 'row', paddingBottom: 10, justifyContent: 'space-between' }}>
                    <View style={{ height: 40, justifyContent: 'flex-end', paddingTop: 10, marginLeft: 10 }}>
                      <Text style={{ color: 'white', fontSize: 20 }}>Send To</Text>
                    </View>
                    <Button transparent onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                      <Icon style={{ color: 'white' }} type="FontAwesome" name='window-close' />
                    </Button>
                  </View>
                  <Button style={{ marginHorizontal: 10 }} full info onPress={() => this.shopifySend()}>
                    <Text>Shopify</Text>
                  </Button>
                  <Button style={{ marginHorizontal: 10 }} full info onPress={() => this.firebaseSend()}>
                    <Text>Firebase</Text>
                  </Button>
                </View>
              </View>
            </Modal>


            {this.state.isLoading == 'true' ?
              <Content>
                <Spinner color='blue' />
              </Content>
              :
              <Content>
                <Form>
                  <Item >
                    <Input value={this.state.upc} placeholder="Enter Barcode" onChangeText={(val) => { this.setState({ upc: val }) }} />
                    <Button transparent>
                      <Icon type="MaterialCommunityIcons" name="barcode-scan" onPress={() => this.openScanner()} />
                    </Button>
                  </Item>
                </Form>
                <List>
                  <ListItem>
                    <Item>
                      <Left>
                        <Text>Manufacturer</Text>
                      </Left>
                      <Right>
                        <Text>{this.state.manufacturer}</Text>
                      </Right>
                    </Item>
                  </ListItem>
                  <ListItem>
                    <Item>
                      <Left>
                        <Text>Description</Text>
                      </Left>
                      <Right>
                        <Text>{this.state.description}</Text>
                      </Right>
                    </Item>
                  </ListItem>
                  <ListItem>
                    <Item>
                      <Left>
                        <Text>Image</Text>
                      </Left>
                      <Right>
                        <Body>
                          <Image style={{ height: 150, width: 150, resizeMode: 'contain' }} source={this.state.image} />
                        </Body>
                      </Right>
                    </Item>
                  </ListItem>
                  <ListItem>
                    <Item>
                      <Left>
                        <Text>Image Link</Text>
                      </Left>
                      <Right>
                        <Text>{this.state.imageLink}</Text>
                      </Right>
                    </Item>
                  </ListItem>
                  <ListItem>
                    <Item>
                      <Left>
                        <Text>Retail Price</Text>
                      </Left>
                      <Right>
                        <Text>{this.state.retailPrice}</Text>
                      </Right>
                    </Item>
                  </ListItem>
                  <ListItem>
                    <Item>
                      <Left>
                        <Text>Lowest Price</Text>
                      </Left>
                      <Right>
                        <Text>{this.state.lowestPrice}</Text>
                      </Right>
                    </Item>
                  </ListItem>
                  <ListItem itemDivider>
                  </ListItem>
                  <ListItem>
                    <Item>
                      <Left>
                        <Text>Our Price</Text>
                      </Left>
                      <Form>
                        <Right >
                          <Input style={{ width: 130, justifyContent: 'center' }} keyboardType='numeric' placeholder="Enter Price" onChangeText={(val) => { this.setState({ ourPrice: val }) }} />
                        </Right>
                      </Form>
                    </Item>
                  </ListItem>
                  <ListItem>
                    <Item>
                      <Left>
                        <Text>Weight</Text>
                      </Left>
                      <Form>
                        <Right >
                          <Input style={{ width: 130, justifyContent: 'center' }} keyboardType='numeric' placeholder="Enter Weight" onChangeText={(val) => { this.setState({ weight: val }) }} />
                        </Right>
                      </Form>
                    </Item>
                  </ListItem>
                  <ListItem>
                    <Item>
                      <Left>
                        <Text>Purchase Date</Text>
                      </Left>
                      <DatePicker
                        defaultDate={new Date()}
                        minimumDate={new Date()}
                        locale={'en'}
                        animationType={'fade'}
                        androidMode={'default'}
                        placeHolderText={'Select Date'}
                        timeZoneOffsetInMinutes={undefined}
                        onDateChange={this.setDate}
                        disabled={false}
                      />
                    </Item>
                  </ListItem>
                  <ListItem>

                    <Text>Category</Text>
                    <Form style={{ paddingLeft: 65 }}>
                      <Item Picker>
                        <Picker
                          mode='dropdown'
                          iosIcon={<Icon name="arrow-down" />}
                          style={{ width: 200 }}
                          placeholder='Category'
                          placeholderStyle={{ color: '#bfc6ea' }}
                          selectedValue={this.state.category}
                          onValueChange={this.onCatChange}
                        >
                          <Picker.Item label='Select Category' value='0' />
                          <Picker.Item label='Bathroom' value='bathroom' />
                          <Picker.Item label='Plumbing' value='pluming' />
                          <Picker.Item label='Kitchen' value='kitchen' />
                          <Picker.Item label='Lighting' value='lightning' />
                          <Picker.Item label='Tools' value='tools' />
                          <Picker.Item label='Home Decor' value='homeDecor' />
                          <Picker.Item label='Accesories' value='accesories' />
                          <Picker.Item label='Misc' value='misc' />
                        </Picker>
                      </Item>
                    </Form>

                  </ListItem>
                  <ListItem>
                    <Item>
                      <Text>Tags</Text>
                      <Form style={{ paddingLeft: 93 }}>
                        <Item Picker>
                          <Picker
                            mode='dropdown'
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: 200 }}
                            placeHolder='Tags'
                            selectedValue={this.state.tags}
                            onValueChange={this.onTagChange}
                          >
                            <Picker.Item label='Select Tags' value='0' />
                            <Picker.Item label='Appliances' value='appliances' />
                            <Picker.Item label='Vanities' value='vanities' />
                            <Picker.Item label='Tools' value='tools' />
                            <Picker.Item label='Security' value='security' />
                            <Picker.Item label='Plumbing' value='plumbing' />
                            <Picker.Item label='Faucet' value='faucet' />
                            <Picker.Item label='Shower' value='shower' />
                            <Picker.Item label='Ceiling Fan' value='ceilingFan' />
                            <Picker.Item label='Vanity Light' value='vanityLight' />
                            <Picker.Item label='Flush Mount' value='flushMount' />
                            <Picker.Item label='Exterior Light' value='exteriorLight' />
                            <Picker.Item label='Sconce' value='Sconce' />
                            <Picker.Item label='Pendant' value='Pendant' />
                            <Picker.Item label='Misc' value='Misc' />
                          </Picker>
                        </Item>
                      </Form>
                    </Item>
                  </ListItem>

                  <ListItem>
                    <Item>
                      <Text>Condition</Text>
                      <Form style={{ paddingLeft: 60 }}>
                        <Item Picker>
                          <Picker
                            mode='dropdown'
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: 200 }}
                            placeholder='Condition'
                            selectedValue={this.state.condition}
                            onValueChange={this.onConChange}
                          >
                            <Picker.Item label='Select Condition' value='0' />
                            <Picker.Item label='New' value='new' />
                            <Picker.Item label='Like New' value='likeNew' />
                            <Picker.Item label='Lighty Used' value='lightlyUsed' />
                            <Picker.Item label='Used' value='used' />
                          </Picker>
                        </Item>
                      </Form>
                    </Item>
                  </ListItem>
                </List>
              </Content>
            }
            <Footer>
              <FooterTab>
                <Button full onPress={() => {
                  this.setModalVisible(true);
                }}>
                  <Text>MORE</Text>
                </Button>
              </FooterTab>
            </Footer>
          </Container>);
        break;
      case 2:
        return (
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <RNCamera
              style={{ flex: 3, justifyContent: 'flex-end', alignItems: 'center' }}
              ref={cam => this.camera = cam}
              type={RNCamera.Constants.Type.back}
              onGoogleVisionBarcodesDetected={(codes) => this.onRead(codes)}
            />
            <Button full onPress={this.goBack}>
              <Icon name='arrow-back' />
            </Button>
          </View>);
        break;
      case 3:
        return (
          <Container>
            <Header>
              <Left>
                <Title>Smash</Title>
              </Left>
              <Right>
                <Button
                  transparent
                  onPress={() => this.goBack()}>
                  <Icon name='arrow-back' />
                </Button>
              </Right>
            </Header>

            {this.state.isLoading == 'true' ?
              <Content>
                <Spinner color='blue' />
              </Content>
              :
              <Content>
                <Text>Product List</Text>

                <FlatList
                  data={this.state.listViewData}
                  renderItem={({ item }) => (
                    <List>
                      <ListItem>
                        <Item>
                          <Text>{item}</Text>
                        </Item>
                      </ListItem>
                    </List>
                  )}>
                </FlatList>
              </Content>}
          </Container>)
        break;
      default:
        break;
    }

  }

}

const styles = StyleSheet.create({
  noShow: {
    color: 'transparent'
  },
  show: {
    color: 'white'
  }
})