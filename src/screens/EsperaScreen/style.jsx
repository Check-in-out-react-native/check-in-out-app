import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: "wrap",
        gap: 10,
        marginTop: 10,
        width: '100%'
    },
    whiteOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'      
     }
});