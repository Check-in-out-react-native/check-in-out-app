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

    const showModal = () => setVisible(true);

    const excluirEspera = (id) => {
        axios.post('https://mobile2024.000webhostapp.com/excluir_cliente_fila.php', new URLSearchParams({ id_cliente: id }))
            .then(response => {
                if (response.status === 200) {
                    setReservas(reservas.filter(p => p.id_cliente !== id));
                } else {
                    console.error(`Error ${response.status}: ${response.statusText}`);
                }
            });
    };

    useEffect(() => {
        axios.get('https://mobile2024.000webhostapp.com/fila_de_espera.php', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                setLoading(false);
                setReservas(response.data);
            } else {
                console.error(`Error ${response.status}: ${response.statusText}`);
            }
        });
    }, []);

    const TrashIcon = ({id}) => <IconButton icon="trash-can" onPress={() => excluirEspera(id)}/>;

    return (
        <View style={ loading ? style.whiteOverlay : style.view }>
            <ModalEspera setVisible={setVisible} visible={visible}/>
            { 
                loading ? <ActivityIndicator animating={loading} color='blue' size='large' />
                : (
                    <List.Section>
                        <List.Subheader style={{fontSize: 15, display: 'flex', alignItems: 'center'}}>
                            Adicionar reserva 
                            <IconButton size={25} icon='plus-circle' iconColor="green" onPress={showModal}></IconButton>
                        </List.Subheader>
                        {
                            reservas.map((p) => 
                                <List.Item 
                                    key={p.id_cliente} 
                                    title={p.nome_cliente} 
                                    right={() => <TrashIcon id={p.id_cliente} />} 
                                />
                            )
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