import { create } from "zustand";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";

const useAuth = create((set) => ({
  user: null,
  login: async ({ dni, password }) => {
    const response = await fetch(
      `https://asa-app-backend.onrender.com/auth?dni=${dni}&password=${password}`,
      {
        method: "GET",
      }
    )
      .then((r) => r.json())
      .then(({ success, data, token }) => {
        if (success) {
          setItemAsync("sessionToken", token);
          set(() => ({
            user: data,
          }));
          return true;
        }
        return false;
      })
      .catch((e) => {
        console.log({ e });
        return false;
      });

    return response;
  },
  loginWithToken: async () => {
    const token = await getItemAsync("sessionToken");
    if (token) {
      const response = await fetch(
        `https://asa-app-backend.onrender.com/auth/tokenVerify?token=${token}`,
        {
          method: "GET",
        }
      )
        .then((r) => r.json())
        .then(({ success, message, data }) => {
          if (success) {
            set(() => ({
              user: data,
            }));
            return true;
          }
          return false;
        })
        .catch((e) => {
          console.log({ e });
          return false;
        });

      return response;
    }

    return false;
  },

  /**
   *
   * @param {string} dni - DNI del empleado
   * @param {string} name - Nombre del empleado
   * @param {'empleado' | 'supervisor'} rol - Rol del empleado
   * @param {string} password - Contraseña del empleado
   * @param {string} passwordConfirm - Confirmación de contraseña del empleado
   * @returns
   */
  register: async (dni, name, rol, password, passwordConfirm) => {
    if (password !== passwordConfirm) {
      return { success: false, password: "Las contraseñas no coinciden" };
    }

    if (password.length <= 6) {
      return { success: false, password: "La contraseña es muy corta" };
    }

    if (dni.length <= 7) {
      return { success: false, dni: "Debes ingresar un DNI valido" };
    }

    if (!name) {
      return { success: false, name: "Debes ingresar un Nombre" };
    }

    if (!rol) {
      return { success: false, rol: "Debes ingresar un rol valido" };
    }

    const response = await fetch(`https://asa-app-backend.onrender.com/auth/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        dni,
        name,
        rol,
        password,
        passwordConfirm,
      }),
    })
      .then((r) => r.json())
      .then(({ success }) => {
        if (success) {
          set(() => ({
            user: {
              nombre: name,
              rol,
              dni,
            },
          }));
          return { success: true, dni: "Usuario creado" };
        }
        return { success: false, dni: "Ya existe un usuario con ese DNI" };
      })
      .catch((e) => {
        console.log({ e }, "error");
        return {
          success: false,
          dni: "Ya existe un usuario con ese DNI",
        };
      });
    return response;
  },
  logout: () => {
    set(() => ({
      user: null,
    }));

    deleteItemAsync("sessionToken");
  },
}));

export default useAuth;
