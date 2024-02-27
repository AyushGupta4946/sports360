import { View, Text, Image } from "react-native";
import React from "react";

export default function Header() {
  return (
    <View className="bg-blue-500 p-5 flex flex-row items-center gap-3 ">
      <Image
        source={require("./../../../assets/Images/placeholder.jpg")}
        className="w-[60px] h-[60px] rounded-full "
      />
      <View>
        <Text className="text-white text-sm">Welcome</Text>
        <Text className="text-white text-xl">Ayush Gupta</Text>
      </View>
    </View>
  );
}
