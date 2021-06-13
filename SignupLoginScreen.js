import React, {Component} from 'react'
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image,Alert} from 'react-native'
import db from '../config'
import firebase from 'firebase'

export default class SignupLoginScreen extends Component{
  constructor(){
   super();
   this.state={
     emailId:'',
     password:'',
     firstName:'',
     lastName:'',
     address:'',
     contact:'',
     confirmPassword:'',
     isModalVisible:'false'
   }
  }

  userSignUp = (emailId, password,confirmPassword) =>{
    if(password !== confirmPassword){
        return Alert.alert("password doesn't match\ reCheck your password.")
    }else{
      firebase.auth().createUserWithEmailAndPassword(emailId, password)
      .then(()=>{
        db.collection('users').add({
          first_Name:this.state.firstName,
          last_Name:this.state.lastName,
          username:this.state.emailId,
          address:this.state.address
        })
        return  Alert.alert(
             'User Added Successfully',
             '',
             [
               {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
             ]
         );
      })
      .catch((error)=> {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      });
    }
  }
 
  
  userLogin=(emailId,password) =>{
     firebase.auth().signInWithEmailAndPassword(emailId,password)
     .then(()=>{
       return Alert.alert("successfully logIN")  
     }) 
     .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    });
  }
  
  showModal = ()=>{
    return(
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isModalVisible}
      >
      <View style={styles.modalContainer}>
        <ScrollView style={{width:'100%'}}>
          <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
          <Text
            style={styles.modalTitle}
            >REGISTRATION</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder ={"First Name"}
            placeholderTextColor="#F5B041"
            maxLength ={8}
            onChangeText={(text)=>{
              this.setState({
                firstName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Last Name"}
            placeholderTextColor="#F5B041"
            maxLength ={8}
            onChangeText={(text)=>{
              this.setState({
                lastName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Contact"}
            placeholderTextColor="#F5B041"
            maxLength ={10}
            keyboardType={'numeric'}
            onChangeText={(text)=>{
              this.setState({
                contact: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Address"}
            placeholderTextColor="#F5B041"
            multiline = {true}
            onChangeText={(text)=>{
              this.setState({
                address: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Email"}
            keyboardType ={'email-address'}
            onChangeText={(text)=>{
              this.setState({
                emailId: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                password: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Confrim Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                confirmPassword: text
              })
            }}
          />
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={()=>
                this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
              }
            >
            <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>this.setState({"isModalVisible":false})}
            >
            <Text style={{color:'#ff5722'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  )
  }

   render(){
     return(
      <View style={styles.container}>

        <Image
         style={styles.ImageStyle}
         source={require('../assets/communicationimg.png')}
        />

    <Text style={styles.HeadingTextStyle}>BARTER SYSTEM</Text>


       <TextInput
        style={styles.EmailTextInputStyle}
        placeholder = "Enter E-mail"
        placeholderTextColor="#F5B041"
       />
       <TextInput
        style={styles.PasswordTextInputStyle}
        placeholder = "Enter Password"
        placeholderTextColor="#F5B041"
       />

         <TouchableOpacity
            style = {styles.LogInButtonStyle}
            onPress={()=>{
              this.userLogin(this.state.emailId,this.state.password) 
            }}
          >
            <Text style={styles.ButtonTextStyle}>LOG-IN</Text>
         </TouchableOpacity>

         <TouchableOpacity
            style = {styles.SignUpButtonStyle}
            onPress={()=>{
              this.setState({isModalVisible:true})
            }}
          >
            <Text style={styles.ButtonTextStyle}>SIGN-UP</Text>
         </TouchableOpacity>
         
      </View>   
     )  
   } 
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#138D75'  
   },
  EmailTextInputStyle:{
   borderWidth:4, 
   height:70,
   width:290, 
   backgroundColor:'#138D75',
   borderBottomColor:'#F5B041',
   borderColor:'#138D75',
   marginTop:50,
   marginLeft:550,
  },
  PasswordTextInputStyle:{
    borderWidth:4, 
    height:70,
    width:290, 
    backgroundColor:'#138D75',
    borderBottomColor:'#F5B041',
    borderColor:'#138D75',
    marginTop:40,
    marginLeft:550,
    
   },
  LogInButtonStyle:{
    borderWidth:4,
    height:30,
    width:200,
    alignItems:'center',
    borderRadius:5,
    justifyContent:'center',
    backgroundColor:'#138D75',
    borderColor:'#F5B041',
    marginTop:70,
    marginLeft:590,
    
  }, 
  SignUpButtonStyle:{
    borderWidth:4,
    height:30,
    width:200,
    alignItems:'center',
    borderRadius:5,
    justifyContent:'center',
    backgroundColor:'#138D75',
    borderColor:'#F5B041',
    marginTop:20,
    marginLeft:590,
    
  }, 
  ButtonTextStyle:{
   color:'#F5B041'  
  },
  
  HeadingTextStyle:{
    color:'#F5B041',
    fontSize:36,
    marginLeft:550,
    marginTop:60, 
   },
   
  ImageStyle:{
   width:200,
   height:150, 
   marginLeft:590,
   marginTop:50,
  },
  modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#138D75",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:80,
  },
  modalTitle :{
    justifyContent:'center',
    alignSelf:'center',
    fontSize:30,
    color:'#ff5722',
    margin:50
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#F5B041',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  registerButtonText:{
    color:'#ff5722',
    fontSize:15,
    fontWeight:'bold'
  },
  registerButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30
  },
  cancelButton:{
    width:200,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    marginTop:5,
  },
  modalBackButton:{
    width:400,
    height:60,
    alignItems:'center',
    justifyContent:'center',
    marginTop:10
  }

})