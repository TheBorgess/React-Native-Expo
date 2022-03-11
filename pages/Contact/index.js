import React  from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export default function Contact() {

  return (
    <View style={styles.container}>
      
      <View style={styles.tasksWrapper}>
          
          <Text style={styles.sectionTitle}>For more information, contact us at marcioitaqui@yahoo.bom.br or 
          Phone: 55 3433-8384</Text>     

      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A020F0',
  },  
  tasksWrapper: {
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 24,
  },
  items: {
    marginTop: 30,
  },
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
});
