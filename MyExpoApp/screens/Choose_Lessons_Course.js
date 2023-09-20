import React from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Choose_Lessons_Course = () => {
  const navigation = useNavigation();
  const handle_back = () => {
    navigation.navigate("Your Course");
  };
  return (
    <SafeAreaView style={styles.Maincontainer}>
      <View style={styles.container_header}>
        <TouchableOpacity style={styles.container_back} onPress={handle_back}>
          <Image
            source={require("../assets/images/backsign.png")}
            resizeMode="cover"
          ></Image>
        </TouchableOpacity>
        <View style={styles.container_title}>
          <Text style={styles.title}>HTML</Text>
        </View>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.container_details_course}>
          <View style={styles.container_Image}>
            <View style={styles.backgroundImage}>
              <Image
                source={require("../assets/images/Cool_Kids_Long_Distance_Relationship.png")}
              ></Image>
              <View style={styles.container_play_btn}>
                <TouchableOpacity>
                  <Image
                    source={require("../assets/icon/Play_Icon.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.container_details}>
              <Text style={styles.title_course}>HTML</Text>
              <Text style={styles.mini_description}>
                Advanced web applications
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.container_lessons}>
          <TouchableOpacity style={styles.container_details_lessons}>
            <Image
              source={require("../assets/images/Cool_Kids_Long_Distance_Relationship.png")}
              style={styles.image_lessons_course}
            
            ></Image>
            <View style={styles.container_lessons_name_progress_bar}>
              <Text>Main Tags</Text>
              <View style={styles.container_progress_bar}>
                <View style={styles.progress_bar_indicetor}></View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container_details_lessons}>
            <Image
              source={require("../assets/images/Cool_Kids_OnWheels.png")}
              style={styles.image_lessons_course}
            
            ></Image>
            <View style={styles.container_lessons_name_progress_bar}>
              <Text>Tags For Header</Text>
              <View style={styles.container_progress_bar}>
                <View style={styles.progress_bar_indicetor}></View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.container_details_lessons}>
            <Image
              source={require("../assets/images/Cool_Kids_Long_Distance_Relationship.png")}
              style={styles.image_lessons_course}
            
            ></Image>
            <View style={styles.container_lessons_name_progress_bar}>
              <Text>Style Tags</Text>
              <View style={styles.container_progress_bar}>
                <View style={styles.progress_bar_indicetor}></View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
    marginTop: 0,
  },
  container_header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  container_title: {
    justifyContentL: "center",
    alignItems: "center",
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
    alignSelf: "center",
  },
  container_back: {
    marginLeft: 14,
  },
  backgroundImage: {
    backgroundColor: "#D2E6E4",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  container_details_course: {
    padding: 20,
  },
  container_Image: {
    borderWidth: 0.5,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderRadius: 20,
    shadowColor: "#000",
    elevation: 2,
  },
  title_course: {
    fontWeight: "bold",
    fontSize: 20,
  },
  mini_description: {
    color: "gray",
  },
  container_details: {
    flexDirection: "column",
    gap: 5,
    padding: 20,
  },
  container_play_btn: {
    backgroundColor: "#FFF5EE",
    alignItems: "flex-end",
    paddingRight: 15,
    paddingBottom: 8,
  },
  //   lessons styles
  container_lessons: {
    flex:1,
    paddingLeft:20,
    paddingRight:20,
  },
  image_lessons_course: {
    resizeMode:"contain",
    width:80,
    height:50,
    flexDirection:'column',
  },
  container_details_lessons:{
    flex:1,
    borderRadius:10,
    borderWidth:0.4,
    flexDirection:'row',
    padding:10,
    marginBottom:20,
    elevation: 0.8,
    shadowColor: "#000",
  },
  container_lessons_name_progress_bar:{
    flex:1
  },
  container_progress_bar:{
    width:'100%',
    height:10,
    backgroundColor:'#FFF5EE',
    overflow:'hidden',
    marginTop:10,
    borderRadius:10
  },
  progress_bar_indicetor:{
    backgroundColor:'#94C0E9',
    width:'50%',
    height:'100%',
  }
});
export default Choose_Lessons_Course;
