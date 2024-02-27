import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import TournamentList from "../Screens/TournamentList";
import TournamentDetails from "../Screens/TournamentDetails";
import JoinTournamentScreen from "../Screens/JoinTournamentScreen";

const Stack = createStackNavigator();

export default function HomeScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="tournament-list"
        component={TournamentList}
        options={({ route }) => ({
          title: route.params.Category,
          headerStyle: {
            backgroundColor: "#007BFF",
          },
          headerTintColor: "white",
        })}
      />
      <Stack.Screen
        name="tournament-detail"
        component={TournamentDetails}
        options={{
          headerStyle: { backgroundColor: "#007BFF" },
          headerTitle: "Details",
        }}
      />
      <Stack.Screen
        name="join-tournament"
        component={JoinTournamentScreen}
        options={{
          headerStyle: { backgroundColor: "#007BFF" },
          headerTitle: "Join Tournament",
        }}
      />
    </Stack.Navigator>
  );
}
