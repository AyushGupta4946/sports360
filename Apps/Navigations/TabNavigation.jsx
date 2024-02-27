import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ExploreTournamentScreen from "./../Screens/ExploreTournamentScreen";
import AddTournamentScreen from "./../Screens/AddTournamentScreen";
import ProfileScreen from "./../Screens/ProfileScreen";
import { FontAwesome } from "@expo/vector-icons";
import HomeScreenStackNav from "./HomeScreenStackNav";
import FixturesScreen from "../Screens/FixturesScreen";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="home-nav"
        component={HomeScreenStackNav}
        options={{
          tabBarLabel: ({ color }) => <Text>Home</Text>,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="explore"
        component={ExploreTournamentScreen}
        options={{
          tabBarLabel: ({ color }) => <Text>Explore</Text>,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="add-tournament"
        component={AddTournamentScreen}
        options={{
          tabBarLabel: ({ color }) => <Text>Create</Text>,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="fixtures"
        component={FixturesScreen}
        options={{
          tabBarLabel: ({ color }) => <Text>Fixtures</Text>,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="bars" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ color }) => <Text>Profile</Text>,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
