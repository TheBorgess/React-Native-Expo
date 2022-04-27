
import React, { useState } from 'react';
import { StyleSheet, View , Button , Alert, ToastAndroid , TouchableOpacity , Text} from 'react-native';
import { Input, Icon } from 'react-native-elements';
///////import { useNavigation } from '@react-navigation/core';
import { useNavigation , useRoute } from '@react-navigation/native';

import firebase from '../../firebase';

 const SignUp = () => {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [status, setStatus] = useState("");
   const [mensagem, setMensagem] = useState("");

   const [showPassword, setShowPassword] = useState(true);
   
   const navigation = useNavigation();

   const route = useRoute();
   //console.log('===', route.params.nome);

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
       //navigation.navigate("Login");
       navigation.navigate("UserLogin"); 
    }

   return (
     <>
      <Button 
           icon={
              <Icon
                 name="check"
                 size={15}
                 color="CC66FF"
              /> 
           }
           color="#A020F0" 
           title="go back"
           onPress={goBack}
      />

       <View style={styles.container}>
         
         <Text style={styles.sectionTitle}>{route.params?.nome}</Text>
         <Text style={styles.sectionTitle}>SignUp</Text>

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