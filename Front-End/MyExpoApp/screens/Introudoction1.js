import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import StepsProgress from "../components/StepsProgress";
import { useNavigation } from "@react-navigation/native";
export const Introudoction1 = () => {
    const navigation = useNavigation();
    const handle_Next=()=>{
        navigation.navigate('introduction2')
    }
    const handle_skip=()=>{
        navigation.navigate('introduction2')
    }
  return (
    <SafeAreaView style={styles.Maincontainer}>
      <View style={styles.container_Intro1}>
        <View style={styles.container_Skip}>
            <TouchableOpacity onPress={handle_skip} >
                <Text style={styles.text_skip}>Skip</Text>
            </TouchableOpacity>
        </View>
        <Image
          source={require("../assets/images/Cool_Kids_LongDistanceRelationship.png")}
        ></Image>
        <View style={styles.container_Titles}>
          <Text style={styles.container_description_1}>Learn anytime and anywhere</Text>
          <Text style={styles.container_description}>
            Quarantine is the perfect time to spend your day learning something
            new, from anywhere!
          </Text>
        </View>
        <View style={styles.container_progress_bar}>
            <StepsProgress currentStep={1}/>
        </View>
        <View style={styles.container_button}>
            <TouchableOpacity style={styles.background_btn} onPress={handle_Next}>
                <Text style={styles.Text_Btn}>
                    Next
                </Text>
            </TouchableOpacity>
        </View>
      </View>
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
  container_Titles:{
    justifyContent:'center',
    alignItems:'center',
    margin:30,
    gap:20,
  },
  container_description:{
    textAlign:'center'
  },
  container_description_1:{
    marginLeft:60,
    marginRight:60,
    textAlign:'center',
    fontWeight:'bold',
    fontSize:20,
  },
  background_btn:{
    backgroundColor:'#FFB606',
    padding:10,
    borderRadius:12,
    
  },
  container_button:{
    padding:20,
  },
  Text_Btn:{
    color:'#fff',
    textAlign:'center',
  },
  container_Skip:{
    justifyContent:'flex-end',
    alignItems:'flex-end',
    marginRight:20,
    marginBottom:20
  },
  text_skip:{
    fontWeight:'bold',
    color:'gray',

  }
});
