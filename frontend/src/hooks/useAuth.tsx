import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";

function useAuth() {
    return useContext(AuthContext);
}

export {useAuth}