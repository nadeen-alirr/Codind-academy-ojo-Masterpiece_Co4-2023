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
import Navigator from "../components/Navigator";
import { useNavigation } from "@react-navigation/native";
const YourCourse = () => {
  const navigation = useNavigation();
  const handle_Items = () => {
    navigation.navigate("Choose Lessons Course");
  };
  return (
    <SafeAreaView style={styles.Maincontainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.ContainerImage}>
          <View style={styles.background_image}>
            <Image
              source={require("../assets/images/Cool_Kids_Discussion.png")}
              style={styles.image_category}
            ></Image>
            <View style={styles.container_price}>
              <Text style={styles.price}>$50</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.container_info_card}
            onPress={handle_Items}
          >
            <Text style={styles.duration}>3 h 30 min</Text>
            <Text style={styles.Title}>UI</Text>
            <Text style={styles.description}>
              Advanced mobile interface design
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ContainerImage}>
          <View style={styles.background_image}>
            <Image
              source={require("../assets/images/Cool_Kids_Discussion.png")}
              style={styles.image_category}
            ></Image>
            <View style={styles.container_price}>
              <Text style={styles.price}>$50</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.container_info_card}
            onPress={handle_Items}
          >
            <Text style={styles.duration}>3 h 30 min</Text>
            <Text style={styles.Title}>UI</Text>
            <Text style={styles.description}>
              Advanced mobile interface design
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.navigator}>
        <Navigator />
      </View>
    </SafeAreaView>
  );
};

export default YourCourse;
const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
    marginTop: 0,
  },
  ContainerImage: {
    margin: 12,
    justifyContent: "center",
    borderRadius: 2,
    borderWidth: 0.3,
    borderBlockColor: "gray",
    borderRadius: 10,
    elevation: 2,
    marginBottom: 20,
    shadowColor: "#000",
  },
  background_image: {
    backgroundColor: "#D2E6E4",
    paddingBottom: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  image_category: {
    borderRadius: 10,
  },
  duration: {
    // color:'#D2E6E1',
  },
  Title: {
    fontWeight: "bold",
    fontSize: 25,
  },
  description: {},
  container_info_card: {
    marginLeft: 15,
    padding: 12,
  },
  container_price: {
    backgroundColor: "#0B7077",
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 18,
    position: "absolute",
    top: 160,
    right: 20,
  },
  price: {
    color: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
