import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

export default function Countries({ navigation }) {
  const [countries, setCountries] = useState([]);
  const [text, setText] = useState("");
  const [results, setResults] = useState();

  useEffect(() => {
    async function getCountries() {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,region,coatOfArms,capital,population,currencies,languages"
        );
        const data = await response.json();
        setCountries(data);
        setResults(data);
      } catch (error) {
        console.error(error);
      }
    }
    getCountries();
  }, []);

  function handleSearch(text) {
    setText(text);
    if (text.trim() === "") {
      setResults(null);
    } else {
      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(text.toLowerCase())
      );
      if (filteredCountries.length === 0) {
        Alert.alert("Country not found", "No matching country was found.");
        setText("");
        setResults(countries);
      } else {
        setResults(filteredCountries);
      }
    }
  }

  return (
    <View>
      <SafeAreaView style={Styles.container}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            zIndex: 10,
            paddingTop: 20,
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
          }}
        >
          <Image source={require("../assets/icon.png")} />

          <Text
            style={{
              fontWeight: "800",
              fontSize: 24,
              paddingVertical: 20,
            }}
          >
            Country App
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 70,
            paddingHorizontal: 10,
          }}
          showsHorizontalScrollIndicator={false}
        >
          <SearchBar value={text} onChangeText={handleSearch} />

          {text ? (
            <Text style={{ paddingLeft: 10, fontSize: 18 }}>
              Search results ({results ? results.length : countries.length})
            </Text>
          ) : (
            <Text style={{ paddingLeft: 10, fontSize: 18 }}>
              All countries ({results ? results.length : countries.length})
            </Text>
          )}
          <View style={Styles.grid}>
            {(results || countries).map((country) => (
              <Pressable
                onPress={() => navigation.navigate("Country", country)}
                key={country.name.common}
                style={Styles.gridItem}
              >
                <Image
                  source={{ uri: country.flags.png }}
                  style={Styles.flag}
                ></Image>
                <Text style={Styles.name}>{country.name.common}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    minHeight: "100%",
  },
  grid: {
    gap: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    padding: 12,
    width: "46%",
  },
  flag: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    marginBottom: 16,
  },
  name: {
    fontWeight: "800",
    fontSize: 21,
    marginBottom: 12,
  },
  searchbar: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#999",
    marginBottom: 16,
  },
});
