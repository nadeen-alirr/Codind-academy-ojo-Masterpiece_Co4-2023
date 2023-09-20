import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const Navigator = () => {
  const navigation = useNavigation();
  const handle_setting = () => {
    navigation.navigate("Setting");
  };
  const handel_profile = () => {
    navigation.navigate("Profile");
  };
  const handel_course = () => {
    navigation.navigate("Home");
  };
  return (
    <View style={styles.maincontainer}>
      <TouchableOpacity
        TouchableOpacitystyle={styles.containericon}
        onPress={handel_course}
      >
        <Image
          source={require("../assets/icon/Icon_corse.png")} 
          style={styles.courseImage}
          resizeMode="cover"
        />
        <Text style={styles.text}>Course</Text>
      </TouchableOpacity>
      <TouchableOpacity
        TouchableOpacitystyle={styles.containericon}
        onPress={handel_profile}
      >
        <Image
          source={require("../assets/icon/Profile_Icon.png")} 
          resizeMode="cover" 
        />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        TouchableOpacitystyle={styles.containericon}
        onPress={handle_setting}
      >
        <Image
          source={require("../assets/icon/Icon_setting.png")} 
          style={styles.courseImage}
          resizeMode="cover" 
        />
        <Text style={styles.text}>Setting</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Navigator;
const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderColor: "gray",
    borderWidth: 0.4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 5,
  },
  containericon: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 10,
  },
});
