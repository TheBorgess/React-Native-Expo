import React, { useState, useEffect } from 'react';
import { StyleSheet, View , Button , Alert, ToastAndroid , TouchableOpacity } from 'react-native';
import { Input, Icon , Text} from 'react-native-elements';

import { useNavigation, useRoute } from '@react-navigation/native';

import firebase from '../../firebase';

 const UserDetail = () => {

   const route = useRoute(); 
   //console.log(route.params?.userId);

   const db = firebase.firestore();

   const navigation = useNavigation();
   
   const [user, setUser] = useState({
      id: "",
      userName: "",
      address: "",
      phone: ""
   }); 

   const getUserById = async (id) => {
       const dbRef = db.collection('users').doc(id)
       const doc = await dbRef.get(id);
       const user = doc.data();
       setUser({
          ...user,
          id: doc.id, 
       });
       //console.log(user);
   }

   useEffect(() => {
      getUserById(route.params?.userId);
   },[route.params?.userId]);

   const goBack = () => {
      setUser({ ...user, id: '', userName: '', address: '', phone: ''}); 
      navigation.navigate('UsersList');
   }
   
   const handleUpdateUser = (name, value) => {
      setUser({ ...user, [name]: value})
   }

   const updateUser = async () => {
      const dbRef = db.collection('users').doc(user.id);
      await dbRef.set({
         userName: user.userName,
         address: user.address,
         phone: user.phone
      })
      //setUser({ ...user, id: '', userName: '', address: '', phone: ''}); 
      navigation.navigate('UsersList');
   }

   const deleteUser = async () => {
      const dbRef = db.collection('users').doc(route.params?.userId)
      await dbRef.delete();
      alert('User deleted with success');
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
         <Text style={styles.sectionTitle}>Details</Text>
         &nbsp;&nbsp;<br />

         <Input 
            placeholder='Name' value={user.userName}
            onChangeText={(value) => handleUpdateUser('userName', value)}
         />

        <Input 
            placeholder='Address' value={user.address}
            onChangeText={(value) => handleUpdateUser('address', value)}
         />
   
        <Input 
            placeholder='Phone' value={user.phone}
            onChangeText={(value) => handleUpdateUser('phone', value)}
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
           title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Update User&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
           onPress={updateUser}
        />
        <br />
        <Button 
           icon={
              <Icon
                 name="check"
                 size={15}
                 color="#FFF"
              /> 
           }
           color="red"
           title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Delete User&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
           onPress={deleteUser}
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

export default UserDetail;

