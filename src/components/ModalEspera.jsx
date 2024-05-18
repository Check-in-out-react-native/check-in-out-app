import { Modal, Button, Portal, Surface, IconButton, TextInput, Icon } from 'react-native-paper';
import { Text } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import Notificacao from '../Notificacao';

const ModalEspera = ({setVisible, visible}) => {
    const [notificar, setNotificar] = useState(false);
    const [msg, setMsg] = useState('');
    const [qntdPessoas, setQntdPessoas] = useState(0);
    const [nome, setNome] = useState('');
    const [success, setSuccess] = useState(false);

    const hideModal = () => setVisible(false);

    const cadastrarEspera = () => {
        const dto = {
            nome_cliente: nome,
            qtd_pessoas: qntdPessoas
        };

        axios.post('https://mobile2024.000webhostapp.com/enviar_cliente_fila.php',  new URLSearchParams(dto))
            .then(response => {
                const success = response.status === 200;
                if(success) {
                    setMsg('Espera salva com sucesso!');
                    setSuccess(success);
                    setNotificar(true);
                    setTimeout(() => {
                        setNotificar(false);
                    }, 2000);
                } else {
                    setSuccess(success);
                    setMsg('Não foi possível salvar.');
                    setNotificar(true);
                    setTimeout(() => {
                        setNotificar(false);
                    }, 2000);
                }
            });
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
                <Button mode='contained' onPress={ () => cadastrarEspera() }>Salvar</Button>
            </Modal>
            <Notificacao visible={ notificar } msg={msg}>
                <Icon source={success ? "check-circle" : 'alpha-x-circle'} color={success ? 'green' : 'red'} size={20} />
            </Notificacao>
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