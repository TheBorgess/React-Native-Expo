import React , { useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Keyboard , FlatList , Alert , Button } from 'react-native';
import { KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation , useRoute } from '@react-navigation/native';

import Tasks from './components/Tasks';

export default function App({ route }) {

  const [task, setTask] = useState();
  
  const [taskItems, setTaskItems] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getTasksFromDevice();
  },[]);  

  useEffect(() => {
      saveTasksToDevice(taskItems);
  },[taskItems]);   

  const saveTasksToDevice = async (taskItems) => {
     try {
        const stringifyTaskItems = JSON.stringify(taskItems);
        await AsyncStorage.setItem('taskItems', stringifyTaskItems);
     } 
     catch (e) {
        /////saving error
        console.log(e);
     }

  }

  const getTasksFromDevice = async () => {
     try {
       const taskItems = await AsyncStorage.getItem('taskItems')  
       if (taskItems != null) {
           setTaskItems(JSON.parse(taskItems));
       }  
    }
      catch (error) {
        console.log(error);
     }

  }

  const handleAddTask = () => {
    if(task == '' || task == null) {
      ////erro message
      console.log('Error, Task is null');
    }
    else {     
          //console.log(task);  
          const newTask = {
              id: Math.random(),
              name: task,
          };
          setTaskItems([...taskItems, newTask]);
          setTask('');
    }
    Keyboard.dismiss();
  }

  const completeTask = (index) => {

  /*  Alert.alert(
      "Delete Record",
      "Are you sure to delete this record?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("Ok Pessed") }
      ]
    );  

     //console.log(index);
     console.log('Task deleted with success');
     const newTask = taskItems.filter(item => item.id != index);
     setTaskItems(newTask); */

     Alert.alert(
      "Delete Record",
      "Are you sure to delete this record?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteTask(index) }
      ]
    );  

  }

   const deleteTask = (index) => {
     const newTask = taskItems.filter(item => item.id != index);
     setTaskItems(newTask);
  }

  return (
    <View style={styles.container}>

      <Button 
           color="#CC66FF"
           title="Users List"
           onPress={() => navigation.navigate('UsersList')}
      />

      {/* Today's tasks */}
      <View style={styles.tasksWrapper}>
          
          <Text style={styles.sectionTitle}>Today's Tasks - Storage</Text>

          <View style={styles.items}>

          {/*  <ScrollView>  */ }
              {/***** Tasks ******/}
             
              <FlatList 
                 data={taskItems} 
                 renderItem={({item}) => 
                 <TouchableOpacity onPress={() => completeTask(item?.id)}>
                   <Tasks text={item} />
                 </TouchableOpacity> } 
              /> 

              {/*<Tasks text={'Taks 1'}/>
                 <Tasks text={'Taks 2'}/>*/}

          {/*  </ScrollView>  */}
          
          </View> 

      </View>

      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
       >
         <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
         
         <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>  
               <Text style={styles.addText}>+</Text>
            </View>
         </TouchableOpacity>
      </KeyboardAvoidingView> 

      <StatusBar style="auto" />
      
    </View>
  
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A020F0',
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 24,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper:{
    position: 'absolute',
    bottom: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
  addWrapper:{
    width: 50,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
});
