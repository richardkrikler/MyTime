import {createStore} from 'vuex'

export default createStore({
    state: {
        tasks: []
    },

    getters: {
        tasks(state) {
            return state.tasks
        },

        tasksAtHour: state => hour => {
            return state.tasks.filter(t => {
                if (t.properties['When'].date !== null) {
                    const date = new Date(t.properties['When'].date.start)
                    const offsetMs = date.getTimezoneOffset() * 60 * 1000
                    const msLocal = date.getTime() + offsetMs
                    const dateLocal = new Date(msLocal)

                    return dateLocal.getHours() === 0 ? 24 === hour : dateLocal.getHours() === hour
                }
            })
        },

        unassignedTasks(state) {
            return state.tasks.filter(t => t.properties['When'].date === null)
        },

        taskPosFromId: state => id => {
            return state.tasks.findIndex(t => t.id === id)
        },

        isDateDifferent: state => (taskPos, date) => {
            return JSON.stringify(date) !== JSON.stringify(state.tasks[taskPos].properties['When'].date)
        }
    },

    mutations: {
        updateTasks(state, tasks) {
            state.tasks = tasks
        },

        updateTaskDate(state, {taskPos, date}) {
            state.tasks[taskPos].properties['When'].date = date
        },
    },

    actions: {
        async loadTasks(state) {
            await fetch('http://localhost:8090/tasks')
                .then(res => res.json())
                .then(data => state.commit('updateTasks', Object.values(data.results)))
        },

        async updateTaskDate({getters, commit}, {id, date}) {
            const taskPos = getters.taskPosFromId(id)
            if (taskPos < 0 || getters.isDateDifferent(taskPos, date)) {
                commit('updateTaskDate', {taskPos, date})
                await fetch('http://localhost:8090/task/' + id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({notionDate: date})
                })
            }

        }
    }
})
