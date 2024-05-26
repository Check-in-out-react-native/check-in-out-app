import { useState } from "react";
import { createContext } from "react";

const PrincipalContext = createContext();

const PrincipalProvider = ({children}) => {
    const [principal, setPrincipal] = useState({
        mesas: [],
        espera: [],
        mesaEdit: {}
    });

    const [notificacao, setNotificacao] = useState({
        success: false,
        visible: false,
        msg: ''
    });

    return (
        <PrincipalContext.Provider value={{ principal, setPrincipal, notificacao, setNotificacao }}>
          {children}
        </PrincipalContext.Provider>
    );
};

export { PrincipalContext, PrincipalProvider };