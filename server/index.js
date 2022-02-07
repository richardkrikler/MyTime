const express = require('express')
const app = express()
const PORT = 1031
app.use(express.json())

const cors = require('cors')
app.use(cors())

const Joi = require('joi')

const {Client} = require('@notionhq/client')
require('dotenv').config()


const whenSchema = {
    body: Joi.object({
        date: Joi.object({
            start: Joi.date().iso(),
            end: Joi.date().iso()
        }).or().allow(null)
    })
}


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

app.patch('/task/:id', (req, res) => {
    const {id} = req.params
    const {notionDate} = req.body
    const notion = new Client({auth: process.env.NOTION_KEY});

    // const dateObj = null;
    // const dateObj = {
    //     start: '2022-01-30',
    //     end: null
    // };

    const response = (async () => {
        await notion.pages.update({
            page_id: id,
            properties: {
                'When': {
                    date: notionDate
                },
            },
        }).then(() => res.status(200).send())
    })()
})
