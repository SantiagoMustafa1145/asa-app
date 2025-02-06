import useAuth from "@/store/user";
import { Alert, StyleSheet, Text, View, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { Link, Redirect } from "expo-router";
import { useEffect } from "react";

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 8,
    gap: 16,
    justifyContent: "center",
    height: "100%",
    maxWidth: 500,
    width: "100%",
    marginInline: "auto",
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

export default function LoginView() {
  const { user, login } = useAuth();
  useEffect(() => {}, [user]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dni: "",
      password: "",
    },
  });

  const handlePress = async ({
    dni,
    password,
  }: {
    dni: string;
    password: string;
  }) => {
    const result: boolean = await login({ dni, password });
    if (result) {
      return Alert.alert(
        "Has iniciado Sesión",
        "Su sesión se ha iniciado correctamente"
      );
    }
    return Alert.alert("Acceso Denegado", "DNI o Contraseña incorrecta");
  };

  if (user) {
    return <Redirect href={"/(tabs)"} />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="dni"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="DNI"
                onChangeText={(text) => {
                  const regex = /^\d+$/;
                  if (regex.test(text) || text == "") {
                    onChange(text);
                  }
                }}
                inputMode="numeric"
                keyboardType="numeric"
                onBlur={onBlur}
                value={value}
                style={styles.input}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="PASSWORD"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                style={styles.input}
                textContentType="password"
                caretHidden={true}
              />
            )}
          />
        </View>
        <Button onPress={handleSubmit(handlePress)} title={"Ingresar"} />
      </View>
      <Link style={styles.text} href={"/register"}>
        Registrar una cuenta
      </Link>
    </View>
  );
}
