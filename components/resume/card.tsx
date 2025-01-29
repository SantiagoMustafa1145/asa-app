import generatePdf from "@/utils/generatePDF";
import { Link, router } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    gap: 16,
  },
  cardTitle: {
    fontSize: 20,
    textAlign: "left",
    fontWeight: "normal",
    color: "#000",
  },
  cardText: {
    fontSize: 14,
    textAlign: "left",
    fontWeight: "bold",
    opacity: 1,
    color: "#777",
  },
});

export default function ResumeCard({
  title,
  text,
  disable = false,
  url,
}: {
  title: string;
  text: string;
  disable?: boolean;
  url?: string;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View>
        <Text style={styles.cardText}>{text}</Text>
      </View>
      <Button
        mode="contained-tonal"
        onPress={() => {
          if (url) {
            generatePdf(url);
          }
        }}
        disabled={disable}
      >
        <Text>Generar informe</Text>
      </Button>
    </View>
  );
}
