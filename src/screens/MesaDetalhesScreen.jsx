import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Avatar, Surface, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import ModalCheckIn from '../components/ModalCheckIn';
import { useContext } from 'react';
import { PrincipalContext } from '../context/PrincipalProvider';
import { fetchCheckOut } from '../services';

const MesaDetalheScreen = ( route ) => {
  const [visible, setVisible] = useState(false);
  const { principal, setPrincipal, setNotificacao } = useContext(PrincipalContext);

  const showModal = () => setVisible(true);

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
          <Button mode='contained' style={{width: 200}} onPress={ showModal }>Check-in</Button>
          :
          <Button mode='contained' style={{width: 200}} onPress={ fazerCheckout }>Check-out</Button> }

      <ModalCheckIn setVisible={ setVisible } visible={ visible } />
    </Surface>
  );
};

const style = StyleSheet.create({
  avatar: {
      backgroundColor: null,
      fontSize: 10
  },
  surface: {
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center'
  }
});

export default MesaDetalheScreen;
