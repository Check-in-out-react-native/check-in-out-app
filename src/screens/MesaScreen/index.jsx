import { style } from "./style";
import { View, ActivityIndicator, ScrollView } from "react-native";
import { List, IconButton } from "react-native-paper";
import MesaCard from "../../components/MesaCard";
import ModalMesa from "../../components/ModalMesa/index";
import { useContext, useEffect, useState, useRef } from "react";
import { PrincipalContext } from "../../context/PrincipalProvider";
import { fetchMesas, fetchExcluirMesa } from "../../services";
import Example from "../../components/BottomSheet";
import ModalCheckIn from '../../components/ModalCheckin'
const MesaScreen = () => {
    const [visible, setVisible] = useState(false);
    const { principal, setPrincipal } = useContext(PrincipalContext);
    const [loading, setLoading] = useState(true);
    const refRBSheet = useRef();

    const showModal = () => setVisible(true);

    const excluirMesa = (id) => {
        const cbSuccess = () => {
            setPrincipal((prev) => ({
                ...prev,
                mesas: prev.mesas.filter(p => p.id_cliente !== id),
            }));
            setNotificacao({
                msg: 'Item excluído com sucesso!',
                success: true,
                visible: true,
            });
        };

        const cbError = () => {
            setNotificacao({
                msg: 'Não foi possível remover a mesa',
                success: false,
                visible: true,
            });
        };

        fetchExcluirMesa({ id_cliente: id }, cbSuccess, cbError);
    };

    useEffect(() => {
        setLoading(true);
        fetchMesas((data) => {
            setLoading(false);
            setPrincipal({ ...principal, mesas: data });
        });
    }, [principal.mesaEdit]);

    const TrashIcon = ({ id }) => <IconButton icon="trash-can" onPress={() => excluirMesa(id)} />;

    const abrirBottomSheet = (mesaModal) => {
        setPrincipal(prev => ({...prev, mesaEdit: mesaModal}));
        refRBSheet.current.open();
    };

    return (
        <>
            <ScrollView contentContainerStyle={loading ? style.whiteOverlay : style.scrollViewContent}>
                <View style={style.view}>
                    <ModalMesa setVisible={setVisible} visible={visible} />
                    {loading ? (
                        <ActivityIndicator animating={loading} color='orange' size='large' />
                    ) : (
                        <List.Section style={{ width: '100%' }}>
                            <List.Item
                                key={999}
                                title={'Nova Mesa'}
                                right={() => <IconButton size={25} style={{ height: 25 }} icon='plus-circle' iconColor="green" onPress={showModal} />}
                                style={{ display: 'flex', width: '100%' }}
                            />
                        </List.Section>
                    )}
                    {principal.mesas && principal.mesas.map((p, key) => (
                        <MesaCard abrirBottomSheet={abrirBottomSheet} mesa={p} key={key} right={() => <TrashIcon id={p.id_cliente} />} />
                    ))}
                </View>
            </ScrollView>
            <ModalCheckIn />
            <Example refRBSheet={refRBSheet} />
        </>
    );
};

export { MesaScreen };