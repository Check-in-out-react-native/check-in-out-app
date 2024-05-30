import { style } from "./style";
import { View, ActivityIndicator } from "react-native";
import MesaCard from "../../components/MesaCard";
import { useContext, useEffect, useState } from "react";
import { PrincipalContext } from "../../context/PrincipalProvider";
import { fetchMesas } from "../../services";

const MesaScreen = () => {
    const { principal, setPrincipal } = useContext(PrincipalContext) ;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchMesas((data) => {
            setLoading(false);
            setPrincipal({...principal, mesas: data });
        });
    }, [principal.mesaEdit]);

    return (
        <View style={ loading ? style.whiteOverlay : style.view }>
            { 
                loading ? <ActivityIndicator animating={loading} color='orange' size='large' />
                : principal.mesas.map((p, key) => <MesaCard mesa={p} key={key}/>)
            } 
        </View>
    )
};

export { MesaScreen };