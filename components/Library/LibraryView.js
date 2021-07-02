import React from "react";
import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import MusicItem from "../MusicItem";

const LibraryView = ({ onDelete, libraryList }) => {
  return (
    <View>
      <FlatList
        data={libraryList}
        renderItem={({ item }) => 
        <View>
          <MusicItem item={item} />
          <Pressable name="{item.name}" style={styles.button} onPress={() => {
              onDelete(item.name);
            }}>
            <Text>Remove from library</Text>
          </Pressable>
        </View>
        }
        keyExtractor={(item) => item.id}
      />
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

export default LibraryView;