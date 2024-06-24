import React from 'react';
import {View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import MesaDetalheScreen from '../../screens/MesaDetalhesScreen';

export default function Example({refRBSheet}) {
  return (
    <View style={{flex: 1}}>
      <RBSheet
        ref={refRBSheet}
        useNativeDriver={true}
        draggable={true}
        height={200}
        customStyles={{
          wrapper: {
            backgroundColor: '#0000006d'
          },
          draggableIcon: {
            backgroundColor: '#000'
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
          collapsable: true
        }}
        customAvoidingViewProps={{
          enabled: true
        }}>
        <MesaDetalheScreen/>
      </RBSheet>
    </View>
  );
}