import React, { useState, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import PlanetCard from "../components/PlanetCard";
import { useFocusEffect, useRoute, RouteProp } from "@react-navigation/native";

interface Planet {
  id: number;
  name: string;
  image: string;
  description: string;
  moons: number;
  moon_names: string[];
}

type SolarSystemRouteParams = {
  SolarSystem: {
    refresh?: boolean;
  };
};

const SolarSystem: React.FC<{ navigation: any }> = ({ navigation }) => {
  const route = useRoute<RouteProp<SolarSystemRouteParams, "SolarSystem">>();
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlanets = () => {
    setIsLoading(true);
    fetch("http://192.168.1.21:8000/planets")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch planets.");
        }
        return res.json();
      })
      .then((data) => {
        setPlanets(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load planets. Please try again later.");
        setIsLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      if (route.params?.refresh) {
        fetchPlanets();
        navigation.setParams({ refresh: null });
      } else {
        fetchPlanets();
      }
    }, [route.params?.refresh])
  );

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading planets...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loading}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={planets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlanetCard
            planet={item}
            onPress={() =>
              navigation.navigate("PlanetDetails", {
                id: item.id,
                planet: item,
              })
            }
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddPlanet")}
        >
          <Text style={styles.buttonText}>Add Planet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    alignItems: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SolarSystem;
