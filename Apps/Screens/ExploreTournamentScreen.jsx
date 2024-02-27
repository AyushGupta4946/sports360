import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import LiveTournament from "../Components/HomeScreen/LiveTournament";
import { AntDesign } from "@expo/vector-icons";

export default function ExploreTournamentScreen() {
  const db = getFirestore(app);
  const [tournamentList, setTournamentList] = useState([]);
  const [filteredTournamentList, setFilteredTournamentList] = useState([]);

  useEffect(() => {
    getAllTournaments();
  }, []);

  const getAllTournaments = async () => {
    const tournamentData = [];
    const q = query(collection(db, "TournamentPost"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tournamentData.push(doc.data());
    });
    // Initially, display all tournaments
    setTournamentList(tournamentData);
    setFilteredTournamentList(tournamentData);
  };

  const handleSearch = (text) => {
    const filteredTournaments = tournamentList.filter((tournament) =>
      Object.values(tournament).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(text.toLowerCase())
      )
    );
    setFilteredTournamentList(filteredTournaments);
  };

  return (
    <View style={{ flex: 1, paddingVertical: 10, paddingBottom: 80 }}>
      <View className="border-[1.5px] border-gray-600 px-2 mx-4 mt-2 flex flex-row items-center justify-between py-1 rounded-3xl ">
        <TextInput
          placeholder="Search by category"
          onChangeText={handleSearch}
          className="text-[16px]"
        />
        <Text className="bg-pink-400 p-[6px] rounded-full">
          <AntDesign name="search1" size={16} color="white" />
        </Text>
      </View>
      <LiveTournament tournamentList={filteredTournamentList} />
    </View>
  );
}
