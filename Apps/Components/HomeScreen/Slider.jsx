import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "../../../firebaseConfig";

export default function Slider() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    getSliders();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= sliderList.length) {
        nextIndex = 0; // Restart from the beginning
      }
      scrollToIndex(nextIndex);
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const scrollToIndex = (index) => {
    setCurrentIndex(index);
    if (scrollViewRef.current) {
      const offset = index * 330; // Assuming width of each image is 330
      scrollViewRef.current.scrollTo({ x: offset, animated: true });
    }
  };

  const getSliders = async () => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, "Slider"));
    querySnapshot.forEach((doc) => {
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const index = Math.round(offsetX / 330); // Assuming width of each image is 330
          setCurrentIndex(index);
        }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {sliderList.map((item, index) => (
          <Image
            key={index}
            source={{ uri: item?.image }}
            style={{
              width: 330,
              height: 150,
              marginRight: 5,
              borderRadius: 8,
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

// slider code
// import React, { useEffect, useRef, useState } from "react";
// import { View, Image, FlatList } from "react-native";
// import { collection, getDocs, getFirestore } from "firebase/firestore";
// import { app } from "../../../firebaseConfig";

// export default function Slider() {
//   const db = getFirestore(app);
//   const [sliderList, setSliderList] = useState([]);
//   const flatListRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       moveSlider();
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [currentIndex]);

//   useEffect(() => {
//     getSliders();
//   }, []);

//   const getSliders = async () => {
//     setSliderList([]);
//     const querySnapshot = await getDocs(collection(db, "Slider"));
//     const data = querySnapshot.docs.map((doc) => doc.data());
//     setSliderList(data);
//   };

//   const moveSlider = () => {
//     const newIndex =
//       currentIndex === sliderList.length - 1 ? 0 : currentIndex + 1;
//     setCurrentIndex(newIndex);
//     flatListRef.current.scrollToIndex({ animated: true, index: newIndex });
//   };

//   return (
//     <View style={{ paddingHorizontal: 3, paddingTop: 3, paddingBottom: 1 }}>
//       <FlatList
//         ref={flatListRef}
//         data={sliderList}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <Image
//             source={{ uri: item?.image }}
//             style={{ width: 330, height: 150, marginRight: 2, borderRadius: 8 }}
//           />
//         )}
//         initialScrollIndex={0}
//         getItemLayout={(data, index) => ({
//           length: 330, // width of your item
//           offset: 330 * index,
//           index,
//         })}
//         removeClippedSubviews={false} // This is important to prevent glitches while scrolling
//       />
//     </View>
//   );
// }
