import React from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable} from "react-native";
import MusicItem from "../MusicItem";

const AddMusicView = ({ route, navigation }) => {
    const { onAdd, item } = route.params;
  
    return (
      <View>
        <MusicItem item={item} />
        <Pressable style={styles.button}onPress={() => {
            onAdd(item);
            navigation.pop();
          }}>
          <Text>Add to library</Text>
        </Pressable>
      </View>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10    
    },
});

export default AddMusicView;