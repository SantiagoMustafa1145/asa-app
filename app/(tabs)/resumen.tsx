import ResumeCard from "@/components/resume/card";
import checkSession from "@/utils/checkSession";
import { Redirect } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 30,
  },
  cardContainer: {
    gap: 32,
  },
});

export default function Resumen() {
  if (checkSession()) {
    return <Redirect href={"/login"} />;
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            justifyContent: "center",
            alignItems: "center",
            fontSize: 28,
            textAlign: "center",
          }}
        >
          Generar informes
        </Text>

        <View style={styles.cardContainer}>
          <ResumeCard
            title="Generar informe de Ventas"
            text="Generar un informe en formato PDF, en el cual se reflejaran dos
              partes, un resumen general, en donde se podrá ver los números
              finales (total de ventas realizadas, monto total de la semana,
              monto total por día) y otra parte detallada en donde se podrá ver
              a detalle, cada venta realizada, con su cantidad, monto, tipo de
              venta (revendedor o consumidor), la hora y fecha de la venta"
            disable
          />
          <ResumeCard
            title="Generar informe de Distribuidores"
            text="Generar un informe en formato PDF, en este se mostrara a detalle todos los viajes realizados por cada distribuidor, se mostraran los viajes, la cantidad de bidones con la que salieron, los vacíos con los que volvieron, los llenos y los que hayan vendido en cada viaje, también se muestra el horario y fecha de cada viaje"
            disable
          />
          <ResumeCard
            title="Generar informe de Asistencias"
            text="Generar un informe en formato PDF, en este se mostrara a detalle las asistencias de los empleados, se mostrara la hora de entrada, la hora de salida, el tiempo que duro en el trabajo, el día y la fecha de la asistencia"
            disable
          />
          <ResumeCard
            title="Generar informe general"
            text="Generar un informe en formato PDF, en este se mostrara a detalle las ventas realizadas, los viajes realizados por los distribuidores y las asistencias de los empleados"
            url="/"
          />
        </View>
      </View>
    </ScrollView>
  );
}
