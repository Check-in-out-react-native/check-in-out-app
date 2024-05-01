import { Card, Text } from "react-native-paper";
import { Button, Avatar } from "react-native-paper";
import { StyleSheet, View } from "react-native";

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

export default function MesaCard () {
    const RightContent = (props) => <Avatar.Icon icon="checkbox-blank-circle" color="green" size={30} style={ style.avatar}/>

    return (
        <Card style={ style.card }>
            <Card.Title 
                title="Mesa 1" 
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

