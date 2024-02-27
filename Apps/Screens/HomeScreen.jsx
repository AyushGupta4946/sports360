import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/HomeScreen/Header";
import Category from "../Components/HomeScreen/Category";
import Slider from "../Components/HomeScreen/Slider";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import LiveTournament from "../Components/HomeScreen/LiveTournament";

export default function HomeScreen() {
  const db = getFirestore(app);
  const [tournamentList, setTournamentList] = useState([]);

  useEffect(() => {
    getLiveTournamentList();
  }, []);

  const getLiveTournamentList = async () => {
    setTournamentList([]);
    const querySnapshot = await getDocs(collection(db, "TournamentPost"));
    querySnapshot.forEach((doc) => {
      setTournamentList((tournamentList) => [...tournamentList, doc.data()]);
    });
  };

  return (
    <ScrollView className="flex-1">
      <Header />
      <Slider />
      <Category />
      <LiveTournament tournamentList={tournamentList} />
    </ScrollView>
  );
}
