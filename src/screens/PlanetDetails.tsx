import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";

const PlanetDetails = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { id, planet } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(planet.name);
  const [newDescription, setNewDescription] = useState(planet.description);

  const handleSave = () => {
    fetch(`http://192.168.1.21:8000/planets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: planet.id,
        name: newName,
        description: newDescription,
        moons: planet.moons,
        moon_names: planet.moon_names,
        image: planet.image,
      }),
    })
      .then((response) => {
        console.log("Response status:", response.status);
        console.log("Response body:", response);
        if (!response.ok) {
          throw new Error(
            `Failed to update planet. Status: ${response.status}`
          );
        }
        navigation.navigate("SolarSystem", { refresh: true });
      })
      .catch((err) => console.error("Error updating planet:", err));
  };

  const handleDelete = () => {
    fetch(`http://192.168.1.21:8000/planets/${Number(id)}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log("Response status:", response.status);
        console.log("Response body:", response);
        if (!response.ok) {
          throw new Error(
            `Failed to delete planet. Status: ${response.status}`
          );
        }
        navigation.navigate("SolarSystem", { refresh: true });
      })
      .catch((err) => console.error("Error deleting planet:", err));
  };

  return (
    <ScrollView style={styles.container}>
      {isEditing ? (
        <View>
          <TextInput
            style={styles.input}
            value={newName}
            onChangeText={setNewName}
          />
          <TextInput
            style={styles.input}
            value={newDescription}
            onChangeText={setNewDescription}
            multiline
          />
          <Button title="Save Changes" onPress={handleSave} />
        </View>
      ) : (
        <View>
          <Text style={styles.title}>{planet.name}</Text>
          <Text style={styles.description}>
            {planet.description || "No description available."}
          </Text>
          <Text style={styles.moonsTitle}>Moons:</Text>
          {planet.moon_names && planet.moon_names.length > 0 ? (
            planet.moon_names.map((moon: string, index: number) => (
              <Text key={index} style={styles.moon}>
                {moon}
              </Text>
            ))
          ) : (
            <Text style={styles.noMoons}>No moons available</Text>
          )}
          <Button title="Edit" onPress={() => setIsEditing(true)} />
          <Button title="Delete" onPress={handleDelete} color="red" />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#000",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  description: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  moonsTitle: {
    fontSize: 20,
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },
  moon: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 3,
  },
  noMoons: {
    color: "#aaa",
    fontSize: 16,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default PlanetDetails;
