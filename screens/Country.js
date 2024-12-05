import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Country({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
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
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text
          style={{
            fontWeight: "800",
            fontSize: 24,
            paddingVertical: 20,
          }}
        >
          {route.params.name.common}
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 55,
          paddingHorizontal: 4,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Image source={{ uri: route.params.flags.png }} style={styles.flag} />

          {route.params.flags.alt && (
            <Text style={styles.text}>{route.params.flags.alt}</Text>
          )}
          {route.params.coatOfArms.png && (
            <>
              <Text style={styles.h2}>Coat of Arms </Text>
              <Image
                source={{ uri: route.params.coatOfArms.png }}
                style={styles.logo}
              />
            </>
          )}

          {route.params.population && (
            <>
              <Text style={styles.h2}>
                Population :{" "}
                <Text style={styles.text}>{route.params.population} </Text>{" "}
              </Text>
            </>
          )}

          {route.params.capital && (
            <>
              <Text style={styles.h2}>
                Capital :{" "}
                <Text style={styles.text}>{route.params.capital} </Text>{" "}
              </Text>
            </>
          )}

          {route.params.region && (
            <>
              <Text style={styles.h2}>
                Region : <Text style={styles.text}>{route.params.region} </Text>{" "}
              </Text>
            </>
          )}

          {route.params.currencies &&
          Object.keys(route.params.currencies).length > 0 ? (
            <>
              <Text style={styles.h2}>
                Currency :
                {Object.entries(route.params.currencies).map(
                  ([code, currency], index) => (
                    <Text key={code} style={styles.text}>
                      {currency.name} ({currency.symbol})
                      {index <
                        Object.entries(route.params.currencies).length - 1 &&
                        ","}
                    </Text>
                  )
                )}
              </Text>
            </>
          ) : (
            <Text style={styles.text}>No currency information available.</Text>
          )}

          {route.params.languages &&
          Object.keys(route.params.languages).length > 0 ? (
            <>
              <Text style={styles.h2}>
                Languages :
                {Object.values(route.params.languages).map(
                  (language, index) => (
                    <Text key={index} style={styles.text}>
                      {language}
                      {index <
                        Object.values(route.params.languages).length - 1 && ","}
                    </Text>
                  )
                )}
              </Text>
            </>
          ) : (
            <Text style={styles.text}>No currency information available.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 20,
  },
  flag: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
    marginTop: 16,
    alignSelf: "center",
  },
  logo: {
    width: 150,
    height: 200,
    resizeMode: "contain",
    marginBottom: 16,
    marginTop: 16,
    alignSelf: "center",
  },
  h1: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 12,
  },
  h2: {
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 12,
    padding: 16,
  },
  text: {
    color: "#444",
    lineHeight: 24,
    fontSize: 18,
  },
});
