import React, { useEffect } from "react";
import { DataTable } from "react-native-paper";
import { Redirect } from "expo-router";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { useState } from "react";
import checkSession from "@/utils/checkSession";
import style from "@/css/distribuidores";
import styles from "@/css/distribuidores";
import useAuth from "@/store/user";

// Types
interface Distribuidor {
  id: number;
  dni: string;
  nombre: string;
  up: number;
  empty: number;
  down: number;
  sell: number;
  fecha: string;
  estado: "completado" | "incompleto";
}

//View
export default function Distribuidores() {
  // Register Type
  const [registro, setRegistro] = useState(true);

  // List of distribuidores
  const [distribuidores, setDistribuidores] = useState<Distribuidor[]>([]);

  // data of Distribuidor form
  const [nombre, setNombre] = useState("");
  const [up, setUp] = useState(0);

  // Count of drivers whit incomplete trips
  const [incompletos, setIncompletos] = useState(0);

  // Error messages
  const [error, setError] = useState("");
  const [errorIngreso, setErrorIngreso] = useState("");

  // User
  const { user } = useAuth();

  // Fetch data
  useEffect(() => {
    fetch("https://asa-app-backend.onrender.com/distribuidores/", {
      method: "GET",
    })
      .then((r) => r.json())
      .then(({ success, data }: { success: boolean; data: Distribuidor[] }) => {
        if (success) {
          setDistribuidores([...data]);
          setIncompletos(data.filter((x) => x.estado == "incompleto").length);
        }
      });
  }, []);

  // Change between register types (egreso/ingreso)
  const handlePress = () => {
    setRegistro(!registro);
  };

  const actualizarDatos = () => {
    fetch("https://asa-app-backend.onrender.com/distribuidores/", {
      method: "GET",
    })
      .then((r) => r.json())
      .then(({ success, data }: { success: boolean; data: Distribuidor[] }) => {
        if (success) {
          setDistribuidores([...data]);
          setIncompletos(data.filter((x) => x.estado == "incompleto").length);
        }
      });
  };

  // Register a new egreso
  const registrarEgreso = () => {
    if (error) return;
    fetch("https://asa-app-backend.onrender.com/distribuidores/egreso", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        up,
        estado: "incompleto",
      }),
    })
      .then((r) => r.json())
      .then(
        ({
          success,
          message,
          data,
        }: {
          success: boolean;
          message: string;
          data: Distribuidor;
        }) => {
          setDistribuidores([
            ...distribuidores,
            {
              ...data,
            },
          ]);
          setIncompletos(incompletos + 1);
          setNombre("");
          setUp(0);
        }
      )
      .catch((e) => {
        console.log({ e });
        setError(e.message);
      });
  };

  // Register end of a trip
  const registrarIngreso = (x: Distribuidor) => {
    distribuidores.map((dist) => {
      // Search for the driver to register
      console.log(
        dist.nombre === x.nombre && dist.estado == "incompleto",
        dist.nombre,
        x.nombre,
        dist.estado,
        x.estado
      );
      if (dist.nombre === x.nombre && dist.estado == "incompleto") {
        // Check if the amount of bidones is correct
        if (dist.up === x.down + x.sell + x.empty) {
          // Send data to the backend
          fetch("https://asa-app-backend.onrender.com/distribuidores/ingreso", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...dist,
              down: x.down,
              sell: x.sell,
              empty: x.empty,
              estado: "completado",
            }),
          })
            .then((r) => r.json())
            .then(({ success, data }) => {
              // If the data was send and save correctly update the Distribuidores state
              if (success) {
                let newDist = distribuidores.filter(
                  (d) =>
                    d.estado == "completado" ||
                    (d.estado == "incompleto" && d.nombre !== x.nombre)
                );
                setDistribuidores([...newDist, data]);
                setIncompletos(incompletos - 1);
                setErrorIngreso("");
              }
            });
        } else {
          setErrorIngreso(`La cantidad de bidones no coincide para ${name}`);
        }
      }
    });
  };

  // Check user session
  if (checkSession()) return <Redirect href={"/login"} />;
  if (user?.rol === "empleado") {
    Alert.alert("Acceso Denegado", "No cumples con los permisos para acceder");
    return <Redirect href={"/"} />;
  }

  return (
    <ScrollView>
      <View
        style={{
          paddingInline: 8,
          gap: 32,
          justifyContent: "space-between",
          maxWidth: 500,
          width: "100%",
          marginInline: "auto",
        }}
      >
        <View
          style={{
            gap: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              padding: 4,
              backgroundColor: "rgba(100,100,100,.45)",
              borderRadius: 8,
              justifyContent: "space-around",
              position: "relative",
              overflow: "hidden",
              maxWidth: 400,
              width: "100%",
              margin: "auto",
              marginVertical: 20,
            }}
          >
            <Button
              onPress={handlePress}
              disabled={registro}
              style={{
                backgroundColor: "#f1f1f1",
                borderRadius: 8,
                width: "100%",
                maxWidth: 150,
              }}
            >
              Registrar Egreso
            </Button>
            <Button
              onPress={handlePress}
              disabled={!registro}
              style={{
                backgroundColor: "#f1f1f1",
                borderRadius: 8,
              }}
            >
              Registrar Ingreso
            </Button>

            {incompletos >= 1 ? (
              <Text
                style={{
                  position: "absolute",
                  top: 0,
                  width: 18,
                  height: 18,
                  textAlign: "center",
                  right: "6%",
                  backgroundColor: "red",
                  borderRadius: 999999,
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {incompletos}
              </Text>
            ) : (
              ""
            )}
          </View>
          {registro ? (
            <View
              style={{
                gap: 32,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Registrar salida del distribuidor
              </Text>
              {error && (
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    backgroundColor: "red",
                    color: "black",
                    textAlign: "center",
                    padding: 8,
                    borderRadius: 8,
                  }}
                >
                  {error}
                </Text>
              )}
              <View
                style={{
                  gap: 24,
                  padding: 8,
                  borderWidth: 1,
                  borderRadius: 8,
                }}
              >
                <View>
                  <Text style={{ paddingLeft: 6 }}>
                    Nombre del distribuidor
                  </Text>
                  <TextInput
                    placeholder="Nombre del distribuidor"
                    style={styles.input}
                    onChangeText={(text) => {
                      distribuidores.filter(
                        (x) => x.nombre == text && x.estado == "incompleto"
                      ).length !== 0
                        ? setError("Este distribuidor tiene un viaje pendiente")
                        : setError("");
                      setNombre(text.toLowerCase());
                    }}
                    value={nombre}
                  />
                </View>
                <View>
                  <Text style={{ paddingLeft: 6 }}>
                    Cantidad de bidones al salir
                  </Text>
                  <TextInput
                    placeholder="Cantidad de bidones al salir"
                    style={styles.input}
                    onChangeText={(text) => {
                      setUp(text == "" ? 0 : Number.parseInt(text));
                    }}
                    value={up.toLocaleString()}
                  />
                </View>
                <Button onPress={registrarEgreso}>Registrar Egreso</Button>
              </View>
            </View>
          ) : (
            <View
              style={{
                gap: 32,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Registrar entrada del distribuidor
              </Text>
              {errorIngreso && (
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    backgroundColor: "red",
                    color: "white",
                    textAlign: "center",
                    padding: 8,
                    borderRadius: 8,
                  }}
                >
                  {errorIngreso}
                </Text>
              )}
              <View
                style={{
                  gap: 16,
                  borderWidth: 1,
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                {distribuidores.length ? (
                  distribuidores.map((dist) => {
                    if (dist.estado === "completado") return;
                    return (
                      <View key={dist.id}>
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 8,
                            justifyContent: "space-between",
                          }}
                        >
                          <Text>Distribuidor</Text>
                          <Text>Llevados</Text>
                          <Text
                            style={{
                              flex: 1,
                              maxWidth: 270,
                            }}
                          >
                            Registro de entrada
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 8,
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "#d9d9d9",
                            borderRadius: 8,
                            padding: 4,
                          }}
                        >
                          <View>
                            <Text>{dist.nombre}</Text>
                          </View>
                          <View>
                            <Text>{dist.up}</Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              maxWidth: 270,
                              gap: 4,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "bold",
                              }}
                            >
                              Sobrantes
                            </Text>
                            <TextInput
                              style={style.input}
                              placeholder="Sobrantes"
                              onChangeText={(text) => {
                                dist.down =
                                  text == "" ? 0 : Number.parseInt(text);
                              }}
                            />
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "bold",
                              }}
                            >
                              Vacíos
                            </Text>
                            <TextInput
                              style={style.input}
                              placeholder="Vacíos"
                              onChangeText={(text) => {
                                dist.empty =
                                  text == "" ? 0 : Number.parseInt(text);
                              }}
                            />
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "bold",
                              }}
                            >
                              Vendidos
                            </Text>
                            <TextInput
                              style={style.input}
                              placeholder="Vendidos"
                              onChangeText={(text) => {
                                dist.sell =
                                  text == "" ? 0 : Number.parseInt(text);
                              }}
                            />
                          </View>
                        </View>
                        <Button onPress={() => registrarIngreso(dist)}>
                          Registrar Ingreso
                        </Button>
                      </View>
                    );
                  })
                ) : (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    No hay Distribuidores con ingreso pendiente
                  </Text>
                )}
              </View>
            </View>
          )}
        </View>

        <View style={{ padding: 8, borderWidth: 1, borderRadius: 8, gap: 16 }}>
          <Pressable
            style={{
              backgroundColor: "#ccc",
              borderRadius: 8,
              maxWidth: 130,
              marginLeft: "auto",
              width: "100%",
            }}
            onPress={actualizarDatos}
          >
            <Text
              style={{
                textAlign: "center",
                padding: 8,
              }}
            >
              Actualizar 🔄
            </Text>
          </Pressable>
          <Text
            style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
          >
            Registros Completados
          </Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title textStyle={{ fontWeight: "bold" }}>
                Distribuidor
              </DataTable.Title>
              <DataTable.Title textStyle={{ fontWeight: "bold" }}>
                Llevados
              </DataTable.Title>
              <DataTable.Title textStyle={{ fontWeight: "bold" }}>
                Vacíos
              </DataTable.Title>
              <DataTable.Title textStyle={{ fontWeight: "bold" }}>
                Sobrantes
              </DataTable.Title>
              <DataTable.Title textStyle={{ fontWeight: "bold" }}>
                Vendidos
              </DataTable.Title>
            </DataTable.Header>
            {distribuidores.map(
              ({ nombre, up, down, sell, empty, id, estado }) => {
                if (estado === "incompleto") return;
                return (
                  <DataTable.Row key={id}>
                    <DataTable.Cell>{nombre}</DataTable.Cell>
                    <DataTable.Cell>{up}</DataTable.Cell>
                    <DataTable.Cell>{empty}</DataTable.Cell>
                    <DataTable.Cell>{down}</DataTable.Cell>
                    <DataTable.Cell>{sell}</DataTable.Cell>
                  </DataTable.Row>
                );
              }
            )}
          </DataTable>
        </View>
      </View>
    </ScrollView>
  );
}
