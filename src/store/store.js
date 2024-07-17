import {createStore} from "vuex";

export const store = createStore({
    state: () =>({
        messages: []
    }),
    mutations: {
        setMessages: (state, messages) => {
            state.messages = messages;
        },
        addMessage: (state, message) => {
            state.messages.push(message);
        }

    },
    actions: {
        setMessages: (context, messages) => {
            context.commit('setMessages', messages);
        },
        addMessage: (context, message) => {
            context.commit('addMessage', message);
        }
    }
})