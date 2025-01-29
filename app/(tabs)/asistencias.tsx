import checkSession from "@/utils/checkSession";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { DataTable, TextInput } from "react-native-paper";

// Types
interface Asistencia {
  id: number;
  dni: string;
  nombre?: string;
  turno: string;
  entrada: string;
  out?: string;
}

type Turno = "mañana" | "tarde";

type Tipo = "entrada" | "salida";

// View
export default function Asistencias() {
  // States
  const [DNI, setDNI] = useState<string>("");
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
  const [turno, setTurno] = useState<Turno>("mañana");
  const [tipo, setTipo] = useState<Tipo>("entrada");
  const [error, setError] = useState<string | undefined>("");

  // Fetch data
  useEffect(() => {
    fetch(`https://asa-app-backend.onrender.com/asistencias`, {
      method: "GET",
    })
      .then((r) => r.json())
      .then(
        ({
          success,
          data,
          message,
        }: {
          success: boolean;
          data: Asistencia[];
          message: string;
        }) => {
          // If the request was successful, update state with the data
          if (success) {
            const newData = data.map(({ id, dni, turno, out, entrada }) => {
              return {
                id,
                dni,
                turno,
                out: new Date(out!).toLocaleTimeString("es-MX", {
                  timeZone: "America/Argentina/Buenos_Aires",
                  hour12: false,
                }),
                entrada: new Date(entrada).toLocaleTimeString("es-MX", {
                  timeZone: "America/Argentina/Buenos_Aires",
                  hour12: false,
                }),
              };
            });
            setAsistencias([...newData]);
          }
        }
      );
  }, []);

  // Check user session
  if (checkSession()) {
    return <Redirect href={"/login"} />;
  }

  // Handle asistencia register
  const handleRegister = () => {
    if (!DNI) return setError("Debes completar el campo del DNI");
    if (tipo == "entrada") {
      const nuevaAsistencia: Asistencia = {
        id: Date.now(),
        dni: DNI,
        entrada: new Date().toLocaleTimeString("es-MX", {
          timeZone: "America/Argentina/Buenos_Aires",
          hour12: false,
        }),
        turno: turno,
      };

      setAsistencias([...asistencias, nuevaAsistencia]);
    } else {
      asistencias.map((a) => {
        const now = new Date().toLocaleTimeString("es-MX", {
          timeZone: "America/Argentina/Buenos_Aires",
          hour12: false,
        });
        // Check if the dni and turno match and the user hasn't checked out
        a.dni === DNI &&
          a.turno === turno &&
          !a.out &&
          fetch("https://asa-app-backend.onrender.com/asistencias", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...a,
              out: now,
            }),
          })
            .then((r) => r.json())
            .then(
              ({ success, data }: { data: Asistencia; success: boolean }) => {
                console.log({ data });
                if (success) {
                  setAsistencias(
                    asistencias.map((a) =>
                      a.dni === DNI && a.turno === turno && !a.out
                        ? {
                            ...data,
                          }
                        : a
                    )
                  );
                }
              }
            );
      });
    }
    setDNI("");
  };

  return (
    <ScrollView>
      <View
        style={{
          padding: 16,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Generar Asistencia
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 8,
            padding: 8,
            gap: 16,
          }}
        >
          {error && (
            <Text
              style={{
                backgroundColor: "red",
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                padding: 8,
                borderRadius: 4,
              }}
            >
              {error}
            </Text>
          )}
          <TextInput
            placeholder="DNI"
            onChangeText={(text) => {
              setDNI(text);
              setError("");
            }}
            value={DNI}
            placeholderTextColor={error ? "red" : "black"}
            style={{
              borderColor: error && "red",
              borderWidth: error ? 1 : 0,
            }}
          />
          <View
            style={{
              gap: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "semibold",
                textAlign: "center",
              }}
            >
              Selecciona el turno
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                title="Mañana"
                disabled={turno == "mañana"}
                onPress={() => {
                  setTurno("mañana");
                }}
              />
              <Button
                title="Tarde"
                disabled={turno == "tarde"}
                onPress={() => {
                  setTurno("tarde");
                }}
              />
            </View>
          </View>
          <View
            style={{
              gap: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "semibold",
                textAlign: "center",
              }}
            >
              Selecciona el tipo de Registro
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                title="Entrada"
                disabled={tipo == "entrada"}
                onPress={() => {
                  setTipo("entrada");
                }}
              />
              <Button
                title="Salida"
                disabled={tipo == "salida"}
                onPress={() => {
                  setTipo("salida");
                }}
              />
            </View>
          </View>
          <Button title="Registrar" onPress={handleRegister} />
        </View>
        <View
          style={{
            gap: 42,
            paddingTop: 30,
          }}
        >
          <View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}
            >
              Registros pendientes
            </Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>NOMBRE</DataTable.Title>
                <DataTable.Title>INGRESO</DataTable.Title>
                <DataTable.Title>EGRESO</DataTable.Title>
              </DataTable.Header>
              {asistencias.length > 0 &&
                asistencias.map(({ id, dni, entrada, out }) => {
                  if (out) return;
                  return (
                    <DataTable.Row key={id}>
                      <DataTable.Cell>{dni}</DataTable.Cell>
                      <DataTable.Cell>{entrada}</DataTable.Cell>
                      <DataTable.Cell>FALTA SALIDA</DataTable.Cell>
                    </DataTable.Row>
                  );
                })}
            </DataTable>
          </View>
          <View>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}
            >
              Registros completados
            </Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>NOMBRE</DataTable.Title>
                <DataTable.Title>INGRESO</DataTable.Title>
                <DataTable.Title>EGRESO</DataTable.Title>
              </DataTable.Header>
              {asistencias.length > 0 &&
                asistencias.map(({ id, dni, nombre, entrada, out }) => {
                  if (!out) return;
                  return (
                    <DataTable.Row key={id}>
                      <DataTable.Cell>{nombre ? nombre : dni}</DataTable.Cell>
                      <DataTable.Cell>{entrada}</DataTable.Cell>
                      <DataTable.Cell>{out}</DataTable.Cell>
                    </DataTable.Row>
                  );
                })}
            </DataTable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
