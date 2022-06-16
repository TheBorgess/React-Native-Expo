import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { useNavigation, useRoute } from '@react-navigation/native';

export default function PickUpdateImage() {

  const navigation = useNavigation();

   const route = useRoute(); 
   //console.log('===='  + route.params?.image);   

  let [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });

    //console.log('===' + selectedImage.localUri);
    //console.log('id===' + route.params?.id);

  };

   useEffect(() => {  
      openImagePickerAsync();
   },[]);

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
       <Text></Text>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
         <Button 
           color="#A020F0"
           title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Save Image&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
           onPress={() => { navigation.navigate('UserDetail', { image: selectedImage.localUri,  id: route.params?.id, userName: route.params?.userName, phone: route.params?.phone }) }} 
        />
      </View>
    );
  }

  return (
    <>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 200,
    height: 200,
    //resizeMode: 'contain',
    borderRadius: 100, 
    marginBottom: 10,
  },
});
