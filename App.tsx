import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SolarSystem from "./src/screens/SolarSystem";
import PlanetDetails from "./src/screens/PlanetDetails";
import AddPlanet from "./src/screens/AddPlanet";

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SolarSystem"
        screenOptions={{
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="SolarSystem"
          component={SolarSystem}
          options={{ title: "Solar System" }}
        />
        <Stack.Screen
          name="PlanetDetails"
          component={PlanetDetails}
          options={{ title: "Planet Details" }}
        />
        <Stack.Screen
          name="AddPlanet"
          component={AddPlanet}
          options={{ title: "Add Planet" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
