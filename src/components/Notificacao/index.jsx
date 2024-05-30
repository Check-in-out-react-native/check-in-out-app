import { style } from './style';
import { Banner } from 'react-native-paper';
import {Icon} from 'react-native-paper';
import { PrincipalContext } from '../../context/PrincipalProvider';
import { useContext, useEffect } from 'react';

const Notificacao = () => {
  const { notificacao, setNotificacao } = useContext(PrincipalContext);
  
  useEffect(() => {
    if (notificacao.visible) {
      setTimeout(() => {
        setNotificacao((prev) => ({...prev, visible: false}));
      }, 2500);
    }
  }, [notificacao.visible]);
  
  const icon = () => <Icon source={notificacao.success ? "check-circle" : 'alpha-x-circle'} color={notificacao.success ? 'green' : 'red'} size={20} />;

  return (
    <Banner 
      visible={notificacao.visible} 
      icon={ icon }
      style={style.banner}
    >
      {notificacao.msg}
    </Banner>
  );
};

export default Notificacao;