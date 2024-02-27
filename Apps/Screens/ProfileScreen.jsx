import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <View className=" flex-1 bg-black text-white ">
      <View className="bg-gray-900 w-full h-[120px] flex items-center justify-center rounded-br-3xl rounded-bl-3xl">
        <Image
          source={require("./../../assets/Images/placeholder.jpg")}
          className="w-[70px] h-[70px] rounded-full "
        />
      </View>
      <View className="flex flex-row items-center justify-between px-5 mt-8">
        <View className="bg-gray-500 w-[80px] h-[65px] rounded-xl flex items-center justify-center shadow ">
          <Text className="text-white">22</Text>
          <Text className="text-white">Played</Text>
        </View>
        <View className="bg-gray-500 w-[80px] h-[65px] rounded-xl flex items-center justify-center">
          <Text className="text-white">3</Text>
          <Text className="text-white">Wins</Text>
        </View>
        <View className="bg-gray-500 w-[80px] h-[65px] rounded-xl flex items-center justify-center">
          <Text className="text-white">3000</Text>
          <Text className="text-white">Coins</Text>
        </View>
      </View>
      <View className="px-5 mt-16">
        <View className="flex flex-row items-center justify-between border-b-[1px] border-gray-300 pb-2 mb-4">
          <View className="flex flex-row items-center gap-5">
            <FontAwesome name="user" size={24} color="white" />
            <Text className="text-white text-lg">Ayush Gupta</Text>
          </View>
        </View>
        <View className="flex flex-row items-center justify-between border-b-[1px] border-gray-300 pb-2 mb-4">
          <View className="flex flex-row items-center gap-5">
            <MaterialIcons name="email" size={24} color="white" />
            <Text className="text-white text-lg">ayush@gmail.com</Text>
          </View>
        </View>
        <View className="flex flex-row items-center justify-between border-b-[1px] border-gray-300 pb-2 mb-4">
          <View className="flex flex-row items-center gap-5">
            <Fontisto name="date" size={24} color="white" />
            <Text className="text-white text-lg">09/06/2001</Text>
          </View>
        </View>
        <View className="flex flex-row items-center justify-between border-b-[1px] border-gray-300 pb-2 mb-4">
          <View className="flex flex-row items-center gap-5">
            <Entypo name="phone" size={24} color="white" />
            <Text className="text-white text-lg">+91 1234567890</Text>
          </View>
          <MaterialIcons name="verified" size={24} color="white" />
        </View>
        <TouchableOpacity className="flex flex-row items-center justify-between  pb-2 mb-4">
          <View className="flex flex-row items-center gap-5">
            <Entypo name="log-out" size={24} color="white" />
            <Text className="text-white text-lg">Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
