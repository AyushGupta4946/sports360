import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";

export default function JoinTournamentScreen() {
  return (
    <View>
      <Text className="text-center text-xl text-gray-600 underline">
        Players Details
      </Text>
      <View className="px-5 my-2">
        <View className="flex flex-row items-center gap-3 justify-between mb-2">
          <Text>Name : </Text>
          <Text className="border-[1px] border-black w-[250px] px-2 py-1 rounded-xl">
            Ayush Gupta
          </Text>
        </View>
        <View className="flex flex-row items-center gap-3 justify-between mb-2">
          <Text>Phone : </Text>
          <Text className="border-[1px] border-black w-[250px] px-2 py-1 rounded-xl">
            +91 1234567890
          </Text>
        </View>
        <View className="flex flex-row items-center gap-3 justify-between mb-2">
          <Text>Email : </Text>
          <Text className="border-[1px] border-black w-[250px] px-2 py-1 rounded-xl">
            ayush@gmail.com
          </Text>
        </View>
        <View className="flex flex-row items-center gap-3 justify-between mb-2">
          <Text>Adhaar : </Text>
          <Text className="border-[1px] border-black w-[250px] px-2 py-1 rounded-xl">
            1234 4567 7890
          </Text>
        </View>
        <TouchableOpacity className="bg-blue-500 px-7 py-2 rounded-full mt-2">
          <Text className="text-white text-lg text-center">Join Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
