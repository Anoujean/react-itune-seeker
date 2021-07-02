import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import LibraryView from "./components/Library/LibraryView";
import SearchView from "./components/Search/SearchView";
import AddMusicView from "./components/Music/MusicView";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react/cjs/react.development";
import { createStackNavigator } from "@react-navigation/stack";

const Tabs = createBottomTabNavigator();

const App = () => {

  const [libraryList, setLibraryList] = useState([]);

  const addItem = (item) => {
    setLibraryList((prev) => [...prev, item]);
  };

  const removeItem = (item) => {
    const list = [...libraryList];
    let remove = list.indexOf(item);
    list.splice(remove, 1);
    setLibraryList(list);
  };

  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case "Library":
                iconName = focused ? "library" : "library-outline";
                break;
              case "Search":
                iconName = focused ? "musical-notes" : "musical-notes-outline";
                break;
              default:
                iconName = "ban";
                break;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{ inactiveTintColor: "tomato", activeTintColor: "white", activeBackgroundColor:"tomato" }}
      >
        <Tabs.Screen name="Search">
          {(props) => <SearchView {...props} onAdd={addItem} />}
        </Tabs.Screen>
        <Tabs.Screen name="Library">
          {(props)=><LibraryView {...props} onDelete={removeItem} libraryList={libraryList} />}
        </Tabs.Screen>
      </Tabs.Navigator>
    </NavigationContainer>
  );
};



export default App;
