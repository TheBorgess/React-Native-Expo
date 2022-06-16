import React, { useState } from 'react';
import { StyleSheet, View , Button , Alert, ToastAndroid , TouchableOpacity , Text} from 'react-native';
import { Input, Icon } from 'react-native-elements';

import { useNavigation, useRoute } from '@react-navigation/native';

import { TextInputMask } from 'react-native-masked-text';

import firebase from '../../firebase';

 const User = () => {

   const db = firebase.firestore();

   const navigation = useNavigation();

   const route = useRoute();
   //console.log('===', route.params?.image);
   
   const [state, setState] = useState({
      userName: "",
      address: "",
      phone: ""
   });

   const handleCreateUser = (name, value) => {
      setState({ ...state, [name]: value})
      //console.log('create user:', state);
   }

   const addNewUser = async () => {
      //console.log('==', state);
     var imagemOk = "";
     if (route.params?.image){
            imagemOk = route.params?.image;
     }  
      if (state.userName != '') {   
        await db.collection('users').add({   //firebase.db.collection
                 userName: state.userName,
                 address: imagemOk, //route.params?.image,
                 phone: state.phone
        });
        setState({ ...state, userName: '', address: '', phone: ''}); 
        //console.log('name=', state.userName);
        alert('User has been added with success');
        navigation.navigate('UsersList');
      }else{
         alert('Error, Name is null');
      }  
   }

   const goBack = () => {
      navigation.navigate('UsersList');
   }

   const addImage = () => {
      navigation.navigate('Image');  
   }

   return (
     <>
       <View style={styles.container}>
         <Text style={styles.sectionTitle}>New User</Text>

         <Input 
            placeholder='Name' value={state.userName}
            onChangeText={(value) => handleCreateUser('userName', value)}
         />

        <Input editable = {false}
            placeholder='Image' value={route.params?.image}
            onChangeText={(value) => handleCreateUser('address', value)}
         />
   
        {/*<Input 
            placeholder='Phone' value={state.phone}
            onChangeText={(value) => handleCreateUser('phone', value)}
         />*/}

        <TextInputMask
           style={styles.input}
           placeholder='Phone'
           type={'cel-phone'}
           options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
           }}
           value={state.phone}
           onChangeText={(value) => handleCreateUser('phone', value)}
        />  

        <Button 
           color="#A020F0"
           title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Save User&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
           onPress={addNewUser}
        />

          <Text style={styles.sectionTitle2}>t</Text>

        <Button 
           color="#058FFD"
           title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pick a Image&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
           onPress={addImage}
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
    color: "red",
  },
  input: {
    width: '97%',
    height: 40,
    backgroundColor: 'white',
    borderBottomWidth:1,
    borderRadius: 5,
    fontSize: 19,
    padding: 5,
    marginBottom: 25,
  },
  button: {
    width: '100%',
    borderRadius: 5,
    marginTop: 14,
  },
  sectionTitle2: {
    color: 'white',
    fontSize: 14,
  },
 })

export default User;

