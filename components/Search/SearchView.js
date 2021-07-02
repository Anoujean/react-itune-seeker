import React from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, Pressable,View,} from "react-native";
import { useEffect, useState } from "react/cjs/react.development";
import MusicItem from "../MusicItem";
import AddMusicView from "../Music/MusicView";
import LibraryView from "../Library/LibraryView";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

const StackNavigator = ({ onAdd, libraryList }) => {
  return(
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchView} initialParams={{ onAdd: onAdd }}/>
        <Stack.Screen name="AddMusic" component = {AddMusicView} />
        <Stack.Screen name="Library" component = {LibraryView} initialParams={{ libraryList: libraryList }} />
      </Stack.Navigator>
  )
}

const formatResponse = (item) => {
  return {
    title: item.trackName,
    artist: item.artistName,
    artwork: item.artworkUrl100,
    genre: item.primaryGenreName,
    year: item.releaseDate,
    id: item.trackId.toString(),
  };
};

const searchItunes = async (query) => {
  if (query == "") return;
  const formattedQuery = query.split(" ").join("+");
  const response = await fetch(
    `https://itunes.apple.com/search?term=${formattedQuery}`
  );
  const json = await response.json();
  return json.results
    .filter((item) => item.trackId && item.trackName)
    .map(formatResponse);
};

const SearchView = ({ route, navigation }) => {
  const onAdd = route.params.onAdd;
  const [input, setInput] = useState("");
  const [listResults, setListResults] = useState([]);

  const handleSubmit = () => {
    searchItunes(input).then((result) => {
      setListResults(result);
    });
  };

  useEffect(() => {
    const timeout = setTimeout(handleSubmit, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  console.log(onAdd);
  return (
    <View>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Search iTunes"
      />
      <FlatList
        data={listResults}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("AddMusic", {
                onAdd: onAdd,
                item: item,
              });
            }}
          >
            <MusicItem item={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default StackNavigator;
