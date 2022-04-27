import React, { useState } from 'react';
import { StyleSheet, View , Button , Alert, ToastAndroid , TouchableOpacity , Text} from 'react-native';
import { Input, Icon } from 'react-native-elements';

import { useNavigation, useRoute } from '@react-navigation/native';

import firebase from '../../firebase';

 const User = () => {

   const db = firebase.firestore();

   const navigation = useNavigation();
   
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
      if (state.userName != '') {   
        await db.collection('users').add({   //firebase.db.collection
                 userName: state.userName,
                 address: state.address,
                 phone: state.phone
        });
        setState({ ...state, userName: '', address: '', phone: ''}); 
        //console.log('name=', state.userName);
        alert('User added with success');
        navigation.navigate('UsersList');
      }else{
         alert('Error, Name is null');
      }  
   }

   const goBack = () => {
      navigation.navigate('UsersList');
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
         <Text style={styles.sectionTitle}>New User</Text>

         <Input 
            placeholder='Name' value={state.userName}
            onChangeText={(value) => handleCreateUser('userName', value)}
         />

        <Input 
            placeholder='Address' value={state.address}
            onChangeText={(value) => handleCreateUser('address', value)}
         />
   
        <Input 
            placeholder='Phone' value={state.phone}
            onChangeText={(value) => handleCreateUser('phone', value)}
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
           title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Save User&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
           onPress={addNewUser}
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
 })

export default User;

