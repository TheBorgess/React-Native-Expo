import React from 'react';
import { View, ScrollView, StyleSheet, Image , Button} from 'react-native';
import { Text, Card, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';

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

//type CardsComponentsProps = {};

const Cards = () => {

  const navigation = useNavigation()

  const showContact = () => {  
          navigation.navigate("Contact")
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Card>
            <Card.Title>BORGES' APP</Card.Title>
            <Card.Divider />
            <Card.Image
              style={{ padding: 0 , width: 330, height: 250, borderTopRightRadius: 30, 
                borderBottomRightRadius: 30 , borderBottomLeftRadius: 30, borderTopLeftRadius: 30}}
              source={require('../../assets/about.jpg')}
            />
            <Text style={{ marginBottom: 10 }}>
              Hi my name is Marcio Correa Borges, i'm a web and mobile developer, i'm 43 years old.
              I have a son, his name is Antonio Alaur.<br />
              At the moment i'm learnig react native and loving that.<br />
              The idea with React Native Elements is more about component
              structure than actual design.
            </Text>
            <Button
              icon={
                <Icon
                  name="code"
                  color="#ffffff"
                  iconStyle={{ marginRight: 10 }}
                />
              }
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              color="#A020F0"
              title="VIEW NOW"
              onPress={() => showContact()}
            />
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
});

export default Cards;