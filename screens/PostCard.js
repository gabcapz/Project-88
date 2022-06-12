import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class PostCard extends Component {
    constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      });
  };

  render() {
      return (
                <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate("PostScreen", {
              post: this.props.post
            })
          }
        >
        <SafeAreaView style={styles.droidSafeArea} />
         <View
            style={
              this.state.light_theme
                ? styles.cardContainerLight
                : styles.cardContainer
            }
          >
        <View
            style={
              this.state.light_theme
                ? styles.fullCardContainerLight
                : styles.fullCardContainer
            }
          >
          <View
            style={
              this.state.light_theme
                ? styles.fullCardContainerLight
                : styles.fullCardContainer
            }
          >
           <View style={styles.authorContainer}>
             <Image
               source={require("../assets/profile_img.png")}
               style={styles.profileImage}
              ></Image>
            </View>
            <View
            style={
              this.state.light_theme
                ? styles.authorNameContainerLight
                : styles.authorNameContainer
            }
          >
              <Text
                style={
                  this.state.light_theme
                    ? styles.authorNameTextLight
                    : styles.authorNameText
                }>
                {this.props.post.author}
              </Text>
            </View>
           </View>          
           <Image source={require("../assets/post.jpeg")} style={styles.postImage} />
            <View style={styles.captionContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.captionTextLight
                    : styles.captionText
                }>
                {this.props.post.caption}
              </Text>
            </View>
            <View style={styles.actionContainer}>
              <View style={styles.likeButton}>
                <Ionicons
                  name={"heart"}
                  size={RFValue(30)}
                  color={this.state.light_theme ? "black" : "white"}
                />
                <Text
                  style={
                    this.state.light_theme
                      ? styles.likeTextLight
                      : styles.likeText
                  }
                >
                12k
                </Text>
              </View>
            </View>
          </View>
        </View>
         </TouchableOpacity>
      );
    }
  }
  
const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  container: {
    flex: 1
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  cardContainerLight: {
    margin: RFValue(13),

    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: RFValue(0.45),
    shadowRadius: RFValue(6),
    elevation: RFValue(2)
  },
  postImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  captionContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  authorNameContainer : {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  authorNameContainerLight : {
    margin: RFValue(13),
    backgroundColor: "white",
    borderRadius: RFValue(20)
  },
  authorContainer: {
    fontSize: RFValue(25),
    color: "white"
  },
  authorNameText: {
    fontSize: RFValue(18), 
    color: "white",
    textAlign: "center"
  },
  authorNameTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "black",
    textAlign: "center"
  },
  captionText: {
    fontSize: 18,
    color: "white",
    paddingTop: RFValue(10),
    textAlign:"center",
    fontWeight: "bold"
  },
  captionTextLight : {
    fontSize: 18,
    color: "black",
    paddingTop: RFValue(10),
    textAlign:"center",
    fontWeight: "bold"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  likeTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  profileImage: {
    resizeMode: "contain",
    width: "90%",
    alignSelf: "center",
    height: RFValue(190)
  },
  fullCardContainer:{
    margin: RFValue(14),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(25)
  },
  fullCardContainerLight : {
    margin: RFValue(14),
    backgroundColor: "white",
    borderRadius: RFValue(25)
  }
});