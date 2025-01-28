import { StyleSheet } from "react-native";
import useTypeOfSale from "@/store/typeOfSale";

const { type } = useTypeOfSale();

const styles = StyleSheet.create({
  typeContainer: {
    display: "flex",
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  vendedor: {
    backgroundColor: type == "consumidor" ? "#515151" : "transparent",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  vendedorText: {
    color: type == "consumidor" ? "#fff" : "#000",
  },
  revendedor: {
    backgroundColor: type == "revendedor" ? "#515151" : "transparent",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  revendedorText: {
    color: type == "revendedor" ? "#fff" : "#000",
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

export default styles;
