const { Event } = require('../database/sequelize')

EventController = {}
EventController.getEventByChapter = async (chapter_id) => {
    try {
        return await Event.findAll({
            where:{
                chapter_id: chapter_id
            },
            include: {
                all: true
            }
        })
    } catch (error) {
        return error
    }
}
EventController.getEvent = async (event_id) => {
    try {
        return await Event.findByPk(event_id,{
            include: {
                all: true
            }
        })
    } catch (error) {
        return error
    }
}
EventController.getEvents = async () => {
    try {
        return await Event.findAll({
            include: {
                all: true
            }
        })
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