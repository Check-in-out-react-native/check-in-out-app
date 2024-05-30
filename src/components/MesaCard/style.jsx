import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    card: {
        width: "48%" 
    },
    avatar: {
        backgroundColor: null,
        fontSize: 10
    },
    title: {
        titleRightStyle: {
            position: "absolute", 
            top: 7, 
            right: 2
        },
        subtitleStyle: {
            fontWeight: 100
        },
        titleStyle: {
            fontSize: 20,
            fontWeight: 500
        }
    }
});