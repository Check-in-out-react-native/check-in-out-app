import { Card, Text, TouchableRipple } from "react-native-paper";
import { Avatar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const style = StyleSheet.create({
    card: {
        width: "48%" 
    },
    avatar: {
        backgroundColor: null,
        color: 'green',
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


export default function MesaCard ({idMesa}) {   
    const navigation = useNavigation();
    const RightContent = (props) => <Avatar.Icon icon="checkbox-blank-circle" color="green" size={30} style={ style.avatar }/>

    const mesa = () => {
        navigation.navigate('MesaDetalhe', {
            mesaId: idMesa,
            status: 0,
            qntd: 5
        });
    };

    return (
        <Card style={ style.card } onPress={mesa}>
            <Card.Title 
                title={ `Mesa ${idMesa}` }
                titleStyle={ style.title.titleStyle } 
                subtitle="Disponível" 
                subtitleStyle={ style.title.subtitleStyle } 
                rightStyle={ style.title.titleRightStyle } 
                right={RightContent}
            />
            <Card.Content>
                <Text variant="labelSmall">2 lugares</Text>
            </Card.Content>
        </Card>
    );
}

