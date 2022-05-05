const Joi = require('joi');

module.exports.CreateChapterValidation = CreateChapterValidation = (data) => {
    const schema = Joi.object({
        chapter_name: Joi.string().required(),
        description: Joi.string().required(),
        acronym: Joi.string().required(),
        icon: Joi.string().required(),
        logo_path: Joi.string().required(),
        start_date: Joi.date().required(),
        end_date: Joi.date(),
        isActive: Joi.boolean().required(),
    })
    return schema.validate(data)
}
module.exports.UpdateChapterValidation = UpdateChapterValidation = (data) => {
    const schema = Joi.object({
        chapter_id: Joi.number().required(),
        chapter_name: Joi.string(),
        description: Joi.string(),
        acronym: Joi.string(),
        icon: Joi.string(),
        logo_path: Joi.string(),
        start_date: Joi.date(),
        end_date: Joi.date(),
        isActive: Joi.boolean(),
    })
    return schema.validate(data)
}
module.exports.CreateChapterInfoValidation = CreateChapterInfoValidation = (data) => {
    const schema = Joi.object({
        mission: Joi.string().required(),
        vission: Joi.string().required(),
        objectives: Joi.string().required(),
        chapter_id: Joi.number().required(),
    })
    return schema.validate(data)
}
module.exports.UpdateChapterInfoValidation = UpdateChapterInfoValidation = (data) => {
    const schema = Joi.object({
        chapter_info_id: Joi.number().required(),
        mission: Joi.string().required(),
        vission: Joi.string().required(),
        objectives: Joi.string(),
        chapter_id: Joi.number(),
    })
    return schema.validate(data)
}

module.exports.CreateChapterMemberValidation = CreateChapteMemberValidation = (data) => {
    const schema = Joi.object({
        role_id: Joi.number().required(),
        chapter_id:Joi.number().required(),
        member_id:Joi.number().required(),
        isActive: Joi.boolean().required(),
        start_date: Joi.date().required(),
        end_date: Joi.date(),
    })
    return schema.validate(data)
}
module.exports.UpdateChapterMemberValidation = UpdateChapterMemberValidation = (data) => {
    const schema = Joi.object({
        member_id: Joi.number().required(),
        role_id: Joi.number().required(),
        chapter_id: Joi.number().required(),
        isActive: Joi.boolean(),
        start_date: Joi.date(),
        end_date: Joi.date(),
    })
    return schema.validate(data)
}
module.exports.DeleteChapterMemberValidation = DeleteChapterMemberValidation = (data) => {
    const schema = Joi.object({
        member_id: Joi.number().required(),
        chapter_id: Joi.number().required()
    })
    return schema.validate(data)
}
module.exports.CreateEventValidation = CreateEventValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
        event_type_id: Joi.number().required(),
        chapter_id:Joi.number().required(),
    })
    return schema.validate(data)
}
module.exports.UpdateEventValidation = UpdateEventValidation = (data) => {
    const schema = Joi.object({
        event_id: Joi.number().required(),
        title: Joi.string(),
        description: Joi.string(),
        start_date: Joi.date(),
        end_date: Joi.date(),
        event_type_id: Joi.number().required(),
        chapter_id:Joi.number().required(),
    })
    return schema.validate(data)
}
module.exports.DeleteEventValidation = DeleteEventValidation = (data) => {
    const schema = Joi.object({
        event_id: Joi.number().required(),
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
        event_type_id: Joi.number().required(),
        event_type: Joi.string(),
    })
    return schema.validate(data)
}

module.exports.CreateGalleryValidation = CreateGalleryValidation = (data) => {
    const schema = Joi.object({
        gallery_name: Joi.string().required(),
        path: Joi.string().required(),
        description: Joi.string().required(),
        event_id: Joi.number().required(),
    })
    return schema.validate(data)
}
module.exports.UpdateGalleryValidation = UpdateGalleryValidation = (data) => {
    const schema = Joi.object({
        gallery_id: Joi.number().required(),
        gallery_name: Joi.string(),
        path: Joi.string(),
        description: Joi.string(),
        event_id: Joi.number(),
    })
    return schema.validate(data)
}

module.exports.CreateMemberValidation = CreateMemberValidation = (data) => {
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required(),
        password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$')).required(),//(?=.*?[#?!@$%^&*-])
        document: Joi.number().required(),
        phone: Joi.number().required(),
        image_path: Joi.string().required(),
        default_image: Joi.bool()
    })
    return schema.validate(data)
}
module.exports.UpdateMemberValidation = UpdateMemberValidation = (data) => {
    const schema = Joi.object({
        member_id: Joi.number().required(),
        firstname: Joi.string(),
        lastname: Joi.string(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }),
        password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$')),//One upper case, one lower case, one number and min 4 characters
        document: Joi.number(),
        phone: Joi.number(),
        image_path: Joi.string(),
        default_image: Joi.bool()
    })
    return schema.validate(data)
}
module.exports.DeleteMemberValidation = DeleteMemberValidation = (data) => {
    const schema = Joi.object({
        member_id: Joi.number().required(),
    })
    return schema.validate(data)
}
module.exports.CreateRoleValidation = CreateRoleValidation = (data) => {
    const schema = Joi.object({
        role_name: Joi.string().required(),
        description: Joi.string().required(),
        canCreate: Joi.boolean().required(),
        canDelete: Joi.boolean().required(),
        canUpdate: Joi.boolean().required(),
    })
    return schema.validate(data)
}
module.exports.UpdateRoleValidation = UpdateRoleValidation = (data) => {
    const schema = Joi.object({
        role_id: Joi.number().required(),
        role_name: Joi.string(),
        description: Joi.string(),
        canCreate: Joi.boolean(),
        canDelete: Joi.boolean(),
        canUpdate: Joi.boolean(),
    })
    return schema.validate(data)
}
module.exports.DeleteRoleValidation = DeleteRoleValidation = (data) => {
    const schema = Joi.object({
        role_id: Joi.number().required(),
    })
    return schema.validate(data)
}









