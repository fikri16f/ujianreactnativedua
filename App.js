import React, { Component } from 'react'
import { Dropdown, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
// import TableView from 'react-native-tableview'
import axios from 'axios'

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

renderItem = ({ item }) => (
  <View style = {{borderWidth:8}}>
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

  </View>
)

  render() {
    return (
      <SafeAreaView style={styles.container}>
        
              <TextInput placeholder="Cari" onChangeText={(data)=>{this.setState({nama:data})}}/>
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
              />
            </SafeAreaView>
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
  }

});