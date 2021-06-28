import { useEffect } from "react";
import { useState } from "react";
import { createContext, ReactNode } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";

type User = {
  id: string;
  name: string;
  email: string;
  admin: boolean;
};

type AuthContextType = {
  user: User | undefined;
  isAuthLoading: boolean;
  logout: () => void;
  loadUser: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthContextProviderProps = {
  children: ReactNode;
};

function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const history = useHistory()
  async function loadUser() {
    setIsAuthLoading(true);
    const token = localStorage.getItem("token");
    if (token)
      await api
        .get("/login", { headers: { authorization: `bearer ${token}` } })
        .then((res) => {
          const { id, name, email, admin } = res.data?.user;
          setUser({ id, name, email, admin });
        })
        .catch((e) => localStorage.removeItem("token"));
    setIsAuthLoading(false);
  }

  function logout() {
    setUser(undefined);
    localStorage.removeItem("token");
    history.push("/")
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout, loadUser, isAuthLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider };
