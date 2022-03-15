import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon, ListItem } from 'react-native-elements';

const users = [
  {
    name: 'brynn',
    avatar: 'https://uifaces.co/our-content/donated/1H_7AxP0.jpg',
  },
  {
    name: 'thot leader',
    avatar:
      'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
  },
  {
    name: 'jsa',
    avatar: 'https://uifaces.co/our-content/donated/bUkmHPKs.jpg',
  },
  {
    name: 'talhaconcepts',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    name: 'andy vitale',
    avatar: 'https://uifaces.co/our-content/donated/NY9hnAbp.jpg',
  },
  {
    name: 'katy friedson',
    avatar:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxMTc1MTYzM15BMl5BanBnXkFtZTgwNzI5NjMwOTE@._V1_UY256_CR16,0,172,256_AL_.jpg',
  },
];

const NewsCard = ( {item} ) => {

    //const navigation = useNavigation()
  
    //const showContact = () => {  
    //        navigation.navigate("Contact")
    //}
  
    return (
      <>
        <ScrollView>
          <View style={styles.container}>
            <Card>
              <Card.Title>{item.title} </Card.Title>
              <Text style={styles.author} >{item.author}</Text>    
              <Card.Image
                style={{ padding: 0 , width: 300, height: 230, borderTopRightRadius: 30, 
                  borderBottomRightRadius: 30 , borderBottomLeftRadius: 30, borderTopLeftRadius: 30}}
                //source={require('../../assets/about.jpg')}
                source={{uri:item.urlToImage}}
              />
              <br />
              <Text style={{ marginBottom: 10, color: 'gray' }}>
                {item.description}
              </Text>
            </Card>

          </View>
        </ScrollView>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    fonts: {
      marginBottom: 8,
    },
    user: {
      flexDirection: 'row',
      marginBottom: 6,
    },
    image: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    name: {
      fontSize: 16,
      marginTop: 5,
    },
    author:{
       fontSize: 11,
       color: 'gray',
       marginBottom: 8,  
    }
  });
  
  export default NewsCard;