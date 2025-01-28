import { Link } from "expo-router";
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
  const handlePDFGenerate = () => {
    fetch(`https://asa-app-backend.onrender.com/resume${url}`, {
      method: "GET",
    })
      .then((r) => r.json())
      .then(({ pdfUrl }) => {
        const pdf = `https://asa-app-backend.onrender.com${pdfUrl}`;
        window.alert(
          `El informe se genero correctamente, puedes verlo en ${pdf}`
        );
        Alert.alert(
          "Informe generado",
          "El informe se ha generado correctamente",
          [
            {
              text: "Ver informe",
              onPress: () => <Link href={pdf} target="_blank" push={true} />,
            },
          ]
        );
      });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View>
        <Text style={styles.cardText}>{text}</Text>
      </View>
      <Button
        mode="contained-tonal"
        onPress={handlePDFGenerate}
        disabled={disable}
      >
        <Text>Generar informe</Text>
      </Button>
    </View>
  );
}
