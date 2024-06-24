import React from 'react';
import { Card, Text, Avatar } from 'react-native-paper';
import { style } from "./style";

const MesaCard = ({ mesa, abrirBottomSheet }) => {
    const { id_mesa, qtd_lugares, reserva: reservada } = mesa;
    const status = reservada ? 'Reservada' : 'Disponível';

    const RightContent = () => (
        <Avatar.Icon
            icon="checkbox-blank-circle"
            color={reservada ? 'red' : 'green'}
            size={30}
            style={style.avatar}
        />
    );

    return (
        <Card style={style.card} onPress={() => abrirBottomSheet(mesa)}>
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