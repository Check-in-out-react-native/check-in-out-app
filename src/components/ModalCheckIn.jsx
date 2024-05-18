import { Modal, Button, Portal, Surface, IconButton } from 'react-native-paper';
import { Text } from 'react-native';
import { PaperSelect } from "react-native-paper-select";
import { useState } from 'react';

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

const ModalCheckIn = ({ mesa_id, setVisible, visible }) => {
    const [reserva, setReserva] = useState({
        value: '',
        list: [
          { _id: '1', value: 'Lucas' },
          { _id: '2', value: 'Gustavo' },
          { _id: '3', value: 'Vinicius' },
          { _id: '4', value: 'Tiago' }
        ],
        selectedList: [],
        error: '',
      });

    const hideModal = () => setVisible(false);
    const checkIn = function () {
        alert()
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