
import React, { useState } from 'react';
import { StyleSheet, View , Button , Alert} from 'react-native';
import { Input, Icon , Text} from 'react-native-elements';
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
import { useAnimatedGestureHandler } from 'react-native-reanimated';

 const Login = () => {

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   
   const navigation = useNavigation()

   const loginOk = () => {  
      
      if (email == 'marcio') { 
           //console.log(email)
           navigation.navigate("Tasks")
      } else {
           //console.log(password)
           //setEmail("");
           Alert.alert("Alert Title", "My Alert Msg",
              [
                {
                  text: "Cancel", onPress: () => console.log("Cancel Pressed"),
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
           );
          
      }  
   }

   return (
     <>
       <View style={styles.container}>
         <Text style={styles.sectionTitle}>Login</Text>
         &nbsp;&nbsp;<br />
         <Input 
            placeholder='E-mail'
            //leftIcon={{ type: 'font-awesome', name: 'envelope'}}
            leftIcon={<Icon name="email" size={23} color="#A020F0" />}
            keyboardType="email-address"
            onChangeText={(text)=>setEmail(text)}
         />
         <Input 
            placeholder='Password'
            //leftIcon={{ type: 'font-awesome', name: 'lock'}}
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
           title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
           onPress={() => loginOk()}
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
 })

export default Login;

