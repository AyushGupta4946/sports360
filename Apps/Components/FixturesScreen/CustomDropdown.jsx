import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.button}>
        <Text>{selectedOption ? selectedOption.label : "Select"}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => handleSelectOption(option)}
              style={styles.option}
            >
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 200,
    flexDirection: "row",
  },
  button: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  dropdown: {
    position: "absolute",
    top: 40,
    left: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 1,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default CustomDropdown;
