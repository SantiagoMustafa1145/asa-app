import CardResume from "@/components/index/CardResume";
import useAuth from "@/store/user";
import { Redirect } from "expo-router";
import { View, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  const {
    user,
  }: {
    user: {
      nombre: string;
      dni: number;
      rol: "empleado" | "supervisor" | "admin";
    };
  } = useAuth();

  if (!user) {
    return <Redirect href={"/login"} />;
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "semibold",
          textAlign: "center",
        }}
      >
        Bienvenido {user.nombre.toLocaleUpperCase()}
      </Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 20,
    justifyContent: "center",
    padding: 16,
  },
});
