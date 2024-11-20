import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

interface Planet {
  id: number;
  name: string;
  image: string;
}

const PlanetCard = ({
  planet,
  onPress,
}: {
  planet: Planet;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: planet.image }} style={styles.image} />
      <Text style={styles.name}>{planet.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    width: Dimensions.get("window").width / 2 - 30,
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: "cover",
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default PlanetCard;
