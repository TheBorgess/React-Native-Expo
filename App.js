import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  NativeBaseProvider,
  Button,
  Box,
  HamburgerIcon,
  Pressable,
  Heading,
  VStack,
  Text,
  Center,
  HStack,
  Divider,
  Icon,
} from "native-base";

//import Tasks from './components/Tasks';
import Task from './Task';
import Login from './pages/Login'
import Cards from './pages/About';
import Contact from './pages/Contact';
import SignUp from "./pages/SignUp";

const Drawer = createDrawerNavigator();

const showPage = (pageToShow) => {
  
  if(pageToShow == 'SignUp') {
    return <SignUp />
  }  
  if(pageToShow == 'Tasks') {
     return <Task />
   }  
   if(pageToShow == 'About Us') { 
     return <Cards />
   }  
   if(pageToShow == 'Contact') { 
     return <Contact />
   }  
   return <Login />
  
}

function Component(props) {
  return (
    <>
      {/*<Center>
       <Text mt="12" fontSize="18">  */}

          {showPage(props.route.name)}  
          {/*props.route.name*/}
                
       {/*} </Text>
       </Center>*/}
    </>
  );
}

const getIcon = (screenName) => {
  switch (screenName) {
    case "Login":
      return undefined;
    case "SignUp":
        return undefined;  
    case "Tasks":
      return undefined;
    case "Contact":
      return undefined;
    case "About Us":
      return undefined;
    case "Trash":
      return "trash-can";
    case "Spam":
      return "alert-circle";
    default:
      return undefined;
  }
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames.map((name, index) => (
              <Pressable
                px="5"
                py="3"
                rounded="md"
                bg={
                  index === props.state.index
                    ? "rgba(6, 182, 212, 0.1)"
                    : "transparent"
                }
                onPress={(event) => {
                  props.navigation.navigate(name);
                }}
              >
                <HStack space="7" alignItems="center">
                  <Icon
                    color={
                      index === props.state.index ? "primary.500" : "gray.500"
                    }
                    size="5"
                    as={<MaterialCommunityIcons name={getIcon(name)} />}
                  />
                  <Text
                    fontWeight="500"
                    color={
                      index === props.state.index ? "primary.500" : "gray.700"
                    }
                  >
                    {name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        
        <Drawer.Screen options={{ headerShown: false }}  name="Login" component={Component} />
        <Drawer.Screen options={{ headerShown: false }}  name="SignUp" component={Component} />
        <Drawer.Screen name="Tasks" component={Component} />
        <Drawer.Screen name="Contact" component={Component} />
        <Drawer.Screen name="About Us" component={Component} />
       
      </Drawer.Navigator>
    </Box>
  );
}

export default function Example() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <MyDrawer />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
