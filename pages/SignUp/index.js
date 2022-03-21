
import React, { useState } from 'react';
import { StyleSheet, View , Button , Alert, ToastAndroid } from 'react-native';
import { Input, Icon , Text} from 'react-native-elements';

import { useNavigation } from '@react-navigation/core';
import { useAnimatedGestureHandler } from 'react-native-reanimated';

import firebase from '../../firebase';

 const SignUp = () => {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [status, setStatus] = useState("");
   const [mensagem, setMensagem] = useState("");
   
   const navigation = useNavigation();

   
   const handleSignUp = () => {
     
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user.email);
        navigation.navigate("Login");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        setStatus("erro");
        setMensagem(errorMessage);
      });
    
    }

   
    const goBack = () =>{
       navigation.navigate("Login"); 
    }


   return (
     <>
       <Button 
           icon={
              <Icon
                 name="check"
                 size={15}
                 color="black"
              /> 
           }
           color="black"
           title="go back"
           onPress={goBack}
        />

       <View style={styles.container}>
         <Text style={styles.sectionTitle}>SignUp</Text>
         &nbsp;&nbsp;<br />

        <Text style={styles.baseText}>{status === 'erro' ? mensagem : ""}</Text>

         <Input 
            placeholder='E-mail'
            leftIcon={<Icon name="email" size={23} color="#A020F0" />}
            keyboardType="email-address"
            onChangeText={(text)=>setEmail(text)}
         />
         <Input 
            placeholder='Password'
            leftIcon={<Icon name="lock" size={25} color="#A020F0" />}
            secureTextEntry={true}
            onChangeText={(text)=>setPassword(text)}
         />
        <Button 
           icon={
              <Icon
                 name="check"
                 size={15}
                 color="#FFF"
              /> 
           }
           color="#A020F0"
           title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SignUp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
           onPress={handleSignUp}
        />

      </View>
     </>
   );
 };

 const styles = StyleSheet.create({
   container:{
        flex:1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
   },
   sectionTitle: {
        color: 'black',
        fontSize: 24,
   },
   baseText: {
    //fontWeight: 'bold',
    color: "red",
  },
 })

export default SignUp;