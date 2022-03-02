import React , { useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , ImageBackground} from 'react-native';
import { KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native';
//import { useState } from 'react/cjs/react.production.min';
import Tasks from './components/Tasks';

//const imgBackGround = './assets/icon.png'

export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () =>{
    if (task != null && task != '') {
        //keyboard.dismiss();
        setTaskItems([...taskItems, task]) 
        setTask(null);
    }  
        //console.log(task);  
  }

  const completeTask = (index) => {
     let itemsCopy = [...taskItems];
     itemsCopy.splice(index, 1);
     setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      
      {/* Today's tasks */}
      <View style={styles.tasksWrapper}>
          
          <Text style={styles.sectionTitle}>Today's Tasks</Text>

          <View style={styles.items}>
              {/***** Tasks ******/}
              {
                taskItems.map((item, index) => {
                  return (
                    <TouchableOpacity onPress={() => completeTask(index)}>
                        <Tasks text={item} />
                    </TouchableOpacity>
                  )
                })
              }   

              {/*<Tasks text={'Taks 1'}/>
                 <Tasks text={'Taks 2'}/>
                 <Tasks text={'Taks 3'}/>
                 <Tasks text={'Taks 4'}/>*/}

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
  imagemFundo: {
    flex:1,
    resizeMode:"cover",
    width:"100%",
    height:"100%" , 
    padding:15,
  },
  tasksWrapper: {
    paddingTop: 80,
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
    bottom: 60,
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
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,

  },
});
