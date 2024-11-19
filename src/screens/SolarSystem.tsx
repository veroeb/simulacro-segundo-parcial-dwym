import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import PlanetCard from "../components/PlanetCard";

interface Planet {
  id: number;
  name: string;
  image: string;
}

const SolarSystem = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch("http://192.168.1.11:8000/planets");
        const data = await response.json();
        setPlanets(data);
      } catch (error) {
        console.error("Error fetching planets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#fff" style={styles.loading} />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Galaxy View</Text>
      <FlatList
        data={planets}
        renderItem={({ item }) => <PlanetCard planet={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#fff",
  },
  listContainer: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});

export default SolarSystem;
