import {createStore} from "vuex";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import * as bootstrap from "bootstrap";

export const store = createStore({
    state: () =>({
        messages: [],
        lastNotifications: '',
        isAuth: Boolean,
        name: String,
        chats: [],
        stompClient: null,
        notificationsDiv: null,
        notificationsCollapse: null
    }),
    mutations: {
        setMessages: (state, messages) => {
            state.messages = messages;
        },
        addMessage: (state, message) => {
            state.messages.push(message);
        },
        setLastNotification: (state, notification) => {
            state.lastNotifications = notification;
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
                        if (response.messages)
                            store.commit('setMessages', response.messages);
                        if (response.notification) {
                            store.commit('setLastNotification', response.notification);
                            if (!state.notificationsDiv.classList.contains('show')) {
                                state.notificationsCollapse.toggle();
                            }
                            store.commit('increaseNewMessage', response.sender);
                        }
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
        },
        setNotifications: (state, notifications) => {
            state.notificationsDiv = notifications;
            state.notificationsCollapse = new bootstrap.Collapse(state.notificationsDiv, {toggle: false});
        },
        increaseNewMessage: (state, username) => {
            store.state.chats.find(chat => chat.username === username).numberOfNewMessages++;
        }

    },
    actions: {
        setMessages: (context, messages) => {
            context.commit('setMessages', messages);
        },
        addMessage: (context, message) => {
            context.commit('addMessage', message);
        },
        setLastNotification: (context, notification) => {
            context.commit('setLastNotification', notification);
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
        },
        setNotifications: (context, notifications) => {
            context.commit('setNotifications', notifications);
        },
        increaseNewMessage: (context, username) => {
            context.commit('increaseNewMessage', username);
        }
    }
})