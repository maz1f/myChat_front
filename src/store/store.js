import {createStore} from "vuex";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

export const store = createStore({
    state: () =>({
        messages: [],
        notifications: [],
        isAuth: Boolean,
        name: String,
        chats: [],
        stompClient: null
    }),
    mutations: {
        setMessages: (state, messages) => {
            state.messages = messages;
        },
        addMessage: (state, message) => {
            state.messages.push(message);
        },
        setNotifications: (state, notifications) => {
            state.notifications = notifications;
        },
        addNotification: (state, notification) => {
            state.notifications.push(notification);
        },
        setAuth: (state, auth) => {
            state.isAuth = auth;
        },
        setName: (state, name) => {
            state.name = name;
        },
        setChats: (state, chats) => {
            state.chats = chats;
        },
        openWebSocketConnection: (state) => {
            const socket = new SockJS("http://localhost:5050/ws");
            state.stompClient = Stomp.over(socket);
            state.stompClient.connect(
                {
                    Authorization: `Bearer ${localStorage.access_token}`
                },
                frame => {
                    state.stompClient.subscribe(`/topic/${state.name}/messages`, msg => {
                        const response = JSON.parse(msg.body);
                        store.commit('setMessages', response.messages);
                        store.commit('setNotifications', response.notifications);
                    });
                    console.log('Web socket opened successfully!');
                },error => {
                    console.log(error);
                }
            );
            state.stompClient.debug = () => {}; // disable websocket logs
        },
        closeWebSocketConnection: (state) => {
            if (state.stompClient !== null) {
                state.stompClient.disconnect();
            }
            console.log("Disconnected");
        }

    },
    actions: {
        setMessages: (context, messages) => {
            context.commit('setMessages', messages);
        },
        addMessage: (context, message) => {
            context.commit('addMessage', message);
        },
        setNotifications: (context, notifications) => {
            context.commit('setNotifications', notifications);
        },
        addNotification: (context, notification) => {
            context.commit('addNotification', notification);
        },
        setAuth: (context, auth) => {
            context.commit('setAuth', auth);
        },
        setName: (context, name) => {
            context.commit('setName', name);
        },
        setChats: (context, chats) => {
            context.commit('setChats', chats);
        },
        openWebSocketConnection: (context) => {
            context.commit('openWebSocketConnection');
        },
        closeWebSocketConnection: (context) => {
            context.commit('closeWebSocketConnection');
        }
    }
})