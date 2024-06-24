import { style } from "./style";
import { View, ActivityIndicator, ScrollView } from "react-native";
import { List, IconButton, Surface } from "react-native-paper";
import MesaCard from "../../components/MesaCard";
import ModalMesa from "../../components/ModalMesa/index";
import { useContext, useEffect, useState, useRef } from "react";
import { PrincipalContext } from "../../context/PrincipalProvider";
import { fetchMesas, fetchExcluirMesa } from "../../services";
import BottomSheetMesa from "../../components/BottomSheet";
import ModalCheckIn from '../../components/ModalCheckin'
const MesaScreen = () => {
    const [visible, setVisible] = useState(false);
    const { principal, setPrincipal } = useContext(PrincipalContext);
    const [loading, setLoading] = useState(true);
    const refRBSheet = useRef();

    const showModal = () => setVisible(true);

    useEffect(() => {
        setLoading(true);
        fetchMesas((data) => {
            setLoading(false);
            setPrincipal({ ...principal, mesas: data });
        });
    }, [principal.mesaEdit]);

    const abrirBottomSheet = (mesaModal) => {
        setPrincipal(prev => ({...prev, mesaEdit: mesaModal}));
        setTimeout(() => {
            refRBSheet.current.open();
        }, 200)
    };

    return (
        <>
            {
                loading ?
                    <ActivityIndicator style={{ display: 'flex', margin: 'auto', height: '100%'}} animating={loading} color='orange' size='large' />
                :(
                    <>
                        <ScrollView contentContainerStyle={style.scrollViewContent}>
                        <View style={style.view}>
                            <ModalMesa setVisible={setVisible} visible={visible} />
                                <List.Section style={{ width: '100%' }}>
                                    <List.Item
                                        key={999}
                                        title={'Nova Mesa'}
                                        right={() => <IconButton size={25} style={{ height: 25 }} icon='plus-circle' iconColor="green" onPress={showModal} />}
                                        style={{ display: 'flex', width: '100%' }}
                                    />
                                </List.Section>
                            {principal.mesas && principal.mesas.map((p, key) => (
                                <MesaCard abrirBottomSheet={abrirBottomSheet} mesa={p} key={key} />
                            ))}
                        </View>
                    </ScrollView>
                    </>
                )
            }
            <ModalCheckIn />
            {
                principal.mesaEdit && <BottomSheetMesa refRBSheet={refRBSheet} />
            }            
        </>
    );
};

export { MesaScreen };