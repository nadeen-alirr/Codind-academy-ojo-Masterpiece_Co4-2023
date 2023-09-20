import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { Platform } from "react-native";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import Svg, { Path, G, Defs, ClipPath } from "react-native-svg";
import * as Animatable from "react-native-animatable";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
const Ordercomfirmation = () => {
  const [expiryDate, setExpiryDate] = useState("");

  const handleExpiryDateChange = (text) => {
    // Basic validation: Check if the input is in the format MM/YY
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (regex.test(text) || text === "") {
      setExpiryDate(text);
    }
  };
  const route = useRoute();
  const { checkoutData } = route.params;
  checkoutdata = JSON.stringify(checkoutData);
  console.log("the checkout data", JSON.stringify(checkoutData));
  return (
    <SafeAreaView style={styles.Maincontainer}>
    <View style={styles.cotainer_section}>
    <View style={styles.container_Method}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollViewContent}
          showsHorizontalScrollIndicator={false}
          style={{ overflow: "hidden" }}
        >
          <Animatable.Image
            animation="bounceIn" // Example animation (you can use other animations)
            duration={1000} // Animation duration in milliseconds
            delay={500} // Delay before animation starts
            source={require("../assets/images/visa.png")}
            resizeMode="contain"
            style={styles.paymentMethodImage}
          />
          <Animatable.Image
            animation="bounceIn"
            duration={1000}
            delay={1000}
            source={require("../assets/images/mastercard.png")}
            resizeMode="contain"
            style={styles.paymentMethodImage}
          />
          <Animatable.Image
            animation="bounceIn"
            duration={1000}
            delay={1500}
            source={require("../assets/images/paypal.png")}
            resizeMode="contain"
            style={styles.paymentMethodImage}
          />
        </ScrollView>
      </View>
      <View style={styles.container_input_filed}>
        <View>
          <Text style={styles.lable_input}>Name on card</Text>
          <TextInput
            placeholder="Name on card"
            style={styles.input_info}
          ></TextInput>
        </View>
        <View>
          <Text style={styles.lable_input}>Card number</Text>
          <TextInput
            placeholder="1234 5678 9012 3456"
            style={styles.input_info}
          ></TextInput>
        </View>
        <View style={styles.containar_horizintal}>
          <View>
            <Text style={styles.lable_input}>Expiry date</Text>
            <TextInput
              placeholder="MM/YY"
              style={styles.input_infoH}
              keyboardType="numeric"
              maxLength={5}
              value={expiryDate}
              onChangeText={handleExpiryDateChange}
            ></TextInput>
          </View>
          <View>
            <Text style={styles.lable_input}>CVC/CVV</Text>
            <TextInput placeholder="CVC" style={styles.input_infoH}></TextInput>
          </View>
        </View>
        <View style={styles.container_total_price}>
        <Text style={styles.textprice}><Text style={styles.texttotal}>Total Price: </Text>{JSON.stringify(checkoutData.totalPrice)}$</Text>
      </View>
      </View>
    </View>
      <TouchableOpacity style={styles.containerbutton}>
        <Text style={styles.text_btn}>Pay Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Ordercomfirmation;

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    paddingTop: Platform.OS === "OS" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
    marginTop: 0,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between'
  },
  container_Method: {
    
  },
  scrollViewContent: {
    flexDirection: "row", // Arrange items horizontally
    alignItems: "center",
  },
  paymentMethodImage: {
    width: 300, // Set a suitable width
    height: 300, // Set a suitable height
    marginLeft: 10, // Add some margin between images
    marginRight: 10,
  },
  input_info: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
  },
  container_input_filed: {
    marginLeft: 10,
    marginRight: 10,
    borderTopColor: "gray",
    borderTopWidth: 1,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  containar_horizintal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input_infoH: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    width: 165,
  },
  textprice:{
    fontWeight:'bold',
    fontSize:15
  },
  containerbutton:{
    backgroundColor:"#000",
    padding:10,
    borderRadius:13,
    marginLeft: 10, 
    marginRight: 10,
    marginBottom:10,

  },
  text_btn:{
    color:"#fff",
    textAlign:'center',
    
  },
  texttotal:{
    color:'#000',
    fontWeight:"400"
  },
  container_total_price:{
    marginTop:15
  }
});
