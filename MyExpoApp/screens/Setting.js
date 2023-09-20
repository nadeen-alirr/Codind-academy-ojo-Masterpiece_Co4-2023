import React, { useContext, useState } from "react";
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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Navigator from "../components/Navigator";
import { AuthContext } from "../context/Authcontext";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Setting = () => {
  const { userInfo, userToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [editModeUsername, setEditModeUsername] = useState(false);
  const [editModeEmail, setEditModeEmail] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  console.log("the token in the setting edit  :" + userToken);
  const token = userToken.replace("Bearer ", "");
  const decodedToken = jwt_decode(token);

  console.log("Decoded Token user name:", decodedToken.username);
  console.log("Decoded Token id:", decodedToken.id);
  console.log("Decoded Token email:", decodedToken.email);

  const uploadImage = async () => {
    console.log('Starting image upload');
    console.log('Upload Image Button Pressed');
  
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
  
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log('Picker Result:', pickerResult);
    if (!pickerResult.canceled) {
      const selectedAsset = pickerResult.assets[0];
      console.log("selectedAsset " + selectedAsset.uri);
  
      const formData = new FormData();
      formData.append('profileImage', {
        uri: selectedAsset.uri,
        type: selectedAsset.type,
        name: selectedAsset.fileName || 'profile.jpg',
      });
  
      console.log("selectedAsset.uri: " + selectedAsset.uri);
      console.log("selectedAsset.type: " + selectedAsset.type);
      console.log("selectedAsset.fileName: " + selectedAsset.fileName);
  
      try {
        const result = await fetch('http://192.168.1.110:3010/api/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (!result.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await result.json();
        console.log('Response from backend:', data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handle_save_change = async () => {
    if (editModeUsername && username.trim() === "") {
      Alert.alert("Error", "Username cannot be empty");
      return;
    }

    if (editModeEmail && !emailRegex.test(email)) {
      Alert.alert("Error", "Invalid email format");
      return;
    }
    try {
      const response = await axios.post(
        "http://192.168.1.110:3010/api/update",
        {
          body: {},
        }
      );
      // Handle success
    } catch (error) {
      // Handle error
    }
  };
  return (
    <SafeAreaView style={styles.Maincontainer}>
      <View>
        <TouchableOpacity style={styles.containerImage} onPress={uploadImage}>
          <Image
            source={require("../assets/images/Cool_Kids_Bust.png")}
            style={styles.image_profile}
          />
          <Image
            source={require("../assets/images/Vector.png")}
            style={styles.plus_icon}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.titleSetting}>Account information</Text>
        </View>
        <View style={styles.mainContiner2}>
          <View style={styles.container_card}>
            <View style={styles.back_ground_card}>
              <View style={styles.container_icon_pls_details}>
                <View>
                  <Image
                    source={require("../assets/icon/Settings_Information_Icons_name.png")}
                  ></Image>
                </View>
                <View style={styles.container_details}>
                  <Text style={styles.text}>Username</Text>
                  {editModeUsername ? (
                    <TextInput
                      style={styles.input}
                      value={username}
                      onChangeText={(text) => setUsername(text)}
                    />
                  ) : (
                    <TouchableOpacity onPress={() => setEditModeUsername(true)}>
                      <Text>{decodedToken.username}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.container_card}>
            <View style={styles.back_ground_card}>
              <View style={styles.container_icon_pls_details}>
                <View>
                  <Image
                    source={require("../assets/icon/Settings_Information_name_Icons.png")}
                  ></Image>
                </View>
                <View style={styles.container_details}>
                  <Text style={styles.text}>E-mail</Text>
                  {editModeEmail ? (
                    <TextInput
                      style={styles.input}
                      value={email}
                      onChangeText={(text) => setEmail(text)}
                    />
                  ) : (
                    <TouchableOpacity onPress={() => setEditModeEmail(true)}>
                      <Text>{decodedToken.email}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.container_card}>
            <View style={styles.back_ground_card}>
              <View style={styles.container_icon_pls_details}>
                <View>
                  <Image
                    source={require("../assets/icon/Settings_Information_pasword_Icons.png")}
                  ></Image>
                </View>
                <View style={styles.container_details}>
                  <Text style={styles.text}>Password</Text>
                  <TouchableOpacity>
                    <Text>changed 2 week a go</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.container_button}>
            <TouchableOpacity
              style={styles.back_ground_button}
              onPress={handle_save_change}
            >
              <Text>Save Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.navigation}>
        <Navigator />
      </View>
    </SafeAreaView>
  );
};

export default Setting;
const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
  },
  containerImage: {
    alignSelf: "center",
    width: 180,
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  plus_icon: {
    position: "absolute",
    top: 130,
    left: 155,
    resizeMode: "contain",
  },
  image_profile: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 90,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#F8F2EE",
    resizeMode: "cover",
  },
  titleSetting: {
    fontWeight: "bold",
    left: 12,
    top: 20,
    fontSize: 20,
  },
  navigation: {
    flex: 1,
    justifyContent: "flex-end",
  },
  container_icon_pls_details: {
    flexDirection: "row",
    gap: 10,
  },
  container_card: {
    marginLeft: 12,
    marginRight: 12,
  },
  back_ground_card: {
    backgroundColor: "#D2E6E4",
    padding: 15,
    borderRadius: 12,
  },
  mainContiner2: {
    marginTop: 40,
    flexDirection: "column",
    gap: 12,
  },
  back_ground_button: {
    backgroundColor: "#FFB606",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
  },
  container_button: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
  },
});
