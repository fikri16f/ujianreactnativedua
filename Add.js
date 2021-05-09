import axios from 'axios';
import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

export default class Add extends Component {
constructor(props){
    super(props);
    this.state = {
      //samakan dengan field pada entity eclipse
        username:"",
        email:"",
        hp:"",
        alamat:""
    }
}

handleAdd (){

  axios.post('http://192.168.26.3:8080/user/add',this.state)
  .then( (response) => {
    //console.log(response.data)
    alert(response.data)
    this.props.navigation.navigate("App")
  })
  .catch(function (error) {
  // handle error
   console.log(error);
  })
 
}


    render() {
        return (
          <View>
          <Text style={styles.title}> Username </Text>
          <TextInput placeholder="Username" onChangeText={(data)=>{this.setState({username:data})}}/>
          <Text style={styles.title}> Email </Text>
          <TextInput placeholder="Email" onChangeText={(data)=>{this.setState({email:parseInt(data)})}}/>
          <Text style={styles.title}> No Hp </Text>
          <TextInput placeholder="No. HP" onChangeText={(data)=>{this.setState({hp:data})}}/>
          <Text style={styles.title}> Alamat </Text>
          <TextInput placeholder="Alamat" onChangeText={(data)=>{this.setState({alamat:data})}}/>
          <TouchableOpacity style={styles.button} onPress={this.handleAdd.bind(this)}><Text style={styles.title}>Simpan</Text></TouchableOpacity> 
          {/* <TouchableOpacity style={styles.button} onPress={()=>{this.props.navigation.replace("App")}}><Text style={styles.title}>Cancel</Text></TouchableOpacity> */}
      </View>
        )
    }
}

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
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }

});