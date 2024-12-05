import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

export default function SearchBar({ value, onChangeText }) {
  return (
    <View
      style={{
        width: "100%",
        height: 100,

        paddingTop: 40,
        paddingVertical: 30,
        paddingHorizontal: 10,
        marginBottom: 16,
      }}
    >
      <TextInput
        placeholder="Enter a country to search ..."
        style={styles.searchbar}
        value={value}
        onChangeText={onChangeText} // Pass the handler from the parent
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchbar: {
    width: "100%",
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    marginBottom: 16,
    backgroundColor: "#fff",
    color: "black",
  },
});
