import {createStore} from 'vuex'
import {Client} from '@notionhq/client'

export default createStore({
    state: {
        tasks: Array
    },
    mutations: {
        loadTasks() {
            console.log('ll')

            /**
             * Notion: Schule: Aufgaben -> 'Today' == true & Sorted by 'Fällig am' & Status != 'Fertig'
             */

            const notion = new Client({
                auth: process.env.VUE_APP_NOTION_KEY
            });

            (async () => {
                const databaseId = process.env.VUE_APP_NOTION_DATABASE_ID
                const response = await notion.databases.query({
                    database_id: databaseId,

                    filter: {
                        'and': [{
                            property: 'Today',
                            checkbox: {
                                equals: true
                            }
                        },
                            {
                                property: 'Status',
                                select: {
                                    does_not_equal: 'Fertig'
                                }
                            }
                        ]
                    },

                    sorts: [{
                        property: 'Fällig am',
                        direction: 'ascending',
                    },],
                });

                console.log(response);
            })();
        },
    },
    actions: {},
    modules: {}
})
