
import { style } from './style';
import { validateNome, validateQntdPessoas } from './validation';
import { Modal, Button, Portal, Surface, IconButton, TextInput } from 'react-native-paper';
import { Text } from 'react-native';
import { useState, useContext } from 'react';
import { fetchEnviarClienteFila } from '../../services';
import { PrincipalContext } from '../../context/PrincipalProvider';

const ModalEspera = ({ setVisible, visible }) => {
  const { setNotificacao, setPrincipal } = useContext(PrincipalContext);
  const [qntdPessoas, setQntdPessoas] = useState(0);
  const [nome, setNome] = useState('');
  const [errors, setErrors] = useState({});

  const hideModal = () => {
    setNome('');
    setErrors({});
    setQntdPessoas(0);
    setVisible(false);
  };

  const cadastrarEspera = () => {
    const nomeError = validateNome(nome);
    const qntdPessoasError = validateQntdPessoas(qntdPessoas);

    if (nomeError || qntdPessoasError) {
      setErrors({ nome: nomeError, qntdPessoas: qntdPessoasError });
      return;
    }

    const dto = {
      nome_cliente: nome,
      qtd_pessoas: qntdPessoas
    };

    const cbSuccess = (data) => {
      setPrincipal((prev) => ({
       ...prev,
        espera: [...prev.espera, { nome_cliente: nome, id_cliente: data.id_cliente }]
      }));

      hideModal();

      setNotificacao({
        visible: true,
        success: true,
        msg: 'Espera salva com sucesso!'
      });
    };
    const cbError = () => {
      setNotificacao({
        visible: true,
        success: false,
        msg: 'Não foi possível salvar espera!'
      });
      hideModal();
    };

    fetchEnviarClienteFila(dto, cbSuccess, cbError);
  };

  return (
    <Portal>
      <Modal visible={visible} dismissable={false} contentContainerStyle={style.modalStyle}>
        <Surface elevation={0} style={style.titleModalStyle}>
          <Text style={{ fontSize: 20 }}>Cadastro de espera</Text>
          <IconButton icon="close" onPress={hideModal} style={{ width: 20 }} />
        </Surface>
        <TextInput
          label="Nome"
          value={nome}
          onChangeText={(text) => setNome(text)}
          error={errors?.nome}
        />
        {errors?.nome && <Text style={{ color: '#ac0000' }}>{errors?.nome}</Text>}
        <TextInput
          label="Quantidade de pessoas"
          value={qntdPessoas}
          keyboardType="number-pad"
          onChangeText={(text) => setQntdPessoas(text)}
          error={errors?.qntdPessoas}
        />
        {errors?.qntdPessoas && <Text style={{ color: '#ac0000' }}>{errors?.qntdPessoas}</Text>}
        <Button mode="contained" onPress={cadastrarEspera}>Salvar</Button>
      </Modal>
    </Portal>
  );
};

export default ModalEspera;