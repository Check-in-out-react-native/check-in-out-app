import { Modal, Button, Portal, Surface, IconButton } from 'react-native-paper';
import { Text } from 'react-native';
import { PaperSelect } from "react-native-paper-select";
import { useContext, useEffect, useState } from 'react';
import { fetchCheckinCliente, fetchClientePorQtd } from '../services';
import { StyleSheet } from 'react-native-web';
import { PrincipalContext } from '../context/PrincipalProvider';

const ModalCheckIn = ({setVisible, visible}) => {
    const { principal, setPrincipa } = useContext(PrincipalContext);
    const [reserva, setReserva] = useState({
        value: '',
        list: [],
        selectedList: [],
        error: '',
    });

    useEffect(() => {
        fetchClientePorQtd({ qtd_lugares: principal.mesaEdit.qtd_lugares }, (data) => {
            setReserva({
                value: '',
                list: data?.map(p => ({ _id: p.id_cliente, value: p.nome_cliente })),
                selectedList: [],
                error: '',
            })
        });
    }, [principal.mesaEdit.id_mesa]);

    const hideModal = () => setVisible(false);

    const checkIn = () => {
        fetchCheckinCliente({
            id_cliente: reserva.selectedList[0]._id,
            id_mesa: principal.mesaEdit.id_mesa
        }, () => setVisible(false));
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