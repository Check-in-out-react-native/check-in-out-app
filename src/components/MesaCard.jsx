import { Card, Text } from "react-native-paper";
import { Avatar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MesaCard = ({ mesa }) => {
    const { id_mesa, qtd_lugares, reserva: reservada } = mesa;
    const navigation = useNavigation();
    const status = reservada ? 'Reservada' : 'Disponível'
    
    const RightContent = () => <Avatar.Icon icon="checkbox-blank-circle" color={ reservada ? 'red' : 'green' } size={30} style={ style.avatar }/>
    const mesaDetalhe = () => navigation.navigate('MesaDetalhe', { id_mesa, reserva: reservada, qtd_lugares });

    return (
        <Card style={ style.card } onPress={mesaDetalhe}>
            <Card.Title 
                title={ `Mesa ${id_mesa}` }
                titleStyle={ style.title.titleStyle } 
                subtitle={ status } 
                subtitleStyle={ style.title.subtitleStyle } 
                rightStyle={ style.title.titleRightStyle } 
                right={RightContent}
            />
            <Card.Content>
                <Text variant="labelSmall">{`Lugares: ${qtd_lugares}`}</Text>
            </Card.Content>
        </Card>
    );
};

const style = StyleSheet.create({
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

export default MesaCard;