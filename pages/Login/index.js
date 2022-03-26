
import React, { useState } from 'react';
import { StyleSheet, View , Button , Alert, ToastAndroid , TouchableOpacity } from 'react-native';
import { Input, Icon , Text} from 'react-native-elements';
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
import { useAnimatedGestureHandler } from 'react-native-reanimated';
//import { auth } from '../../firebase';

import firebase from '../../firebase';

 const Login = () => {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [status, setStatus] = useState("");
   const [mensagem, setMensagem] = useState("");
   
   const [showPassword, setShowPassword] = useState(true);

   const navigation = useNavigation()

   
   const handleSignUp = () => {
      navigation.navigate("SignUp");  
   }

   
   const handleLogin = () => {

      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {     
        var user = userCredential.user;
        navigation.navigate("Tasks"); //Tasks = certo ok
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setStatus("erro");
        setMensagem(errorMessage);
      });

   }


   return (
     <>
       <View style={styles.container}>
         <Text style={styles.sectionTitle}>Login</Text>
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
            rightIcon={
               <TouchableOpacity
                 onPress={() => {
                    setShowPassword((prev) => !prev);
                 }}>
                 <Text>{showPassword ? 'Show' : 'Hide'}</Text>   
               </TouchableOpacity>
            }
            secureTextEntry={showPassword}
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
           title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
           onPress={handleLogin}
        />
        &nbsp;
          <Button 
           icon={
              <Icon
                 name="check"
                 size={15}
                 color="#FFF"
              /> 
           }
           color="#058FFD"
           title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SignUp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
           onPress={handleSignUp}
        />

        {/*
        <Button
           title="Naigate to next page"
           onPress={() => {
             navigation.navigate('Task'); 
           }}
        />  
        <Button
          title="Naigate to next pageggggg"  
          onPress={(event) => {
                   props.navigation.navigate('Task');
                 }}
       
        />*/}

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

export default Login;

