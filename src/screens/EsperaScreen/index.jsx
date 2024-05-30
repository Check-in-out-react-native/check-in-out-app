import { style } from "./style";
import { View, ActivityIndicator } from "react-native";
import {  List, IconButton } from "react-native-paper";
import ModalEspera from "../../components/ModalEpera/index";
import { useContext, useEffect, useState } from "react";
import { fetchEspera, fetchExcluirCliente } from "../../services";
import { PrincipalContext } from "../../context/PrincipalProvider";

const EsperaScreen = () => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const { principal, setPrincipal, setNotificacao } = useContext(PrincipalContext)

    const showModal = () => setVisible(true);

    const excluirEspera = (id) => {
        const cbSuccess = () => {
            setPrincipal((prev) => ({
                ...prev, 
                espera: prev.espera.filter(p => p.id_cliente !== id )
            }));
            setNotificacao({ 
                msg: 'Item excluído com sucesso!', 
                success: true, 
                visible: true 
            });
        };

        const cbError = () => {
            setNotificacao({ 
                msg: 'Não foi possível remover a espera', 
                success: false, 
                visible: true 
            });
        };

        fetchExcluirCliente({ id_cliente: id }, cbSuccess, cbError);
    };

    useEffect(() => {
        setLoading(true);
        fetchEspera((data) => {
            setLoading(false);
            setPrincipal((prev) => ({...prev, espera: data}));
        });
    }, [principal.mesas]);

    const TrashIcon = ({id}) => <IconButton icon="trash-can" onPress={() => excluirEspera(id)}/>;

    return (
        <View style={ loading ? style.whiteOverlay : style.view }>
            <ModalEspera setVisible={setVisible} visible={visible}/>
            { 
                loading ? <ActivityIndicator animating={loading} color='orange' size='large' />
                : (
                    <List.Section style={{width: '100%'}}>
                        <List.Item 
                            key={999} 
                            title={'Nova espera'} 
                            right={() => <IconButton size={25} style={{height: 25}} icon='plus-circle' iconColor="green" onPress={showModal} centered />}
                            style={{display: 'flex', width: '100%'}}
                        />
                        {
                            principal.espera.map((p) => 
                                <List.Item 
                                    key={p.id_cliente} 
                                    title={p.nome_cliente} 
                                    right={() => <TrashIcon id={p.id_cliente} />}
                                    style={{display: 'flex', width: '100%'}}
                                />
                            )
                        }
                    </List.Section>
                )
            } 
        </View>
    );
};

export {EsperaScreen};