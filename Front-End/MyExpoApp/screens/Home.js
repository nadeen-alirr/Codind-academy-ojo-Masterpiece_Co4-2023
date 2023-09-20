import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView 
} from "react-native";
import InputFiled from "../components/InputFiled";
import Navigator from "../components/Navigator";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
const Home = () => {

    const navigation = useNavigation();
    const [courses, setCourses] = useState([]); 
    console.log("Before axios request");
    axios.get("http://localhost:3010/api/getCourse")
      .then(response => {
        console.log("Response:", response.data);
        setCourses(response.data.courses);
      })
      .catch(error => {
        console.error("Error fetching courses:", error);
      });
    console.log("After axios request");
    const handle_search=()=>{
        navigation.navigate('Result');
    }
    const handle_Items=()=>{
        navigation.navigate('Details')
    }
   console.log(courses)
  return (
    <SafeAreaView style={styles.Maincontainer}>
      <View>
        <Image source={require("../assets/images/Logo.png")}></Image>
      </View>
      <View style={styles.container_header}>
        <View>
          <Text>Hello</Text>
          <Text style={styles.name}>Nadeen Adel</Text>
        </View>
        <View>
          <Image source={require("../assets/icon/notification.png")}></Image>
        </View>
      </View>
      <View style={styles.filed_input}>
        <InputFiled placeholder={'Search'}></InputFiled>
        <TouchableOpacity style={styles.searchButton} onPress={handle_search}>
        <Image source={require('../assets/icon/Search_Icon.png')} style={styles.icon_search}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.containerCategory}>
        <Text style={styles.category}>Category:</Text>
        <ScrollView horizontal style={styles.containerhorizintal}  showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.category_Items}>
                <Text>Programming</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.category_Items}>
                <Text>Design</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.category_Items}>
                <Text>PhotoShop</Text>
            </TouchableOpacity>
        </ScrollView>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.ContainerImage}>
        <View style={styles.background_image}>
            <Image source={require('../assets/images/Cool_Kids_Discussion.png')} style={styles.image_category}></Image>
            <View style={styles.container_price}>
                <Text style={styles.price}>$50</Text>
            </View>
        </View>
        <TouchableOpacity style={styles.container_info_card} onPress={handle_Items}>
        <Text style={styles.duration}>3 h 30 min</Text>
        <Text style={styles.Title}>UI</Text>
        <Text style={styles.description}>Advanced mobile interface design</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.ContainerImage}>
        <View style={styles.background_image}>
            <Image source={require('../assets/images/Cool_Kids_Discussion.png')} style={styles.image_category}></Image>
            <View style={styles.container_price}>
                <Text style={styles.price}>$50</Text>
            </View>
        </View>
        <TouchableOpacity style={styles.container_info_card} onPress={handle_Items}>
        <Text style={styles.duration}>{courses.duration}</Text>
        <Text style={styles.Title}>UI</Text>
        <Text style={styles.description}>Advanced mobile interface design</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      <View style={styles.navigator}>
      <Navigator/>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
  },
  container_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
searchButton: {
    position: 'absolute',
    top: 0,
    right: 30,
    height: 90, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_search: {
    width: 20,
    height: 20,
  },
  filed_input:{
  
  },
  containerCategory:{
    flexDirection:'row',
    gap:12,
    alignItems:'center',
    marginTop:10,
    marginBottom:10
  },
  category:{
    fontWeight:'bold',
    marginLeft:10,
  },
  containerhorizintal:{
    flexDirection:'row',
  },
  category_Items:{
    backgroundColor:'#65AAEA',
    borderRadius:20,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:5,
    paddingBottom:5,
    marginHorizontal: 15,
    justifyContent:'center',
    alignItems:'center'
  },
  ContainerImage:{
    margin:12,
    justifyContent:'center',
    borderRadius:2,
    borderWidth: 0.3, 
    borderBlockColor:'gray',
    borderRadius:10,
    elevation: 2,
    marginBottom: 20,
    shadowColor: "#000",
  },
  background_image:{
    backgroundColor:'#D2E6E4',
    paddingBottom:50,
    justifyContent:'center',
    alignItems:'center',
    paddingTop:15,
    borderTopEndRadius:10,
    borderTopStartRadius:10,

  },
  image_category:{
    borderRadius:10
  },
  duration:{
    // color:'#D2E6E1',
  },
  Title:{
    fontWeight:'bold',
    fontSize:25,
  },
  description:{

  },
  container_info_card:{
    marginLeft:15,
    padding:12
  },
  container_price:{
    backgroundColor:"#0B7077",
    paddingLeft:12,
    paddingRight:12,
    borderRadius:18,
    position:'absolute',
    top:160,
    right:20,
  },
  price:{
    color:'#fff'
  },
  container:{
    flex:1,
    backgroundColor:'#fff'
  },

});
