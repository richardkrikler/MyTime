import {createStore} from 'vuex'

export default createStore({
    state: {
        tasks: Array
    },

    mutations: {
        updateTasks(state, tasks) {
            state.tasks = tasks
        },
    },

    actions: {
        async loadTasks(state) {
            await fetch('http://localhost:8090/tasks')
                .then(res => res.json())
                .then(data => state.commit('updateTasks', Object.values(data.results)))
        },

        async updateTaskTime(state, param) {
            await fetch('http://localhost:8090/task/' + param.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(param.when)
            })
        }
    },

    getters: {
        tasks(state) {
            return state.tasks
        }
    }
})
