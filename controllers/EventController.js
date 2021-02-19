const { Event } = require('../database/sequelize')

EventController = {}
EventController.getEvent = async (event_id) => {
    try {
        return await Event.findByPk(event_id)
    } catch (error) {
        return error
    }
}
EventController.getEvents = async () => {
    try {
        return await Event.findAll()
    } catch (error) {
        return error
    }
}
EventController.createEvent = async (pEvent) => {
    try {
        return await Event.create(pEvent)
    } catch (error) {
        return error
    }
}

EventController.updateEvent = async (pEvent) => {
    try {
        return await Event.update(pEvent,{
            where: {
                event_id: pEvent.event_id
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = EventController