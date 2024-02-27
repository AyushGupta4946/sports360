import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebaseConfig";
import LiveTournament from "../Components/HomeScreen/LiveTournament";

export default function TournamentList() {
  const { params } = useRoute();
  const db = getFirestore(app);
  const [tournamentList, setTournamentList] = useState([]);

  useEffect(() => {
    params && getTournamentByCategory();
  }, [params]);

  const getTournamentByCategory = async () => {
    setTournamentList([]);
    const q = query(
      collection(db, "TournamentPost"),
      where("category", "==", params.Category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setTournamentList((tournamentList) => [...tournamentList, doc.data()]);
    });
  };

  return (
    <View>
      {tournamentList?.length > 0 ? (
        <LiveTournament tournamentList={tournamentList} />
      ) : (
        <Text>No Tournaments Available. </Text>
      )}
    </View>
  );
}
