import useAuth from "@/store/user";
import { Link, Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 8,
    gap: 16,
    justifyContent: "center",
    height: "100%",
  },
  formContainer: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  input: {},
  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    borderWidth: 0.5,
    borderColor: "#777",
    padding: 8,
    borderRadius: 8,
  },
});

export default function RegisterView() {
  const { user, register } = useAuth();
  const [error, setError] = useState<{
    dni?: String;
    name?: String;
    rol?: String;
    password?: String;
  }>();
  useEffect(() => {}, [user]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    dni: string;
    name: string;
    rol: "empleado" | "supervisor";
    password: string;
    passwordConfirm: string;
  }>({
    defaultValues: {
      dni: "",
      name: "",
      rol: "empleado",
      password: "",
      passwordConfirm: "",
    },
  });

  const handlePress = async ({
    dni,
    name,
    rol,
    password,
    passwordConfirm,
  }: {
    dni: string;
    name: string;
    rol: "empleado" | "supervisor";
    password: string;
    passwordConfirm: string;
  }) => {
    const response: {
      success: string;
      key: string;
    } = await register(dni, name, rol, password, passwordConfirm);
    const res = Object.entries(response);

    if (res[0][1]) {
      return Alert.alert("Notificación", res[1][1]);
    } else {
      setError({
        [res[1][0]]: res[1][1],
      });
    }
  };

  if (user) {
    return <Redirect href={"/(tabs)"} />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          {error?.dni && <Text>{error.dni}</Text>}
          <Controller
            control={control}
            name="dni"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="DNI"
                onChangeText={(text) => {
                  const regex = /^\d+$/;
                  if (regex.test(text)) {
                    onChange(text);
                  }
                }}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {error?.name && <Text>{error.name}</Text>}

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="NOMBRE"
                onChangeText={() => onChange(value.toLowerCase())}
                onBlur={onBlur}
                value={value.toLowerCase()}
              />
            )}
          />
          {error?.rol && <Text>{error.rol}</Text>}

          <Controller
            control={control}
            name="rol"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="ROL"
                onChangeText={() => onChange(value.toLowerCase())}
                onBlur={onBlur}
                value={value.toLowerCase()}
              />
            )}
          />
          {error?.password && <Text>{error.password}</Text>}

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="CONTRASEÑA"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="CONFIRMAR CONTRASEÑA"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </View>
        <Button
          onPress={handleSubmit(handlePress)}
          title={"Registrar cuenta"}
        />
      </View>
      <Link style={styles.text} href={"/login"}>
        Si ya tienes una cuenta, inicia sesión
      </Link>
    </View>
  );
}
