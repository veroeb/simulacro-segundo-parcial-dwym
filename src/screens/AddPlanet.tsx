import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const AddPlanet = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [moons, setMoons] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = async () => {
    const defaultImage =
      "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg";

    try {
      const response = await fetch("http://192.168.1.21:8000/planets");
      const planets = await response.json();
      const maxId = Math.max(
        ...planets.map((planet: { id: number }) => planet.id),
        0
      );

      const newPlanet = {
        id: maxId + 1,
        name,
        description,
        moons: parseInt(moons) || 0,
        moon_names: moons.split(",").map((moon) => moon.trim()),
        image: image || defaultImage,
      };

      await fetch("http://192.168.1.21:8000/planets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPlanet),
      });

      navigation.goBack();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Moons (comma separated)"
        value={moons}
        onChangeText={setMoons}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL (optional)"
        value={image}
        onChangeText={setImage}
      />
      <Button title="Add Planet" onPress={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#000",
    flex: 1,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AddPlanet;
