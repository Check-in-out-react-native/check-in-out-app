import React from 'react';
import { Card, Text, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { style } from "./style";

const MesaCard = ({ mesa }) => {
    const { id_mesa, qtd_lugares, reserva: reservada } = mesa;
    const navigation = useNavigation();
    const status = reservada ? 'Reservada' : 'Disponível';

    const RightContent = () => (
        <Avatar.Icon
            icon="checkbox-blank-circle"
            color={reservada ? 'red' : 'green'}
            size={30}
            style={style.avatar}
        />
    );

    const mesaDetalhe = () => navigation.navigate('MesaDetalhe', { id_mesa, reserva: reservada, qtd_lugares });

    return (
        <Card style={style.card} onPress={mesaDetalhe}>
            <Card.Title
                title={`Mesa ${id_mesa}`}
                titleStyle={style.title.titleStyle}
                subtitle={status}
                subtitleStyle={style.title.subtitleStyle}
                rightStyle={style.title.titleRightStyle}
                right={RightContent}
            />
            <Card.Content>
                <Text variant="labelSmall">{`Lugares: ${qtd_lugares}`}</Text>
            </Card.Content>
        </Card>
    );
};

export default MesaCard;