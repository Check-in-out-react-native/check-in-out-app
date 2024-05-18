import { View, StyleSheet } from "react-native";
import {  List, IconButton } from "react-native-paper";
import ModalEspera from "../components/ModalEspera";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import axios from "axios";

const EsperaScreen = () => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [reservas, setReservas] = useState([]);

    const TrashIcon = () => <List.Icon icon="trash-can" />;
    const showModal = () => setVisible(true);

    useEffect(() => {
        axios.get('https://mobile2024.000webhostapp.com/fila_de_espera.php', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                setLoading(false);
                setReservas(response.data);
                console.log(response.data)
            } else {
                console.error(`Error ${response.status}: ${response.statusText}`);
            }
        });
    }, []);

    return (
        <View style={ loading ? style.whiteOverlay : style.view }>
            <ModalEspera setVisible={setVisible} visible={visible}/>
            { 
                loading ? <ActivityIndicator animating={loading} color='blue' size='large' />
                : (
                    <List.Section>
                        <List.Subheader style={{fontSize: 25, display: 'flex', alignItems: 'center'}}>
                            Adicionar reserva 
                            <IconButton size={35} icon='plus-circle' onPress={showModal}></IconButton>
                        </List.Subheader>
                        {
                            reservas.map((p, i) => <List.Item key={i} title={p.nome_cliente} right={TrashIcon} />)
                        }
                    </List.Section>
                )
            } 
        </View>
    );
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

export {EsperaScreen};