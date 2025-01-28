import { create } from "zustand";
import { getItemAsync, setItemAsync } from "expo-secure-store";

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
}));

export default useAuth;
