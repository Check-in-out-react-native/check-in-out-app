import { View, StyleSheet } from "react-native-web";
import MesaCard from "../components/MesaCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { ActivityIndicator } from "react-native-web";

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

//colocar scroll
export function MesaScreen() {
    const [mesas, setMesas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get('https://mobile2024.000webhostapp.com/listar_mesas.php', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                setLoading(false);
                setMesas(response.data);
            } else {
                console.error(`Error ${response.status}: ${response.statusText}`);
            }
        });
    }, []);

    return (
        <View style={ loading ? style.whiteOverlay : style.view }>
            { 
                loading ? <ActivityIndicator animating={loading} color='blue' size='large' />
                : mesas.map(p => <MesaCard mesa={p} key={p?.id_mesa}/>)
            } 
        </View>
    )
}