import { Link, RelativePathString } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  href: RelativePathString;
  title: string;
  description: string;
}

export default function CardResume({ href, title, description }: Props) {
  return (
    <View style={styles.cart}>
      <Link href={href} style={styles.link}>
        {title}
      </Link>
      <Text style={styles.text}>{description}</Text>
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
  cart: {
    borderColor: "#717171",
    borderRadius: 8,
    borderCurve: "circular",
    padding: 12,
    backgroundColor: "#414141",
    margin: "auto",
    width: "100%",
  },
  text: {
    color: "rgba(255,255,255,.7)",
  },
  link: {
    color: "white",
    fontSize: 18,
    paddingVertical: 16,
    textDecorationLine: "underline",
  },
});
