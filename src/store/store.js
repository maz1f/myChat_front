import {createStore} from "vuex";

export const store = createStore({
    state: () =>({
        messages: []
    }),
    mutations: {
        setMessages: (state, messages) => {
            state.messages = messages;
        }

    },
    actions: {
        setMessages: (context, messages) => {
            context.commit('setMessages', messages);
        }
    }
})