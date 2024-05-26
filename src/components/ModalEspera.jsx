import { Modal, Button, Portal, Surface, IconButton, TextInput, Icon } from 'react-native-paper';
import { Text } from 'react-native';
import { useState } from 'react';
import { fetchEnviarClienteFila } from '../services';
import { PrincipalContext } from '../context/PrincipalProvider';
import { useContext } from 'react';

const ModalEspera = ({setVisible, visible}) => {
    const {setNotificacao, setPrincipal} = useContext(PrincipalContext);
    const [qntdPessoas, setQntdPessoas] = useState(0);
    const [nome, setNome] = useState('');

    const hideModal = () => setVisible(false);

    const cadastrarEspera = () => {
        const dto = {
            nome_cliente: nome,
            qtd_pessoas: qntdPessoas
        };

        const cb = (data) => { 
            setPrincipal((prev) => ({
                ...prev, 
                espera: [...prev.espera, { nome_cliente: nome, id_cliente: data.id_cliente }] 
            }));
        
            setNotificacao({ 
                visible: true,
                success: true, 
                msg: 'Espera salva com sucesso!' 
            });
        };

        fetchEnviarClienteFila(dto, cb);
    };

    return (
        <Portal>
            <Modal visible={visible} dismissable={false} contentContainerStyle={modalStyle}>
                <Surface elevation={0}  style={ titleModalStyle }>
                    <Text style={{ fontSize: 20 }}>Cadastro de espera</Text>
                    <IconButton icon="close" onPress={ hideModal } style={{ width: 20 }} />
                </Surface>
                <TextInput label='Nome' onChangeText={(text) => setNome(text)}/>
                <TextInput label='Quantidade de pessoas' onChangeText={(text) => setQntdPessoas(text)}/>
                <Button mode='contained' onPress={ cadastrarEspera }>Salvar</Button>
            </Modal>
        </Portal>
    );
};

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

export default ModalEspera;