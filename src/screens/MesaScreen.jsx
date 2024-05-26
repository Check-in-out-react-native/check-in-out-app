import { View, StyleSheet } from "react-native";
import MesaCard from "../components/MesaCard";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { PrincipalContext } from "../context/PrincipalProvider";
import { fetchMesas } from "../services";

const MesaScreen = () => {
    const { principal, setPrincipal } = useContext(PrincipalContext) ;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetchMesas((data) => {
            setLoading(false);
            setPrincipal({...principal, mesas: data });
        });
    }, []);

    return (
        <View style={ loading ? style.whiteOverlay : style.view }>
            { 
                loading ? <ActivityIndicator animating={loading} color='orange' size='large' />
                : principal.mesas.map((p, key) => <MesaCard mesa={p} key={key}/>)
            } 
        </View>
    )
};

const style = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: "wrap",
        gap: 10,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
        width: '90%'
    },
    whiteOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'      
     }
});

export { MesaScreen };