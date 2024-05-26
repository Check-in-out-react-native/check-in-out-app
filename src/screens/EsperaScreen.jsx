import { View, StyleSheet } from "react-native";
import {  List, IconButton } from "react-native-paper";
import ModalEspera from "../components/ModalEspera";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { fetchEspera, fetchExcluirCliente } from "../services";
import { PrincipalContext } from "../context/PrincipalProvider";

const EsperaScreen = () => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const { principal, setPrincipal, setNotificacao } = useContext(PrincipalContext)

    const showModal = () => setVisible(true);

    const excluirEspera = (id) => {
        fetchExcluirCliente({ id_cliente: id }, () => {
            setPrincipal((prev) => ({
                ...prev, 
                espera: prev.espera.filter(p => p.id_cliente !== id )
            }));
            setNotificacao({ 
                msg: 'Item excluído com sucesso!', 
                success: true, 
                visible: true 
            });
        });
    };

    useEffect(() => {
        setLoading(true);
        fetchEspera((data) => {
            setLoading(false);
            setPrincipal((prev) => ({...prev, espera: data}));
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
                            principal.espera.map((p) => 
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