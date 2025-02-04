import {
  Alert,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import useAuth from "@/store/user";
import Table from "@/components/ventas/table";
import checkSession from "@/utils/checkSession";
import usePrice from "@/store/prices";

// Types
interface List {
  id: number;
  client: string;
  count: number;
  total: number;
  date: string;
}

// Factorizar y optimizar estados y código
export default function Ventas() {
  // States
  const [tipoVenta, setTipoVenta] = useState("consumidor");
  const [list, setList] = useState<List[]>([]);
  const [error, setError] = useState("");
  const [count, setCount] = useState(0);
  const { user } = useAuth();
  const { ventas, reventas, total, setReventas, setVentas, setTotal } =
    usePrice();

  // Fetch data for Ventas
  useEffect(() => {
    fetch("https://asa-app-backend.onrender.com/ventas", {
      method: "GET",
    })
      .then((r) => r.json())
      .then(({ success, message, data }) => {
        if (success) {
          setList([...data]);
        }
      })
      .catch((e) => {
        console.log({ e });
      });

    fetch("https://asa-app-backend.onrender.com/precios", {
      method: "GET",
    })
      .then((r) => r.json())
      .then(({ success, data }) => {
        if (success) {
          setVentas(data.venta);
          setReventas(data.reventa);
        }
      });
  }, []);

  const handleToggleTipoVenta = (tipo: string) => {
    setTipoVenta(tipo);
    calculatePrice(count, tipo);
  };

  const handleTogglePrices = () => {
    fetch("https://asa-app-backend.onrender.com/precios", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        venta: ventas,
        reventa: reventas,
      }),
    })
      .then((r) => r.json())
      .then(({ success, message }) => {
        if (success) {
          Alert.alert("Guardado", "Se han guardado los precios correctamente");
        }
      })
      .catch((e) => {
        console.log({ e });
      });
  };

  // Handle selling registration process
  const handlePress = () => {
    if (!count) {
      return setError("Debes ingresar un numero mayor a 0");
    }

    // Send data to backend and save it in the database
    fetch(`https://asa-app-backend.onrender.com/ventas/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Date.now(),
        client: tipoVenta,
        total: total,
        count,
      }),
    })
      .then((r) => r.json())
      .then(({ success, message }) => {
        if (success) {
          setList([
            ...list,
            {
              id: Date.now(),
              client: tipoVenta,
              total: total,
              date: new Date().toLocaleString("es-MX", {
                timeZone: "America/Argentina/Buenos_Aires",
                hour12: false,
              }),
              count,
            },
          ]);
        }

        setCount(0);
        setTotal(0);
      })
      .catch((e) => {
        Alert.alert("Error", "No se pudo guardar en la base de datos la venta");
      });
  };

  const calculateNewPrice = ({
    newVentas = ventas,
    newReventas = reventas,
  }) => {
    setTotal(
      count * parseInt(tipoVenta == "consumidor" ? newVentas : newReventas)
    );
  };

  // Calculate the total price
  const calculatePrice = (count: number, tipo?: string) => {
    setError("");
    setTotal(
      count *
        Number.parseInt(
          tipo
            ? tipo == "consumidor"
              ? ventas
              : reventas
            : tipoVenta == "consumidor"
            ? ventas
            : reventas
        )
    );
  };

  // Check user session
  if (checkSession()) return <Redirect href={"/login"} />;

  // styles
  const styles = StyleSheet.create({
    typeContainer: {
      display: "flex",
      gap: 16,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    vendedor: {
      backgroundColor: tipoVenta == "consumidor" ? "#515151" : "transparent",
      padding: 8,
      borderRadius: 8,
      borderWidth: 1,
    },
    vendedorText: {
      color: tipoVenta == "consumidor" ? "#fff" : "#000",
    },
    revendedor: {
      backgroundColor: tipoVenta == "revendedor" ? "#515151" : "transparent",
      padding: 8,
      borderRadius: 8,
      borderWidth: 1,
    },
    revendedorText: {
      color: tipoVenta == "revendedor" ? "#fff" : "#000",
    },
    input: {
      borderRadius: 8,
      padding: 12,
      fontSize: 18,
      fontWeight: 600,
      borderColor: "rgba(88,88,88,.5)",
      borderWidth: 1,
    },
    container: {
      gap: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: "rgba(88,88,88,.5)",
      margin: 8,
      borderRadius: 8,
    },
    total: {
      fontSize: 18,
      fontWeight: 600,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: "rgba(88,88,88,.5)",
      padding: 12,
    },
    title: {
      fontSize: 20,
      fontWeight: 500,
      textAlign: "center",
    },
  });

  return (
    <ScrollView>
      <View
        style={{
          gap: 32,
          maxWidth: 500,
          width: "100%",
          marginInline: "auto",
        }}
      >
        <Text style={styles.title}>
          Selecciona el tipo de venta a registrar
        </Text>
        <View style={styles.container}>
          <View style={styles.typeContainer}>
            <Pressable
              onPress={() => handleToggleTipoVenta("consumidor")}
              style={styles.vendedor}
            >
              <Text style={styles.vendedorText}>Consumidor</Text>
            </Pressable>
            <Pressable
              onPress={() => handleToggleTipoVenta("revendedor")}
              style={styles.revendedor}
            >
              <Text style={styles.revendedorText}>Revendedor</Text>
            </Pressable>
          </View>
          <View>
            <Text>Cantidad de Aguas</Text>
            <TextInput
              placeholder="Cantidad de Aguas"
              style={styles.input}
              onChangeText={(data) => {
                setCount(data == "" ? 0 : Number.parseInt(data));
                calculatePrice(data == "" ? 0 : Number.parseInt(data));
              }}
              value={count.toString()}
            />
            {error && (
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "red",
                  borderWidth: 1,
                  borderColor: "red",
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                {error}
              </Text>
            )}
          </View>
          <View>
            <Text>Monto Total</Text>
            <Text style={styles.total}>
              $ {total ? total.toLocaleString() : "0"}
            </Text>
          </View>
          <Button
            onPress={handlePress}
            title="Registrar venta"
            accessibilityLabel="Registrar una venta"
          />
        </View>
        {user?.rol == "admin" && (
          <View style={styles.container}>
            <Text style={styles.title}>Configura los precios</Text>
            <View>
              <Text>Precio Consumidor</Text>
              <TextInput
                placeholder={`Ingresa un nuevo valor para Ventas`}
                onChangeText={(text) => {
                  const regex = /^\d+$/;
                  if (regex.test(text) || text == "") {
                    setVentas(text);
                    calculateNewPrice({ newVentas: text });
                  }
                }}
                value={ventas}
                style={styles.input}
              />
            </View>
            <View>
              <Text>Precio Revendedor</Text>
              <TextInput
                placeholder={`Ingresa un nuevo valor para Reventas`}
                onChangeText={(text) => {
                  const regex = /^\d+$/;
                  if (regex.test(text) || text == "") {
                    setReventas(text);
                    calculateNewPrice({ newReventas: text });
                  }
                }}
                value={reventas}
                style={styles.input}
              />
            </View>
            <Button title="Guardar" onPress={handleTogglePrices} />
          </View>
        )}
        <View style={styles.container}>
          <Text style={styles.title}>Resumen de hoy</Text>
          <View style={{ gap: 16 }}>
            <Text style={styles.total}>
              Ventas realizadas hoy: {list.length.toLocaleString()}
            </Text>
            <Text style={styles.total}>
              Total vendido hoy: $
              {list
                .reduce((prev, current) => current.total + prev, 0)
                .toLocaleString()}
            </Text>
          </View>
        </View>
        <Table list={list} />
      </View>
    </ScrollView>
  );
}
