
import { style } from './style';
import { validateQntdLugares } from './validation';
import { Modal, Button, Portal, Surface, IconButton, TextInput } from 'react-native-paper';
import { Text } from 'react-native';
import { useState, useContext } from 'react';
import { fetchAdicionaMesa } from '../../services';
import { PrincipalContext } from '../../context/PrincipalProvider';

const ModalMesa = ({ setVisible, visible }) => {
  const { setNotificacao, setPrincipal } = useContext(PrincipalContext);
  const [qntdLugares, setQntdLugares] = useState(0);
  const [errors, setErrors] = useState({});

  const hideModal = () => {
    setErrors({});
    setQntdLugares(0);
    setVisible(false);
  };

  const cadastrarMesa = () => {
    const qntdLugaresError = validateQntdLugares(qntdLugares);


    if (qntdLugaresError) {
      setErrors({ qntdLugares: qntdLugaresError });
      return;
    }

    const dto = {
      qtd_lugares: parseInt(qntdLugares),
    };

    const cbSuccess = (data) => {
      const novaMesa = {
        qtd_lugares: dto.qtd_lugares,

      };

      setPrincipal(prev => ({
        ...prev,
        mesas: [...prev.mesas, novaMesa]
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

    fetchAdicionaMesa(dto, cbSuccess, cbError);
  };

  return (
    <Portal>
      <Modal visible={visible} dismissable={false} contentContainerStyle={style.modalStyle}>
        <Surface elevation={0} style={style.titleModalStyle}>
          <Text style={{ fontSize: 20 }}>Cadastro de mesa</Text>
          <IconButton icon="close" onPress={hideModal} style={{ width: 20 }} />
        </Surface>

        <TextInput
          label="Quantidade de lugares"
          value={qntdLugares}
          keyboardType="number-pad"
          onChangeText={(text) => setQntdLugares(text)}
          error={errors?.qntdLugares}
        />
        {errors?.qntdLugares && <Text style={{ color: '#ac0000' }}>{errors?.qntdLugares}</Text>}
        <Button mode="contained" onPress={cadastrarMesa}>Salvar</Button>
      </Modal>
    </Portal>
  );
};

export default ModalMesa;