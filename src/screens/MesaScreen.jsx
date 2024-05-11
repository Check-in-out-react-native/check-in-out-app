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
//colocar scroll
export function MesaScreen() {
    return (
        <View style={ style.view }>
            {[1,2,3,4,5, 6, 7, 8, 9, 10, 11].map(p => <MesaCard idMesa={p} key={p}/>)} 
        </View>
    )
}