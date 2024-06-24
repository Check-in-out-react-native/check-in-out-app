import { style } from './style';
import { Modal, Button, Portal, Surface, IconButton } from 'react-native-paper';
import { Text } from 'react-native';
import { PaperSelect } from "react-native-paper-select";
import { useContext, useEffect, useState } from 'react';
import { fetchCheckinCliente } from '../../services';
import { PrincipalContext } from '../../context/PrincipalProvider';

const ModalCheckIn = () => {
    const { 
        principal, 
        setPrincipal, 
        setNotificacao, 
        esperaCheckin,
        modalCheckin,
        setModalCheckin 
    } = useContext(PrincipalContext);
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

    const hideModal = () => setModalCheckin({visivel: false});

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
            <Modal visible={modalCheckin?.visivel} dismissable={false} contentContainerStyle={style.modalStyle}>
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

export default ModalCheckIn;