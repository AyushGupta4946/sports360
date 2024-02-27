import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function TournamentItem({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("tournament-detail", {
          item: item,
        })
      }
      style={styles.card}
    >
      <Image
        source={{ uri: item?.image }}
        className="w-full h-[130px] rounded-lg"
      />

      <View className="flex flex-row justify-between items-center mt-1">
        <Text>Entry Fee</Text>
        <Text className="bg-green-400 px-1 rounded-lg text-white">
          {item?.entryFee}
        </Text>
      </View>
      <View className="flex flex-row items-center mt-1">
        <EvilIcons name="location" size={18} color="black" />
        <Text>{item?.address}</Text>
      </View>

      <Text className="text-white bg-pink-400  rounded-xl mt-1 px-2 py-[2px]">
        {item?.category}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 5,
    borderColor: "gray",
    flex: 1,
    marginHorizontal: 3,
    marginVertical: 2,
    borderRadius: 10,
  },
});
