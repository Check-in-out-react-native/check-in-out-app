import { style } from './style';
import React, { useEffect, useState, useContext } from 'react';
import { Text } from 'react-native';
import { Avatar, Surface, Button } from 'react-native-paper';
import ModalCheckIn from '../../components/ModalCheckin/index';
import { PrincipalContext } from '../../context/PrincipalProvider';
import { fetchCheckOut, fetchClientePorQtd } from '../../services';

const MesaDetalheScreen = ( route ) => {
  const [visible, setVisible] = useState(false);
  const { 
    principal, 
    setPrincipal, 
    setNotificacao,
    setEsperaCheckin 
  } = useContext(PrincipalContext);

  const showModal = () => setVisible(true);

  const fazerCheckin = () => {
    fetchClientePorQtd({ qtd_lugares: principal.mesaEdit.qtd_lugares }, (data) => {
      if (data.length) {
        setEsperaCheckin(data);
        showModal(data);
      } else {
        alert('Não há clientes na fila de espera!');
      }
    });
  };

  const fazerCheckout = () => {
    const dto = {
      id_mesa: principal.mesaEdit.id_mesa
    };
  
    fetchCheckOut(dto, () => {
      setNotificacao({
        msg: 'Check out realizado com sucesso!',
        success: true,
        visible: true
      });

      setPrincipal((prev) => ({...prev, mesaEdit: { ...prev.mesaEdit, reserva: 0 } }));
    });
  };

  useEffect(() => {
    setPrincipal(prev => ({...prev, mesaEdit: route.route.params}));
  }, []);

  return (
    <Surface elevation={ 0 } style={{ gap: 30, margin: 30 }}>
      <Surface style={ style.surface } elevation={ 0 }>
        <Text >
          Status { principal.mesaEdit.reserva ? 'reservada' : 'disponível' }
        </Text>
        <Avatar.Icon icon="checkbox-blank-circle" color={ principal.mesaEdit.reserva ? 'red' : 'green' } size={ 30 } style={ style.avatar }/>
      </Surface>

      <Surface style={ style.surface } elevation={ 0 }>
        <Text>Quantidade de lugares: { principal.mesaEdit.qtd_lugares }</Text> 
      </Surface>

      { 
        !principal.mesaEdit.reserva ? 
          <Button mode='contained' style={{width: 200}} onPress={ fazerCheckin }>Check-in</Button>
          :
          <Button mode='contained' style={{width: 200}} onPress={ fazerCheckout }>Check-out</Button> }

      <ModalCheckIn setVisible={ setVisible } visible={ visible } />
    </Surface>
  );
};

export default MesaDetalheScreen;
