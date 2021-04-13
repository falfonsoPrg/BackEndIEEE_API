const Joi = require('joi');

module.exports.CreateChapterValidation = CreateChapterValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        logo_path: Joi.string().required(),
        start_date: Joi.string().required(),
        end_date: Joi.string(),
        isActive: Joi.string().required(),
    })
    return schema.validate(data)
}
module.exports.UpdateChapterValidation = UpdateChapterValidation = (data) => {
    const schema = Joi.object({
        chapter_id: Joi.number().min(1).required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        logo_path: Joi.string().required(),
        start_date: Joi.date().required(),
        end_date: Joi.date(),
        isActive: Joi.boolean().required(),
    })
    return schema.validate(data)
}
module.exports.CreateChapterInfoValidation = CreateChapterInfoValidation = (data) => {
    const schema = Joi.object({
        mission: Joi.string().required(),
        vission: Joi.string().required(),
        objectives: Joi.string().required(),
        chaper_id: Joi.number().min(1).required(),
    })
    return schema.validate(data)
}
module.exports.UpdateChapterInfoValidation = UpdateChapterInfoValidation = (data) => {
    const schema = Joi.object({
        chapter_info_id: Joi.number().min(1).required(),
        mission: Joi.string().required(),
        vission: Joi.string().required(),
        objectives: Joi.string().required(),
        chaper_id: Joi.number().min(1).required(),
    })
    return schema.validate(data)
}

module.exports.CreateChapterMemberValidation = CreateChapteMemberValidation = (data) => {
    const schema = Joi.object({
        isActive: Joi.boolean().required(),
        start_date: Joi.date().required(),
        end_date: Joi.date(),
    })
    return schema.validate(data)
}
module.exports.UpdateChapterMemberValidation = UpdateChapterMemberValidation = (data) => {
    const schema = Joi.object({
        member_id: Joi.number().min(1).required(),
        role_id: Joi.number().min(1).required(),
        chapter_id: Joi.number().min(1).required(),
        isActive: Joi.boolean().required(),
        start_date: Joi.date().required(),
        end_date: Joi.date(),
    })
    return schema.validate(data)
}
module.exports.CreateEventValidation = CreateEventValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        start_date: Joi.boolean().required(),
        end_date: Joi.boolean().required(),
        event_type_id: Joi.number().min(1).required(),
        chaper_id:Joi.number().min(1).required(),
    })
    return schema.validate(data)
}
module.exports.UpdateEventValidation = UpdateEventValidation = (data) => {
    const schema = Joi.object({
        event_id: Joi.number().min(1).required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        start_date: Joi.boolean().required(),
        end_date: Joi.boolean().required(),
        event_type_id: Joi.number().min(1).required(),
        chaper_id:Joi.number().min(1).required(),
    })
    return schema.validate(data)
}
module.exports.CreateEventTypeValidation = CreateEventTypeValidation = (data) => {
    const schema = Joi.object({
        event_type: Joi.string().required(),
    })
    return schema.validate(data)
}
module.exports.UpdateEventTypeValidation = UpdateEventTypeValidation = (data) => {
    const schema = Joi.object({
        event_type_id: Joi.number().min(1).required(),
        event_type: Joi.string().required(),
    })
    return schema.validate(data)
}

module.exports.CreateGalleryValidation = CreateGalleryValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        path: Joi.string().required(),
        description: Joi.string().required(),
        event_id: Joi.number().min(1).required(),
    })
    return schema.validate(data)
}
module.exports.UpdateGalleryValidation = UpdateGalleryValidation = (data) => {
    const schema = Joi.object({
        gallery_id: Joi.number().min(1).required(),
        name: Joi.string().required(),
        path: Joi.string().required(),
        description: Joi.string().required(),
        event_id: Joi.number().min(1).required(),
    })
    return schema.validate(data)
}

module.exports.CreateMemberValidation = CreateMemberValidation = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().min(3).max(10).required(),
        lastname: Joi.string().min(3).max(10).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['co'] } }).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        document: Joi.number().min(5).max(15).required(),
        phone: Joi.number().required(),
        image_path: Joi.string().required()
    })
    return schema.validate(data)
}
module.exports.UpdateMemberValidation = UpdateMemberValidation = (data) => {
    const schema = Joi.object({
        member_id: Joi.number().min(1).required(),
        firstname: Joi.string().min(3).max(10).required(),
        lastname: Joi.string().min(3).max(10).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['co'] } }).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        document: Joi.number().min(5).max(15).required(),
        phone: Joi.number().required(),
        image_path: Joi.string().required()
    })
    return schema.validate(data)
}
module.exports.CreateRoleValidation = CreateRoleValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        canCreate: Joi.boolean().required(),
        canDelete: Joi.boolean().required(),
        canUpdate: Joi.boolean().required(),
    })
    return schema.validate(data)
}
module.exports.UpdateRoleValidation = UpdateRoleValidation = (data) => {
    const schema = Joi.object({
        role_id: Joi.number().min(1).required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        canCreate: Joi.boolean().required(),
        canDelete: Joi.boolean().required(),
        canUpdate: Joi.boolean().required(),
    })
    return schema.validate(data)
}










