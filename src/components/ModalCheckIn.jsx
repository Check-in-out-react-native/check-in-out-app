import { Modal, Button, Portal, Surface, IconButton } from 'react-native-paper';
import { Text } from 'react-native';
import { PaperSelect } from "react-native-paper-select";
import { useEffect, useState } from 'react';
import axios from 'axios';

const modalStyle = {
    backgroundColor: 'white', 
    padding: 20,
    width: '70%',
    margin: 'auto',
    gap: 10
};

const titleModalStyle = {
    width: '100%', 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
};

const ModalCheckIn = ({ mesa_id, setVisible, visible, qtd_lugares }) => {
    const [reserva, setReserva] = useState({
        value: '',
        list: [],
        selectedList: [],
        error: '',
    });

    useEffect(() => {
        axios.post('https://mobile2024.000webhostapp.com/clientes_por_qtd.php', new URLSearchParams({ qtd_lugares }))
            .then(response => {
                const success = response.status === 200;
                if(success) {
                    setReserva({
                        value: '',
                        list: response.data.map(p => ({ _id: p.id_cliente, value: p.nome_cliente })),
                        selectedList: [],
                        error: '',
                      })
                } else {
                }
            });
    }, []);

    const hideModal = () => setVisible(false);

    const checkIn = function () {
        axios.post
    };

    return (
        <Portal>
            <Modal visible={visible} dismissable={false} contentContainerStyle={modalStyle}>
                <Surface elevation={0}  style={ titleModalStyle }>
                    <Text style={{ fontSize: 20 }}>Check-in mesa { mesa_id }</Text>
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