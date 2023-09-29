import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Feather';


const ChatBubble = ({ message, isUser }: any) => {

    const copyToClipboard = () => {
        Clipboard.setString(message);
    };

    return (
        <View style={[styles.container, isUser ? styles.userBubble : styles.otherBubble]}>

            {
                message.toLowerCase().includes('https://') ?
                    <Image
                        source={{ uri: message }}
                        style={styles.imageStyle}
                    />
                    :
                    <View>
                        <Text style={styles.messageText}>{message}</Text>
                        {
                            !isUser ?
                                <TouchableOpacity onPress={copyToClipboard} style={{ alignSelf: "flex-end", paddingTop: 6 }}>
                                    <Icon name="copy" size={22} color="darkgrey" />
                                </TouchableOpacity>
                                :
                                null
                        }
                    </View>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    userBubble: {
        borderTopRightRadius: 0,
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    otherBubble: {
        borderTopLeftRadius: 0,
        alignSelf: 'flex-start',
        backgroundColor: '#E5E5EA',
    },
    messageText: {
        fontSize: 16,
        color: '#000',
    },
    imageStyle: {
        height: 150,
        width: 150,
        borderRadius: 10,
    },
    copyImageStyle: {
        height: 20,
        width: 20,
        alignSelf: "flex-end",
        marginTop: 10
    }
});

export default ChatBubble;
