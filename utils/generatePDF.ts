import { router } from "expo-router";
import { Alert } from "react-native";

export default async function generatePdf(url: string) {
  await fetch(`https://asa-app-backend.onrender.com/resume${url}`, {
    method: "GET",
  })
    .then((r) => r.json())
    .then(({ pdfUrl }) => {
      const pdf = `https://asa-app-backend.onrender.com${pdfUrl}`;
      Alert.alert(
        "Informe generado",
        "El informe se ha generado correctamente",
        [
          {
            text: "Ver informe",
            onPress: () => router.push(pdf),
          },
        ]
      );
    });
}
