const router = require('express').Router()
const EventTypeController = require('../controllers/EventTypeController')
const { CreateEventTypeValidation,UpdateEventTypeValidation } = require('../middlewares/Validation')

router.get('/:event_type_id', async (req,res)=>{
    /**
        #swagger.tags = ['EventTypes']
        #swagger.path = '/eventtypes/{event_type_id}'
        #swagger.description = 'Endpoint to get one eventtype'
     */
    const event_type_id = req.params.event_type_id
    const eventtype = await EventTypeController.getEventType(event_type_id)
    if(eventtype){
        return res.status(200).send({
            response: eventtype
        })
    }
    return res.status(404).send({
        error: "Couldn't found that eventtype"
    })
})

router.get('/', async (req,res)=>{
    /**
        #swagger.tags = ['EventTypes']
        #swagger.path = '/eventtypes'
        #swagger.description = 'Endpoint to get all eventtypes'
     */
    const eventtypes = await EventTypeController.getEventTypes()
    if(eventtypes.length > 0){
        return res.status(200).send({
            response: eventtypes
        })
    }
    return res.status(404).send({
        error: "Couldn't found any eventtype"
    })
})

router.post('/', async (req,res)=>{
    /**
        #swagger.tags = ['EventTypes']
        #swagger.path = '/eventtypes'
        #swagger.description = 'Endpoint to create a eventtype'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/EventType'
            }
        }]
     */
    const {error} = CreateEventTypeValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const eventtype = await EventTypeController.createEventType(req.body)
    if(eventtype.errors || eventtype.name){
        return res.status(400).send({
            error: "Couldn't save the eventtype"
        })
    }

    return res.status(201).send()
})

router.put('/', async (req,res)=>{
    /**
        #swagger.tags = ['EventTypes']
        #swagger.path = '/eventtypes'
        #swagger.description = 'Endpoint to update a eventtype'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/EventType'
            }
        }]
     */
    const {error} = UpdateEventTypeValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const eventtype = await EventTypeController.updateEventType(req.body);
    if(eventtype[0] == 0 || eventtype.name){
        return res.status(404).send({
            error: "Couldn't update the eventtype"
        })
    }
    return res.status(204).send()
})


module.exports = router;