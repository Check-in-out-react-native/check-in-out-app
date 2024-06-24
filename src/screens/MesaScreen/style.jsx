import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
    view: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        width: '90%'
    },
    whiteOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
