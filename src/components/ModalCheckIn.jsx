import { Modal, Button, Portal, Surface, IconButton } from 'react-native-paper';
import { Text } from 'react-native';
import { PaperSelect } from "react-native-paper-select";
import { useContext, useEffect, useState } from 'react';
import { fetchCheckinCliente, fetchClientePorQtd } from '../services';
import { StyleSheet } from 'react-native-web';
import { PrincipalContext } from '../context/PrincipalProvider';

const ModalCheckIn = ({setVisible, visible}) => {
    const { principal, setPrincipal, setNotificacao, esperaCheckin } = useContext(PrincipalContext);
    const [reserva, setReserva] = useState({
        value: '',
        list: [],
        selectedList: [],
        error: '',
    });

    useEffect(() => {
        setReserva({
            value: '',
            list: esperaCheckin?.map(p => ({ _id: p.id_cliente, value: p.nome_cliente })),
            selectedList: [],
            error: 'Não',
        })
    }, [esperaCheckin]);

    const hideModal = () => setVisible(false);

    const checkIn = () => {
        const cbSuccess = () => {
            setNotificacao({ 
                msg: 'Check in realizado com sucesso!', 
                success: true, 
                visible: true 
            });
            setPrincipal((prev) => ({...prev, mesaEdit: { ...prev.mesaEdit, reserva: 1 } }));
            hideModal();
        };
        const cbError = () => {
            hideModal();
            setNotificacao({ 
                msg: 'Não foi possível realizar o check in', 
                success: false, 
                visible: true 
            });
        };

        fetchCheckinCliente({
            id_cliente: reserva.selectedList[0]._id,
            id_mesa: principal.mesaEdit.id_mesa
        }, cbSuccess, cbError);
    };

    return (
        <Portal>
            <Modal visible={visible} dismissable={false} contentContainerStyle={style.modalStyle}>
                <Surface elevation={0}  style={ style.titleModalStyle }>
                    <Text style={{ fontSize: 20 }}>Check-in mesa { principal.mesaEdit.id_mesa }</Text>
                    <IconButton icon="close" onPress={ hideModal } style={{ width: 20 }} />
                </Surface>
                <PaperSelect
                    label="Reservar para"
                    value={ reserva.value }
                    onSelection={(value) => {
                    setReserva({
                            ...reserva,
                            value: value.text,
                            selectedList: value.selectedList
                        });
                    }}
                    arrayList={[...reserva.list]}
                    selectedArrayList={[...reserva.selectedList]}
                    multiEnable={ false }
                    theme={{
                        colors: {
                            primary: 'black'
                        }
                    }}
                />
                <Button mode='contained' onPress={ checkIn }>Salvar</Button>
            </Modal>
        </Portal>
    );
};
const style = StyleSheet.create({
    modalStyle: {
        backgroundColor: 'white', 
        padding: 20,
        width: '70%',
        margin: 'auto',
        gap: 10
    }, 
    titleModalStyle: {
        width: '100%', 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    }
});

export default ModalCheckIn;