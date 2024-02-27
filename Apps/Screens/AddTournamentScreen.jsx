import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { app } from "../../firebaseConfig";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import DateTimePicker from "@react-native-community/datetimepicker"; // Import DateTimePicker

export default function AddTournamentScreen() {
  const db = getFirestore(app);
  const storage = getStorage();
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null); // State for storing selected start date
  const [showDatePicker, setShowDatePicker] = useState(false); // State for controlling date picker visibility

  useEffect(() => {
    getCategoryList();
  }, []);

  // Used to get category list
  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));

    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  // function for picking the image (expo image picker)
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = async (value) => {
    console.log(value);
    setLoading(true);
    // converting image into blob file
    const resp = await fetch(image);
    const blob = await resp.blob();
    const storageRef = ref(storage, "TournamentPost/" + Date.now() + ".jpg");

    uploadBytes(storageRef, blob)
      .then((snapshot) => {
        console.log("blob file uploaded");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          value.image = downloadUrl;

          const docRef = await addDoc(collection(db, "TournamentPost"), value);
          if (docRef.id) {
            setLoading(false);
            Alert.alert("Success", "Post Added Succesfully");
          }
        });
      });
  };

  return (
    <KeyboardAvoidingView className=" p-6">
      <ScrollView>
        <Formik
          initialValues={{
            tournamentName: "",
            category: "",
            desc: "",
            numberOfTeams: "",
            address: "",
            entryFee: "",
            organizerName: "",
            teamType: "",
            organizerContactDetail: "",
          }}
          onSubmit={(value) => onSubmitMethod(value)}
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            setFieldValue,
          }) => (
            <View>
              <TouchableOpacity onPress={pickImage}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: 130,
                      height: 130,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: "black",
                    }}
                  />
                ) : (
                  <Image
                    source={require("./../../assets/Images/placeholder.jpg")}
                    style={{
                      width: 130,
                      height: 130,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: "black",
                    }}
                  />
                )}
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Tournament Name"
                value={values?.tournamentName}
                onChangeText={handleChange("tournamentName")}
              />
              {/* Category Dropdown using Picker  */}
              {categoryList.length > 0 && (
                <View style={{ borderWidth: 1 }}>
                  <Picker
                    selectedValue={values?.category}
                    onValueChange={(itemValue) =>
                      setFieldValue("category", itemValue)
                    }
                  >
                    {categoryList.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={item?.name}
                        value={item.name}
                      />
                    ))}
                  </Picker>
                </View>
              )}

              <TextInput
                style={styles.input}
                placeholder="Description"
                value={values?.desc}
                numberOfLines={3}
                onChangeText={handleChange("desc")}
              />
              <TextInput
                style={styles.input}
                placeholder="Entry Fee"
                value={values?.entryFee}
                keyboardType="numeric"
                onChangeText={handleChange("entryFee")}
              />
              <TextInput
                style={styles.input}
                placeholder="Number of Teams/Players"
                value={values?.numberOfTeams}
                keyboardType="numeric"
                onChangeText={handleChange("numberOfTeams")}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={values?.address}
                onChangeText={handleChange("address")}
              />
              <TextInput
                style={styles.input}
                placeholder="Team Type"
                value={values?.teamType}
                onChangeText={handleChange("teamType")}
              />
              {/* Date Picker */}
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)} // Show date picker on press
                style={styles.input}
              >
                <Text>
                  Select Start Date: {startDate ? startDate.toDateString() : ""}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={startDate || new Date()} // Use selected date if available, otherwise use today's date
                  mode="date"
                  display="spinner"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || new Date();
                    setShowDatePicker(false); // Hide date picker
                    setStartDate(currentDate); // Set selected date
                    setFieldValue("startDate", currentDate); // Set form field value
                  }}
                />
              )}
              <TextInput
                style={styles.input}
                placeholder="Organizer Name"
                value={values?.organizerName}
                onChangeText={handleChange("organizerName")}
              />
              <TextInput
                style={styles.input}
                placeholder="Organizer Contact Number"
                value={values?.organizerContactDetail}
                keyboardType="numeric"
                onChangeText={handleChange("organizerContactDetail")}
              />
              <TouchableOpacity
                onPress={handleSubmit}
                style={{ backgroundColor: loading ? "#ccc" : "#007BFF" }}
                disabled={loading}
                className="bg-blue-500 rounded-full py-2 mt-2"
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-center text-[20px] text-white">
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
