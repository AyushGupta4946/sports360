import {
  View,
  Text,
  Image,
  Button,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

export default function TournamentDetails() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [details, setDetails] = useState(null);
  useEffect(() => {
    if (params && params.item) {
      setDetails(params.item);
    }
  }, [params]);
  // Function to handle sending WhatsApp message
  const sendWhatsAppMessage = () => {
    if (details && details.organizerContactDetail) {
      const phoneNumber = details.organizerContactDetail;
      const message = "Hello! I am interested in your tournament.";
      const whatsappLink = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;

      Linking.openURL(whatsappLink).catch((err) =>
        console.error("An error occurred", err)
      );
    } else {
      console.warn("Organizer's contact details not found.");
    }
  };

  return (
    <View>
      {details && (
        <>
          <Image source={{ uri: details.image }} className="w-full h-[200px]" />
          <View className="px-4 py-3 ">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-bold ">
                {details.tournamentName}
              </Text>
              <Text className="bg-pink-200 text-pink-500 px-2 py-1 rounded-full">
                {details.category}
              </Text>
            </View>
            <View className="my-1">
              <Text className="text-gray-600 "> {details.desc}</Text>
              <Text>Number of Teams : {details.numberOfTeams}</Text>
            </View>

            <View className="flex flex-row items-center g-4  my-1 justify-between">
              <View className="flex flex-row items-center gap-1">
                <EvilIcons name="location" size={24} color="black" />
                <Text className="font-bold">{details.address}</Text>
              </View>
              <View className="flex flex-row items-center gap-2">
                <Fontisto name="date" size={20} color="black" />
                {/* <Text>{details.startDate}</Text> */}
              </View>
            </View>
            <Text className="py-1">
              Team type :
              <Text className="font-bold text-gray-600">
                {details.teamType}
              </Text>
            </Text>
            <View>
              <View className="flex flex-row gap-1 items-center">
                <Text className="font-bold text-base">Entry Fee : </Text>
                <Text className="bg-pink-200 text-pink-500 px-2 rounded-full ">
                  ₹ {details.entryFee}
                </Text>
              </View>
            </View>
            <View className="w-full border-b py-2 flex flex-row items-center justify-center">
              <TouchableOpacity
                onPress={() => navigation.navigate("join-tournament")}
                className="bg-blue-500 px-7 py-2 rounded-full"
              >
                <Text className="text-white text-lg">Join Now</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* whatsapp button to send message organixer  */}
          <View className="bg-green-500 m-auto flex flex-row items-center justify-center px-5 py-4 rounded-full ">
            <FontAwesome name="whatsapp" size={35} color="white" />
            <TouchableOpacity onPress={sendWhatsAppMessage}>
              <Text className="ml-3 text-white text-lg">
                Send Message to Organizer
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
