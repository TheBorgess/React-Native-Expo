import React, { useEffect, useState } from 'react';
import { StyleSheet, View , Button , Alert, ToastAndroid , TouchableOpacity , ScrollView } from 'react-native';
import { Input, Icon , Text, ListItem, Avatar } from 'react-native-elements';

import { useNavigation, useRoute } from '@react-navigation/native';

import firebase from '../../firebase';

 const UsersList = () => {

   var contador = 0; 

   const db = firebase.firestore();

   const navigation = useNavigation();
   
   const [users, setUsers] = useState([]);

   useEffect (() => {
      db.collection('users').onSnapshot(querySnapshot => {
            
            const users = [];
            
            querySnapshot.docs.forEach(doc => {
               const {userName, address, phone}  = doc.data()
               users.push({
                 id: doc.id,
                 userName,
                 address,
                 phone
               })   
               //console.log(doc.data())
            });
         //console.log(users) 
         setUsers(users)
      });
   }, []);

   return (
     
      <ScrollView>
        <Button 
          title='Create User' color="#A020F0"
          onPress={() => navigation.navigate('User')}
        />

        {
           users.map(user => {
               contador = contador + 1;
               return (
                  <ListItem  key={user.id} bottomDivider onPress={() => navigation.navigate('UserDetail', { userId: user.id })} >
                     <ListItem.Chevron />
                    {/* <Avatar
                         rounded
                            source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',}}
                    /> */}
                   
                   {contador % 2 === 0 ? 
                      <Avatar rounded source={require('../../assets/headshot.webp')}/>
                    : 
                      <Avatar rounded source={require('../../assets/man.jpg')}/>  
                   }  
  
                     <ListItem.Content>
                        <ListItem.Title>{user.userName}</ListItem.Title>
                        <ListItem.Subtitle>{user.address}</ListItem.Subtitle>
                     </ListItem.Content>
                  </ListItem>
               )
           })
        }

      </ScrollView>
     
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

export default UsersList;