import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

interface Planet {
  image: string;
  name: string;
}

const PlanetCard = ({ planet }: { planet: Planet }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: planet.image }} style={styles.image} />
      <Text style={styles.name}>{planet.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    // backgroundColor: '#fff',
    // borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // elevation: 5,
    width: Dimensions.get("window").width / 2 - 30,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: "cover",
    // borderRadius: 70,
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default PlanetCard;
