import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native'
import React from 'react'

const ChatPage = (props: any) => {
    return (
        <View style={styles.container}>
            {/* <StatusBar
                backgroundColor="transparent"
                barStyle="dark-content"
                translucent
            /> */}
            <TouchableOpacity
                onPress={() => props?.navigation.navigate("ChatView")}
                style={{ paddingVertical: 20, paddingHorizontal: 20, backgroundColor: "#1ac37d", borderRadius: 10 }}>
                <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>ChatGPT</Text>
                <Text style={{ color: "#fff", fontSize: 15, fontWeight: "400", paddingTop: 10 }}>
                    Interact with our flagship language models in a conversational interface
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChatPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        paddingTop: 100, // Add StatusBar's height as padding
        marginHorizontal:20,
        // backgroundColor: 'white', // Set your desired background color
    },
})