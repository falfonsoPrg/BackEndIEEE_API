const router = require('express').Router()
const EventController = require('../controllers/EventController')
//const {  } = require('../middlewares/Validation')

router.get('/:event_id', async (req,res)=>{
    /**
        #swagger.tags = ['Events']
        #swagger.path = '/events/{event_id}'
        #swagger.description = 'Endpoint to get one event'
     */
    const event_id = req.params.event_id
    const event = await EventController.getEvent(event_id)
    if(event){
        return res.status(200).send({
            response: event
        })
    }
    return res.status(404).send({
        error: "Couldn't found that event"
    })
})

router.get('/', async (req,res)=>{
    /**
        #swagger.tags = ['Events']
        #swagger.path = '/events'
        #swagger.description = 'Endpoint to get all events'
     */
    const events = await EventController.getEvents()
    if(events.length > 0){
        return res.status(200).send({
            response: events
        })
    }
    return res.status(404).send({
        error: "Couldn't found any event"
    })
})

router.post('/', async (req,res)=>{
    /**
        #swagger.tags = ['Events']
        #swagger.path = '/events'
        #swagger.description = 'Endpoint to create a event'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Event'
            }
        }]
     */
    const {error} = false //CreateEventValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const event = await EventController.createEvent(req.body)
    if(event.errors || event.name){
        return res.status(400).send({
            error: "Couldn't save the event"
        })
    }

    return res.status(201).send()
})

router.put('/', async (req,res)=>{
    /**
        #swagger.tags = ['Events']
        #swagger.path = '/events'
        #swagger.description = 'Endpoint to update a event'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Event'
            }
        }]
     */
    const {error} = false //UpdateEventValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const event = await EventController.updateEvent(req.body);
    if(event[0] == 0 || event.name){
        return res.status(404).send({
            error: "Couldn't update the event"
        })
    }
    return res.status(204).send()
})


module.exports = router;