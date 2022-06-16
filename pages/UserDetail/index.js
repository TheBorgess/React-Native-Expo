import React, { useState, useEffect } from 'react';
import { StyleSheet, View , Button , Alert, ToastAndroid , TouchableOpacity , ActivityIndicator , Text } from 'react-native';
import { Input, Icon } from 'react-native-elements';

import { useNavigation, useRoute } from '@react-navigation/native';

import { TextInputMask } from 'react-native-masked-text';

import firebase from '../../firebase';

 const UserDetail = () => {

   const route = useRoute(); 
   //console.log('phone===='  + route.params?.phone);

   const db = firebase.firestore();

   const navigation = useNavigation();
   
   const [user, setUser] = useState({
      id: "",
      userName: "",
      address: "",
      phone: ""
   }); 
    
   const [loading, setLoading] = useState(true)

   const getUserById = async (id) => {
       const dbRef = db.collection('users').doc(id)
       const doc = await dbRef.get(id);
       const user = doc.data();
       setUser({
          ...user,
          id: doc.id, 
       });
       //console.log(user);
       setLoading(false);
   }

   useEffect(() => {
      getUserById(route.params?.userId);
   },[route.params?.userId]);

   const goBack = () => {
      //setUser({ ...user, id: '', userName: '', address: '', phone: ''}); 
      setLoading(true);
      navigation.navigate('UsersList');
   }
   
   const handleUpdateUser = (name, value) => {
      setUser({ ...user, [name]: value})
   }

   const updateUser = async () => {
      //console.log('name:' + user.userName);
      //console.log('image:' + route.params?.image);
      //console.log('phone:' + user.phone);
      //console.log('image 2:' + user.address);
 
      var idOk = "";
      if (route.params?.id) {
           idOk = route.params?.id;
           //console.log('111');
      } 
      
      if (user.id && !route.params?.id) {    
            idOk = user.id;
            //console.log('222');
      }     

      var userNameOk = "";
      if (route.params?.userName) {
           userNameOk = route.params?.userName;
      } 
      
      if (user.userName) {    
            userNameOk = user.userName;
      }     

      var imageOk = "";
      if (route.params?.image) {
           imageOk = route.params?.image;
      } 
      
      if (user.address) {    
            imageOk = user.address;
      }

      var phoneOk = "";
      if (route.params?.phone) {
           phoneOk = route.params?.phone;
      } 
      
      if (user.phone) {    
            phoneOk = user.phone;
      }

      //console.log('id= ' + idOk)

      //const dbRef = db.collection('users').doc(user.id);
      const dbRef = db.collection('users').doc(idOk);
      await dbRef.set({
         userName: userNameOk,//user.userName,
         address: imageOk,  //route.params?.image,  //user.address,
         phone: phoneOk //user.phone
      })
      //setUser({ ...user, id: '', userName: '', address: '', phone: ''}); 
      alert('User has been updated with success');
      navigation.navigate('UsersList');   
   }

   const deleteUser = async () => {

      Alert.alert(
       "Delete Record",
       "Are you sure to delete this record?",
       [
        {
          text: "Cancel",
          //onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteUser2() }
       ]
      );  

   }

   const deleteUser2 = async () => {
     
     const dbRef = db.collection('users').doc(route.params?.userId)
      await dbRef.delete();
      alert('User has been deleted with success!');
      navigation.navigate('UsersList');

   }

   const updateImage = () => {
      navigation.navigate('UpdateImage', { id: user.id, phone: user.phone, userName: user.userName });  
   }

   if (loading) {
     return( 
        <View>
           <ActivityIndicator size="large" color="#921DD9" />
        </View>
     )  
   }

   return (
     <>
      {/* <Button 
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
       />*/}

       <View style={styles.container}>
         <Text style={styles.sectionTitle}>Details</Text>
     
      {(!route.params?.userName) ?   
         <Input 
            placeholder='Name' value={user.userName}
            onChangeText={(value) => handleUpdateUser('userName', value)}
         />
      :
         <Input 
            placeholder='Name' value={route.params?.userName}
            onChangeText={(value) => handleUpdateUser('userName', value)}
         />
      }

      {(!route.params?.image) ? 
         <Input  editable = {false}
            placeholder='Image' value={user.address}
            onChangeText={(value) => handleUpdateUser('address', value)} 
         />
       :
         <Input  editable = {false}
            placeholder='Image' value={route.params?.image}
            onChangeText={(value) => handleUpdateUser('address', value)}
          /> 
       }  
   
       {/* <Input 
            placeholder='Phone' value={user.phone}
            onChangeText={(value) => handleUpdateUser('phone', value)}
         /> */}

      {(!route.params?.phone) ?  
         <TextInputMask
           style={styles.input}
           placeholder='Phone'
           type={'cel-phone'}
           options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
           }}
           value={user.phone}
           onChangeText={(value) => handleUpdateUser('phone', value)}
        />  
      :  
        <TextInputMask
           style={styles.input}
           placeholder='Phone'
           type={'cel-phone'}
           options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
           }}
           value={route.params?.phone}
           onChangeText={(value) => handleUpdateUser('phone', value)}
        />  
      } 

        <Button 
           icon={
              <Icon
                 name="check"
                 size={15}
                 color="#FFF"
              /> 
           }
           color="#A020F0"
           title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Update User&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
           onPress={updateUser}
        />

        <Text style={styles.sectionTitle2}>t</Text>
        
        <Button 
           color="#058FFD"
           title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pick a Image&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
           onPress={updateImage}
        />
         
        <Text style={styles.sectionTitle2}>t</Text> 

        <Button 
           icon={
              <Icon
                 name="check"
                 size={15}
                 color="#FFF"
              /> 
           }
           color="red"
           title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Delete User&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
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
   sectionTitle2: {
        color: 'white',
        fontSize: 10,
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
 })

export default UserDetail;

