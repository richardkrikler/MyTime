const express = require('express')
const app = express()
const PORT = 1031
app.use(express.json())

const cors = require('cors')
app.use(cors())

const Joi = require('joi')

const {Client} = require('@notionhq/client')
require('dotenv').config()


const notionDateSchema =
    Joi.object({
        notionDate: Joi.object({
            start: Joi.date().iso().required(),
            end: Joi.date().iso().required()
        }).or().allow(null).required()
    })


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

    const result = notionDateSchema.validate(req.body)
    const {value, error} = result
    const valid = error == null

    if (valid) {
        (async () => {
            await notion.pages.update({
                page_id: id,
                properties: {
                    'When': {
                        date: notionDate
                    },
                },
            }).then(() => res.status(200).send('Successfully updated Notion-Date!'))
        })()
    } else {
        res.status(422).send(error)
    }
})
