
import { style } from './style';
import { validateNomeMesa, validateQntdLugares } from './validation';
import { Modal, Button, Portal, Surface, IconButton, TextInput } from 'react-native-paper';
import { Text } from 'react-native';
import { useState, useContext } from 'react';
import { fetchMesas } from '../../services';
import { PrincipalContext } from '../../context/PrincipalProvider';

const ModalMesa = ({ setVisible, visible }) => {
  const { setNotificacao, setPrincipal } = useContext(PrincipalContext);
  const [qntdLugares, setQntdLugares] = useState(0);
  const [nome, setNome] = useState('');
  const [errors, setErrors] = useState({});

  const hideModal = () => {
    setNome('');
    setErrors({});
    setQntdLugares(0);
    setVisible(false);
  };

  const cadastrarMesa = () => {
    const nomeError = validateNomeMesa(nome);
    const qntdLugares = validateQntdLugares(qntdLugares);

    if (nomeError || qntdLugaresError) {
      setErrors({ nome: nomeError, qntdLugares: qntdLugaresError });
      return;
    }

    const dto = {
      nome_mesa: nome,
      qtd_lugares: qntdLugares
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
        msg: 'Mesa salva com sucesso!'
      });
    };
    const cbError = () => {
      setNotificacao({
        visible: true,
        success: false,
        msg: 'Não foi possível salvar mesa!'
      });
      hideModal();
    };

    fetchMesas(dto, cbSuccess, cbError);
  };

  return (
    <Portal>
      <Modal visible={visible} dismissable={false} contentContainerStyle={style.modalStyle}>
        <Surface elevation={0} style={style.titleModalStyle}>
          <Text style={{ fontSize: 20 }}>Cadastro de mesa</Text>
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
          label="Quantidade de lugares"
          value={qntdLugares}
          keyboardType="number-pad"
          onChangeText={(text) => setQntdPessoas(text)}
          error={errors?.qntdLugares}
        />
        {errors?.qntdLugares && <Text style={{ color: '#ac0000' }}>{errors?.qntdLugares}</Text>}
        <Button mode="contained" onPress={cadastrarMesa}>Salvar</Button>
      </Modal>
    </Portal>
  );
};

export default ModalMesa;