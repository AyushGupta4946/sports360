import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import TournamentItem from "./TournamentItem";

export default function LiveTournament({ tournamentList }) {
  const navigation = useNavigation();

  return (
    <View className="px-3 pt-1 mb-2">
      <Text className="text-lg font-bold pb-1">Live Tournaments</Text>
      <FlatList
        data={tournamentList}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <TournamentItem item={item} />}
      />
    </View>
  );
}
