import { style } from './style';
import React, { useState, useContext } from 'react';
import { Text } from 'react-native';
import { Avatar, Surface, Button } from 'react-native-paper';
import { PrincipalContext } from '../../context/PrincipalProvider';
import { fetchCheckOut, fetchClientePorQtd } from '../../services';

const MesaDetalheScreen = () => {
  const [visible, setVisible] = useState(false);
  const { 
    principal, 
    setPrincipal, 
    setNotificacao,
    setEsperaCheckin ,
    setModalCheckin 
  } = useContext(PrincipalContext);

  const showModal = () => setModalCheckin({visivel: true});

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

  return (
    <Surface 
      elevation={ 0 } 
      style={{ 
        gap: 10, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: "space-between", 
        height: 'inherit'
      }}>
      <Surface elevation={0} style={{marginLeft: 30}}>
        <Surface style={ style.surface } elevation={ 0 }>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Número: { principal?.mesaEdit?.id_mesa }
          </Text>
        </Surface>
        <Surface style={ style.surface } elevation={ 0 }>
          <Text >
            Status { principal?.mesaEdit?.reserva ? 'reservada' : 'disponível' }
          </Text>
          <Avatar.Icon icon="checkbox-blank-circle" color={ principal?.mesaEdit?.reserva ? 'red' : 'green' } size={ 30 } style={ style.avatar }/>
        </Surface>

        <Surface style={ style.surface } elevation={ 0 }>
          <Text>Quantidade de lugares: { principal?.mesaEdit?.qtd_lugares }</Text> 
        </Surface>
      </Surface>
      <Surface elevation={0} style={{display: 'flex', flexDirection: 'row', marginTop: 10, marginBottom: 'auto', marginLeft: 30, gap: 10}}>
        { 
          !principal.mesaEdit.reserva ? 
          <Button mode='contained' style={{width: 130}} onPress={ fazerCheckin }>Check-in</Button>
          :
          <Button mode='contained' style={{width: 130}} onPress={ fazerCheckout }>Check-out</Button> 
          }
        <Button mode='contained' style={{width: 130}} onPress={ fazerCheckin }>Excluir mesa</Button>
      </Surface>
    </Surface>
  );
};

export default MesaDetalheScreen;
