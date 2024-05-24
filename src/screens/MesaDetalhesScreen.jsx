import React, { useState } from 'react';
import { Text } from 'react-native';
import { Avatar, Surface, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import ModalCheckIn from '../components/ModalCheckIn';

const MesaDetalheScreen = ( route ) => {
  const { id_mesa, reserva, qtd_lugares } = route.route.params;
  const [visible, setVisible] = useState(false);
  const [clienteId, setClienteId] = useState(null);

  const showModal = () => setVisible(true);
  const fazerCheckout = () => {
  const dto = {
      id_cliente: clienteId,
      id_mesa: id_mesa
    };
    axios.post('https://mobile2024.000webhostapp.com/fazer_checkout.php', dto)
      .then(response => {
        setLoading(false);
        setClienteId(response.data)

        if (response.status === 200) {
          console.log('Check-out realizado com sucesso');
        } else {
          console.error(`Erro ${response.status}: ${response.statusText}`);
        }
      })
      .catch(error => {
        setLoading(false);
        console.error('Erro ao fazer o check-out:', error);
      });
  }
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
  
  return (
    <Surface elevation={ 0 } style={{ gap: 30 }}>
      <Surface style={ style.surface } elevation={ 0 }>
        <Text >
          Status { reserva ? 'reserva' : 'Ocupada' }
        </Text>
        <Avatar.Icon icon="checkbox-blank-circle" color={ !reserva ? 'green' : 'red' } size={ 30 } style={ style.avatar }/>
      </Surface>

      <Surface style={ style.surface } elevation={ 0 }>
        <Text>Quantidade de lugares: { qtd_lugares }</Text> 
      </Surface>

      { 
        !reserva ? 
          <Button mode='contained' style={{width: 200}} onPress={ showModal }>Check-in</Button>
           : <Button mode='contained' style={{width: 200}} onPress={ fazerCheckout }>Check-out</Button> }

      <ModalCheckIn setVisible={ setVisible } visible={ visible } id_mesa={ id_mesa } qtd_lugares={qtd_lugares}/>
    </Surface>
  );
};

export default MesaDetalheScreen;
