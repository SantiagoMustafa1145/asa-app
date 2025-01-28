import { View } from "react-native";
import { DataTable } from "react-native-paper";

export default function Table({
  list,
}: {
  list: Array<{
    id: number;
    client: string;
    count: number;
    total: number;
    date: string;
  }>;
}) {
  return (
    <View style={{ padding: 8 }}>
      <DataTable
        style={{
          borderWidth: 1,
          borderRadius: 8,
          borderColor: "rgba(88,88,88,.5)",
        }}
      >
        <DataTable.Header>
          <DataTable.Title>Tipo</DataTable.Title>
          <DataTable.Title style={{ justifyContent: "center" }}>
            Cantidad
          </DataTable.Title>
          <DataTable.Title>Total</DataTable.Title>
          <DataTable.Title>Fecha</DataTable.Title>
          <DataTable.Title>Hora</DataTable.Title>
        </DataTable.Header>
        {list.length >= 1 &&
          list.map(({ id, client, count, total, date }) => {
            const [day, hour] = date?.split(",");

            return (
              <DataTable.Row key={id}>
                <DataTable.Cell>{client}</DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: "center" }}>
                  {count}
                </DataTable.Cell>
                <DataTable.Cell>$ {total.toLocaleString()}</DataTable.Cell>
                <DataTable.Cell>{day}</DataTable.Cell>
                <DataTable.Cell>{hour}</DataTable.Cell>
              </DataTable.Row>
            );
          })}
      </DataTable>
    </View>
  );
}
