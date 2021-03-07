const Joi = require('joi');

module.exports.ChapterValidation = MemberValidation = (data) => {
    const schema = Joi.object({
        chaper_id: Joi.integer().min(1).required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        logo_path: Joi.string().required(),
        start_date: Joi.date().required(),
        end_date: Joi.date(),
        isActive: Joi.boolean().required(),
    })
    module.exports = schema;
}
module.exports.ChapterInfoValidation = ChapterInfoValidation = (data) => {
    const schema = Joi.object({
        chapter_info_id: Joi.integer().min(1).required(),
        mission: Joi.string().required(),
        vission: Joi.string().required(),
        objectives: Joi.string().required(),
        chaper_id: Joi.integer().min(1).required(),
    })
    module.exports = schema;
}

module.exports.ChapterMemberValidation = ChapterMemberValidation = (data) => {
    const schema = Joi.object({
        member_id: Joi.integer().min(1).required(),
        role_id: Joi.integer().min(1).required(),
        chapter_id: Joi.integer().min(1).required(),
        isActive: Joi.boolean().required(),
        start_date: Joi.date().required(),
        end_date: Joi.date(),
    })
    module.exports = schema;
}
module.exports.EventValidation = EventValidation = (data) => {
    const schema = Joi.object({
        event_id: Joi.integer().min(1).required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        canCreate: Joi.boolean().required(),
        canDelete: Joi.boolean().required(),
        canUpdate: Joi.boolean().required(),
    })
    module.exports = schema;
}
module.exports.EventTypeValidation = EventTypeValidation = (data) => {
    const schema = Joi.object({
        event_type_id: Joi.integer().min(1).required(),
        event_type: Joi.string().required(),
    })
    module.exports = schema;
}
module.exports.GalleryValidation = GalleryValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        path: Joi.string().required(),
        description: Joi.string().required(),
        event_id: Joi.integer().min(1).required(),
    })
    module.exports = schema;
}

module.exports.MemberValidation = MemberValidation = (data) => {
    const schema = Joi.object({
        member_id: Joi.integer().min(1).required(),
        firstname: Joi.string().min(3).max(10).required(),
        lastname: Joi.string().min(3).max(10).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['co'] } }).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        document: Joi.number().min(5).max(15).required(),
        phone: Joi.number().required(),
        image_path: Joi.string().required()
    })
    module.exports = schema;
}
module.exports.RoleValidation = RoleValidation = (data) =>{
    const schema = Joi.object({
        role_id: Joi.integer().min(1).required(),
        name:Joi.string().required(),
        description:Joi.string().required(),
        canCreate:Joi.boolean().required(),
        canDelete:Joi.boolean().required(),
        canUpdate:Joi.boolean().required(),
    })
    module.exports = schema;
}











