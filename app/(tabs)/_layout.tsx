import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ventas"
        options={{
          title: "Registro de Ventas",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="shopping-cart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="distribuidores"
        options={{
          title: "Registro de Distribuidores",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="car" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="asistencias"
        options={{
          title: "Registro de Asistencias",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="resumen"
        options={{
          title: "Generar informes",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="area-chart" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
