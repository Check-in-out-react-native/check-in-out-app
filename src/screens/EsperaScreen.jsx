import { View } from "react-native";
import {  List } from "react-native-paper";

export function EsperaScreen() {
    // const TrashIcon = () => <List.Icon icon="trash" />;
    return (
        <View>
            <List.Section>
                <List.Subheader style={{fontSize: 25, display: 'flex', gap: 10, alignItems: 'center'}}>
                    Adicionar reserva 
                    {/* <Icon size={35} source='plus-circle'></Icon> */}
                </List.Subheader>
                <List.Item title="Lucas"/*  right={TrashIcon} */ />
            </List.Section>
        </View>
    )
}