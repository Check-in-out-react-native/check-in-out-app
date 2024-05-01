import { View, StyleSheet } from "react-native-web";
import MesaCard from "../components/MesaCard";

const style = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: "wrap",
        gap: 10,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 10,
        width: '90%'
    }
});

export function MesaScreen() {
    return (
        <View style={ style.view }>
            {/* <Text>Não há mesas a serem exibidas</Text> */}
            <MesaCard/>
        </View>
    )
}