import React, { useEffect, useState } from 'react';
import { StyleSheet, View , Button , Alert, ToastAndroid , TouchableOpacity , ScrollView , ActivityIndicator, TextInput , KeyboardAvoidingView , Text } from 'react-native';
import { Input, Icon , ListItem, Avatar } from 'react-native-elements';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import { useNavigation, useRoute } from '@react-navigation/native';

import firebase from '../../firebase';

const UsersList = () => {

   var contador = 0; 

   const db = firebase.firestore();

   const navigation = useNavigation();
   
   const [users, setUsers] = useState([]);

   //Search Text 
   const [searchText, setSearchText] = useState('');

   const [loading, setLoading] = useState(true)

   useEffect (() => {
      db.collection('users').orderBy('userName').onSnapshot(querySnapshot => {
      //db.collection('users').where("userName", ">=", "M").onSnapshot(querySnapshot => {
           
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
         setLoading(false);
      });
   }, []);

   const searchUsers = () => {
         //console.log('search', searchText);
         db.collection('users').where("userName", ">=", searchText).onSnapshot(querySnapshot => {
         //db.collection('users').orderBy('userName').startAt('Marcio').onSnapshot(querySnapshot => {    
               const users = [];
               
               querySnapshot.docs.forEach(doc => {
                  const {userName, address, phone}  = doc.data()
                  users.push({
                    id: doc.id,
                    userName,
                    address,
                    phone
                  })   
               });
            setUsers(users)
            setLoading(false);
         });
   }

   const rightSwipe = () => {
          return (
            <TouchableOpacity  activeOpacity={0.9}> 
              <View style={styles.deleteButton}>
                 <Text style={styles.textButton}>Delete</Text>
              </View>
            </TouchableOpacity>  
          )
   }

   const deleteUser = async (id) => {
       const dbRef = db.collection('users').doc(id);
       await dbRef.delete();
       //console.log('id==' , id);
       alert('User has been deleted with success!');
       setUsers([]);
       searchUsers();
   }


   if (loading) {
      return( 
         <View>
             <ActivityIndicator size="large" color="#921DD9" />            
         </View>
      )  
   }

   return (

    <ScrollView>
     
       <Button 
          title='Create User' color="#A020F0"
          onPress={() => navigation.navigate('User')}
       />
     
       <View style={styles.container}> 

         <Input 
            style={styles.input}
            placeholder='Search'  value={searchText}
            rightIcon={
               <TouchableOpacity
                  onPress={() => {searchUsers()}}>
                 <Text>Search</Text>   
               </TouchableOpacity>               
            }
            onChangeText={(t) => setSearchText(t)}  
         />
        
       </View>

        {
           users.map(user => {
               contador = contador + 1;
               return (
                
                <Swipeable onSwipeableRightOpen={() => deleteUser(user.id)} renderRightActions={rightSwipe}>

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
                        <ListItem.Subtitle>{user.phone}</ListItem.Subtitle>
                     </ListItem.Content>
                  </ListItem>
              
                </Swipeable>

               )
           })
        }

    </ScrollView> 
     
   );
 
  };

 const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
   sectionTitle: {
        color: 'black',
        fontSize: 24,
   },
   baseText: {
    color: "red",
   },
   input: {
     height: 25,
     margin: 12,
     borderWidth: 1,
     padding: 10,
   },
   deleteButton: {
     backgroundColor: 'red',
     justifyContent: 'center',
     alignItems: 'center',
     width: 200,
     height: 70,
   },
   textButton: {
     color: 'white',
   },
 })

export default UsersList;
