const {Client} = require('@notionhq/client')
require('dotenv').config()

const app = require('express')()
const PORT = 8090

const cors = require('cors');
app.use(cors());


app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)

/**
 * Tasks -> 'Today' == true & Sorted by 'Fällig am' & Status != 'Fertig'
 */
app.get('/tasks', (req, res) => {
    const notion = new Client({auth: process.env.NOTION_KEY});

    (async () => {
        const databaseId = process.env.NOTION_DATABASE_ID
        await notion.databases.query({
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
        }).then(notionData => res.status(200).send(notionData))
    })()
})
