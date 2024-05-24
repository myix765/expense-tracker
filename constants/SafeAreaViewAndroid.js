import { StyleSheet, Platform, StatusBar } from "react-native";

// const screenHeight = Dimensions.get('window').height; to replace fixed with relative measurement

export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 0
  }
});