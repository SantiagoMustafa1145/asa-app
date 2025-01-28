import { StyleSheet, Text, View } from "react-native";

interface Props {
  client: string;
  count: number;
  total: number;
  date: string;
}

export default function Item({ client, count, total, date }: Props) {
  const styles = StyleSheet.create({
    items: {
      flexDirection: "row",
      gap: 8,
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 10,
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderColor: "rgba(0,0,0,.15)",
    },
  });

  return (
    <View style={styles.items}>
      <Text
        style={{
          textTransform: "capitalize",
        }}
      >
        {client}
      </Text>
      <Text>{count}</Text>
      <Text>$ {total.toLocaleString()}</Text>
      <Text>{date}</Text>
    </View>
  );
}
