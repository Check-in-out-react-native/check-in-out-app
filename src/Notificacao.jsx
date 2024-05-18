import * as React from 'react';
import { Banner } from 'react-native-paper';
import {Icon} from 'react-native-paper';

const Notificacao = ({visible, msg, children}) => {
  return (
    <Banner 
      visible={visible} 
      icon={ () => children }>
      {msg}
    </Banner>
  );
};

export default Notificacao;