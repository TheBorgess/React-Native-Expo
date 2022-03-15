import React , { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, FlatList } from 'react-native';
import NewsCard from '../components/NewsCard';
import newAPI from '../apis/News';


const News = () => { 

   const [news, setNews] = useState([]);

   useEffect(() => {
        ////newsResponse();
        getNewsFromAPI();
   },[]);

   ////const newsResponse = async() => {
   ////   const response = await newAPI.get('top-headlines?country=us&apiKey=aa6a097fb9fb4509958fdabd1942e6d1'); 
   ////   console.log(response.data);
   ////}
   
   function getNewsFromAPI(){
      
      newAPI.get('top-headlines?country=us&apiKey=aa6a097fb9fb4509958fdabd1942e6d1')
      .then(async function(response){
         setNews(response.data)
      })
      .catch(function(error){
         console.log(error);  
      })

   }

   //if(!news){
   //   return null;
   //}

   return(
        
        <View style={styles.container}>
           <Text style={styles.author}>News</Text> 
          
           <FlatList data={news.articles}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={({item}) => {
                 return <NewsCard item = {item}/>
              }}
           />

        </View>
   
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
   author:{
      fontSize: 13,
      alignSelf: 'center',
      color: 'gray',
      fontWeight: 'bold',
      marginBottom: 0,
      marginTop: 5  
   }
 });

export default News;