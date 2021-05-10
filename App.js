import React, { Component } from 'react'
import { Dropdown, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
// import TableView from 'react-native-tableview'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
import axios from 'axios'
// npm install --save native-base

export default class App extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { 
        data: [],
        nama:""
    };

  }
  
  componentDidMount(){
    this.getData();
   }

   componentDidUpdate(){
     this.getData();
   }


getData = ()=>{
  axios.get(`http://192.168.26.3:8080/user/${this.state.nama}`)
.then((response)=>{
  //console.log(response)
    let data = response.data;
    this.setState({data:data});
})
.catch(function(error){
console.log(error);
})
}

deleteData(id) {
  axios.delete(`http://192.168.26.3:8080/user/hapus/${id}`)
  .then( (response) => {
    //console.log(response.data)
   alert(response.data)
  })
  .catch(function (error) {
  // handle error
   console.log(error);
  })
}

renderItem = ({ item }) => (
  <View style={styles.alternativeLayoutButtonContainer}>
    {/* npm install react-native-tableview --save */}
      {/* <DataTable>
    <DataTable.Header>
      <DataTable.Title>Username</DataTable.Title>
      <DataTable.Title >Email</DataTable.Title>
      <DataTable.Title >No HP</DataTable.Title>
      <DataTable.Title >Alamat</DataTable.Title>
    </DataTable.Header>

    <DataTable.Row>
      <DataTable.Cell>{item.username}</DataTable.Cell>
      <DataTable.Cell >{item.email}</DataTable.Cell>
      <DataTable.Cell >{item.hp}</DataTable.Cell>
      <DataTable.Cell >{item.alamat}</DataTable.Cell>
    </DataTable.Row>
  </DataTable> */}
    <Text style={styles.title}>Username : {item.username}</Text>
    <Text style={styles.title}>Email : {item.email}</Text>
    <Text style={styles.title}>No Hp : {item.hp}</Text>
    <Text style={styles.title}>Alamat : {item.alamat}</Text>
    <Button onPress={()=>{this.props.navigation.navigate("UpdateData",item)}} title="Edit"/>
    <Button onPress={()=>{Alert.alert('Hapus Data',
              'Yakin Hapus Data?',[
                {text: 'TIDAK', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                {text: 'YA', onPress: () => this.deleteData(item.id)},
              ])}}  title="Hapus" color="Red"/>
  </View>
)

  render() {
    return (
      <Container>
        <SafeAreaView style={styles.container}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
              <Text>Menu</Text>
          </Body>
          <Right />
        </Header>

        <Content>
        <TextInput placeholder="Cari" onChangeText={(data)=>{this.setState({nama:data})}}/>
              <TouchableOpacity onPress={this.getData.bind(this)} style={styles.button}>
              <Text>Cari</Text>
              </TouchableOpacity>
        <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
              />
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() =>{this.props.navigation.navigate("Add")}}>
              <Text>Register</Text>
            </Button>
          </FooterTab>
        </Footer>
              {/* <TextInput placeholder="Cari" onChangeText={(data)=>{this.setState({nama:data})}}/>
              <TouchableOpacity onPress={this.getData.bind(this)} style={styles.button}>
              <Text>Cari</Text>
              </TouchableOpacity>


         <TouchableOpacity onPress={() =>{this.props.navigation.navigate("Add")}} style={styles.button}>
                <Text>Tambah User</Text>
          </TouchableOpacity> 

              <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
              /> */}
            </SafeAreaView>

            </Container>
    )
  }
}

//npm audit fix --force

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginHorizontal:10,
    marginVertical:10
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonContainer: {
    margin: 20
  }

});