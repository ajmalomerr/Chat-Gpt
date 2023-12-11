import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ImageBackground, FlatList, SafeAreaView, Image, Alert, Pressable } from 'react-native';
import ChatBubble from '../Component/ChatBubble';
import axios from 'axios';
import Voice from '@react-native-voice/voice';
import Icon from 'react-native-vector-icons/Feather';

const ChatView = ({ navigation }: any) => {
    const [newMessage, setNewMessage] = useState('');
    const [loader, setLoader] = useState(false);
    const [chats, setChats] = useState<any>([]);
    const [chatBtn, setChatBtn] = useState<boolean>(false);
    const [startRecord, setStartRecord] = useState<boolean>(false);
    // const [time, setTime] = useState<boolean>(false);
    const flatListRef = useRef<any>(null);

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStartHandler;
        Voice.onSpeechEnd = onSpeechEndHandler;
        Voice.onSpeechResults = onSpeechResultsHandler;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        }
    }, []);

    useEffect(() => {
        // navigation.setOptions({ title: 'Chat Boat', headerShown: true, headerMode: "float", })
        if (flatListRef.current) {
            setTimeout(() => {
                flatListRef?.current?.scrollToEnd({ animated: true });
            }, 200);
            setTimeout(() => {
                setChatBtn(false);
            }, 25000)
        }
    }, [chats]);

    const onSpeechStartHandler = () => {
        console.log("speech start handler")
        // setStartRecord(true);
    }

    const onSpeechEndHandler = () => {
        console.log("speech end handler")
        setStartRecord(false);
    }

    const onSpeechResultsHandler = (e: any) => {
        console.log("voice event : ", e)
        setNewMessage(e?.value?.toString());
    }

    const startRecording = async () => {
        setStartRecord(true);
        console.log("started")

        try {
            await Voice.start('en-GB');
        } catch (error) {
            console.log('error', error)
        }

    }

    const stoptRecording = async () => {
        // setStartRecord(true);
        console.log("stopped")
        try {
            await Voice.stop();
        } catch (error) {
            console.log('error', error)
        }

    }


    const apiAuth = axios.create({
        headers: {
            Authorization: 'Bearer "add your key',
            'Content-Type': 'application/json',
        },
    })


    const sendPostRequest = async () => {
        if (newMessage.trim() !== '') {
            await setChats([...chats, { role: "user", content: newMessage }])
            setNewMessage("")
            try {
                const conversation = [...chats, { role: "user", content: newMessage }];

                setLoader(true);
                // const res = await apiAuth.post(
                //     'https://api.openai.com/v1/chat/completions',
                //     {
                //         model: "gpt-3.5-turbo",
                //         messages: [{
                //             role: "user",
                //             content: `Does this message want to generate an AI picture, image, art or anything similar? ${newMessage} . Simply answer with a yes or no.`,
                //         }],

                //     },

                // );
                // let isArt = res?.data?.choices[0]?.message?.content;
                // console.log(isArt)
                // let isArtYes = isArt.trim();
                // if (isArtYes.toLowerCase().includes('yes')) {
                //     console.log('dalle api call');
                //     try {
                //         const res = await apiAuth.post("https://api.openai.com/v1/images/generations", {
                //             prompt: newMessage,
                //             n: 1,
                //             size: "512x512"
                //         },

                //         )

                //         let url = res?.data?.data[0]?.url;
                //         setChatBtn(true)
                //         await setChats([...chats, { role: "user", content: newMessage }, { role: "assistant", content: url }])

                //     } catch (err) {
                //         console.log('error: ', err);
                //     }
                // } else {
                const response = await apiAuth.post(
                    'https://api.openai.com/v1/chat/completions',
                    {
                        model: "gpt-3.5-turbo",
                        messages: conversation.map((message) => ({
                            role: "user",
                            content: message?.content,
                        })),
                    },

                );
                setChatBtn(true)
                await setChats([...chats, { role: "user", content: newMessage }, response.data?.choices[0]?.message])
                // }
                // await setChats([...chats, { role: "user", content: newMessage }, res?.data?.choices[0]?.message])
                setLoader(false)
            } catch (error) {
                console.error('Error making POST request:', error);
            }
        }
    };

    return (
        <ImageBackground
            source={require('../../../assets/whatsapp-bg.jpg')}
            style={styles.backgroundImage}
        >
            <SafeAreaView>
                <FlatList
                    ref={flatListRef}
                    style={{ marginBottom: 40 }}
                    contentContainerStyle={{ padding: 5, paddingBottom: 10 }}
                    data={chats}
                    renderItem={({ item, index }) => {
                        return (
                            <>
                                <ChatBubble message={item?.content} isUser={item.role == "assistant" ? false : true} />
                                {loader && index === chats.length - 1 && (
                                    <Image
                                        source={require('../../../assets/typing.gif')}
                                        style={styles.gifStyle}
                                    />
                                )}
                            </>
                        )
                    }}
                />
            </SafeAreaView>

            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    value={newMessage}
                    onChangeText={(text) => setNewMessage(text)}
                    multiline
                />
                {!chatBtn ? <>
                    {/* <TouchableOpacity style={styles.sendButton} onPress={sendPostRequest}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity> */}
                    <View>
                        {newMessage?.length == 0 ?
                            <Pressable
                                onPressIn={startRecording}
                                onPressOut={stoptRecording}
                            >
                                <Image source={require('../../../assets/recordingIcon.png')}
                                    style={styles.imageStyle}
                                />
                            </Pressable>
                            :
                            <TouchableOpacity style={styles.sendButton} onPress={sendPostRequest}>
                                {/* <Text style={styles.sendButtonText}>Send</Text> */}
                                <Icon name="send" size={22} color="#298a79" />
                            </TouchableOpacity>}
                    </View>
                </> :
                    <Image source={require('../../../assets/loading.gif')}
                        style={styles.imageStyle}
                    />
                }

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        position: 'absolute',
        bottom: 20,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 20,
        // paddingVertical: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 20,
        marginRight: 10,
        height: 40,
        paddingTop: 10
    },
    sendButton: {
        // backgroundColor: '#298a79',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 50,
        height: 40,
        width: 40,
        justifyContent:"center",
        alignItems:"center"
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    imageStyle: {
        height: 40,
        width: 40,
        borderRadius: 50
    },
    gifStyle: {
        height: 35,
        width: 80,
        borderRadius: 10
    }
});

export default ChatView;
