import {createStore} from "vuex";

export const store = createStore({
    state: () =>({
        sentMessages: [
        ],
        receivedMessages: [
        ]
    }),
    mutations: {
        setSentMessages: (state, messages) => {
            state.sentMessages = messages;
        },
        setReceivedMessages: (state, messages) => {
            state.receivedMessages = messages;
        },
        addSentMessage: (state, message) => {
            state.sentMessages = [
                ...state.sentMessages,
                message
            ]
        },
        addReceivedMessage: (state, message) => {
            state.receivedMessages = [
                ...state.receivedMessages,
                message
            ]
        }

    },
    actions: {
        setSentMessages: (context, messages) => {
            context.commit('setSentMessages', messages);
        },
        setReceivedMessages: (context, messages) => {
            context.commit('setReceivedMessages', messages);
        },
        addSentMessage: (context, message) => {
            context.commit('addSentMessage', message);
        },
        addReceivedMessage: (context, message) => {
            context.commit('setReceivedMessages', message);
        }
    }
})