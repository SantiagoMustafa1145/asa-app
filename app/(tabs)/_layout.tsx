import useAuth from "@/store/user";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { user } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
      }}
    >
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
          title: "Ventas",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="shopping-cart" color={color} />
          ),
        }}
      />
      {user?.rol !== "empleado" && (
        <Tabs.Screen
          name="distribuidores"
          options={{
            title: "Distribuidores",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="car" color={color} />
            ),
          }}
        />
      )}
      <Tabs.Screen
        name="asistencias"
        options={{
          title: "Asistencias",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
        }}
      />
      {user?.rol !== "empleado" && (
        <Tabs.Screen
          name="resumen"
          options={{
            title: "Informes",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="area-chart" color={color} />
            ),
          }}
        />
      )}
    </Tabs>
  );
}
