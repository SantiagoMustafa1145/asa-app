import CardResume from "@/components/index/CardResume";
import useAuth from "@/store/user";
import { Redirect, router } from "expo-router";
import { View, StyleSheet, Text, Button, ScrollView } from "react-native";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Redirect href={"/login"} />;
  }

  return (
    <ScrollView>
      <View className="gap-5 justify-center p-4 max-w-[500px] w-full mx-auto">
        <Text className="font-bold text-center text-xl">
          Bienvenido {user?.nombre.toLocaleUpperCase()}
        </Text>
        <Button
          title=" Cerrar Sesión "
          onPress={() => {
            logout();
            router.push("/login");
          }}
        />
        <CardResume
          href="/(tabs)/ventas"
          title="Ir a Ventas"
          description="En 'Ventas' debes registrar todas las ventas realizadas en la planta"
        />
        <CardResume
          href="/(tabs)/distribuidores"
          title="Ir a Distribuidores"
          description='En "Distribuidores" realizas el control de cada distribuidor,
          controlando todos los viajes realizados por cada uno'
        />
        <CardResume
          href="/(tabs)/asistencias"
          title="Ir a Asistencias"
          description="En asistencias se realiza el registro de horarios de cada empleado con
          su DNI"
        />
        <CardResume
          href="/(tabs)/resumen"
          title="Ir a Resumen"
          description='En "Resumen" vas a poder obtener archivos PDF con el resumen de la
          semana pasada, estos son generados de manera inmediata'
        />
      </View>
    </ScrollView>
  );
}
