import React, { Component } from 'react'
import { View,StyleSheet, Text,  TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios'
import { parse } from '@babel/core';

export default class UpdateData extends Component {

    constructor(props){
        super(props);
        this.state = {
          //samakan dengan field pada entity eclipse
            id: this.props.route.params.id,
            username:this.props.route.params.username,
            email:this.props.route.params.email,
            hp:this.props.route.params.hp,
            alamat:this.props.route.params.alamat
        }
    }
    handleUpdate (){

        axios.post(`http://192.168.26.3:8080/user/ubah/${this.state.id}`,this.state)
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
          <TextInput placeholder="Username" value={this.state.username} onChangeText={(data)=>{this.setState({username:data})}}/>
          <Text style={styles.title}> Email </Text>
          <TextInput placeholder="Email" value={this.state.email} onChangeText={(data)=>{this.setState({email:data})}}/>
          <Text style={styles.title}> No Hp </Text>
          <TextInput placeholder="No. HP" value={this.state.hp} onChangeText={(data)=>{this.setState({hp:data})}}/>
          <Text style={styles.title}> Alamat </Text>
          <TextInput placeholder="Alamat" value={this.state.alamat} onChangeText={(data)=>{this.setState({alamat:data})}}/>
          <TouchableOpacity style={styles.button} onPress={this.handleAdd.bind(this)}><Text style={styles.title}>Simpan</Text></TouchableOpacity>
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
