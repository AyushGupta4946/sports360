import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function Category() {
  const db = getFirestore(app);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const navigation = useNavigation();
  return (
    <View className="px-3 ">
      <Text className="text-lg font-bold pb-1">Categories</Text>
      <FlatList
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("tournament-list", {
                Category: item.name,
              })
            }
            className="bg-gray-300 mr-2 p-2 w-[90px] flex items-center justify-between rounded-lg"
          >
            <Image
              source={{ uri: item?.image }}
              className="w-[50px] h-[50px] rounded-full"
            />
            <Text className="text-center text-[10px] mt-1">{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
