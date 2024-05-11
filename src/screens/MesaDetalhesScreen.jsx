import React, { useState } from 'react';
import { Text } from 'react-native';
import { Avatar, Surface, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native-web';
import ModalCheckIn from '../components/ModalCheckIn';

const MesaDetalheScreen = (route) => {
  const mesa = route.route.params;
  const [visible, setVisible] = useState(false);
  const liberada = mesa.status === 0;

  const showModal = () => setVisible(true);

  const style = StyleSheet.create({
    avatar: {
        backgroundColor: null,
        color: 'green',
        fontSize: 10
    },
    surface: {
      display: 'flex', 
      flexDirection: 'row', 
      alignItems: 'center'
    }
  });
  
  return (
    <Surface elevation={0} style={{gap: 30}}>
      <Surface style={style.surface} elevation={0}>
        <Text >
          Status { liberada ? 'Liberada' : 'Ocupada'}
        </Text>
        <Avatar.Icon icon="checkbox-blank-circle" color={liberada ? 'green' : 'red' } size={30} style={ style.avatar }/>
      </Surface>
      <Surface style={style.surface} elevation={0}>
        <Text>Quantidade de lugares: {mesa.qntd}</Text> 
      </Surface>

      {liberada ? <Button mode='contained' style={{width: 200}} onPress={showModal}>Check-in</Button> : <></>}

      <ModalCheckIn setVisible={setVisible} visible={visible} mesa={mesa}/>
    </Surface>
  );
};

export default MesaDetalheScreen;
