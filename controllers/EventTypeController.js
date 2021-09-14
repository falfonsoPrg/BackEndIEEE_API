const { EventType } = require('../database/sequelize')

EventTypeController = {}
EventTypeController.getEventType = async (event_type_id) => {
    try {
        return await EventType.findByPk(event_type_id,{
            include: {
                all: true
            }
        })
    } catch (error) {
        return error
    }
}
EventTypeController.getEventTypes = async () => {
    try {
        return await EventType.findAll({
            include: {
                all: true
            }
        })
    } catch (error) {
        return error
    }
}
EventTypeController.createEventType = async (pEventType) => {
    try {
        return await EventType.create(pEventType)
    } catch (error) {
        return error
    }
}

EventTypeController.updateEventType = async (pEventType) => {
    try {
        return await EventType.update(pEventType,{
            where: {
                event_type_id: pEventType.event_type_id
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = EventTypeController