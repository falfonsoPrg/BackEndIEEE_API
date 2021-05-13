const Sequelize = require("sequelize")

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    dialect: "postgres",
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 5,
        min: 0,
        require: 30000,
        idle: 10000
    }
});
sequelize.options.logging = false //Set loggin output to false

//TODO: Import all the models as below
const ChapterMemberModel = require("../models/ChapterMemberModel")
const ChapterModel = require("../models/ChapterModel")
const EventModel = require("../models/EventModel")
const EventTypeModel = require("../models/EventTypeModel")
const GalleryModel = require("../models/GalleryModel")
const MemberModel = require("../models/MemberModel")
const RoleModel = require("../models/RoleModel")
const ChapterInfoModel = require("../models/ChapterInfoModel")

//TODO: Create the actual models as below
const ChapterMember = ChapterMemberModel(sequelize)
const Chapter = ChapterModel(sequelize)
const Event = EventModel(sequelize)
const EventType = EventTypeModel(sequelize)
const Gallery = GalleryModel(sequelize)
const Member = MemberModel(sequelize)
const Role = RoleModel(sequelize)
const ChapterInfo = ChapterInfoModel(sequelize)

//TODO; Create the relationships as below, use the sequelize documentation as guide
//User.hasMany(AnotherModel)
//AnotherModel.belongsTo(User)
Event.hasMany(Gallery, {foreignKey: 'event_id', sourceKey:'event_id'});
Gallery.belongsTo(Event, {foreignKey: 'event_id', sourceKey:'event_id'});

EventType.hasMany(Event, {foreignKey: 'event_type_id', sourceKey:'event_type_id'});
Event.belongsTo(EventType, {foreignKey: 'event_type_id', sourceKey:'event_type_id'});

Chapter.hasMany(Event, {foreignKey: 'chapter_id', sourceKey:'chapter_id'});
Event.belongsTo(Chapter, {foreignKey: 'chapter_id', sourceKey:'chapter_id'});

Chapter.hasMany(ChapterMember, {foreignKey: 'chapter_id', sourceKey:'chapter_id'});
ChapterMember.belongsTo(Chapter, {foreignKey: 'chapter_id', sourceKey:'chapter_id'});

Member.hasMany(ChapterMember, {foreignKey: 'member_id', sourceKey:'member_id'});
ChapterMember.belongsTo(Member, {foreignKey: 'member_id', sourceKey:'member_id'});

Role.hasMany(ChapterMember, {foreignKey: 'role_id', sourceKey:'role_id'});
ChapterMember.belongsTo(Role, {foreignKey: 'role_id', sourceKey:'role_id'});

Chapter.hasMany(ChapterInfo, {foreignKey: 'chapter_id', sourceKey:'chapter_id'});
ChapterInfo.belongsTo(Chapter, {foreignKey: 'chapter_id', sourceKey:'chapter_id'});

var resetDb = { force:false };
sequelize.sync( resetDb ).then( async () => {
    console.log("DB Connection stablished")
}).catch(err => {
    console.log(err)
})

module.exports = {
    sequelize,
    Member,
    Chapter,
    ChapterMember,
    ChapterInfo,
    Event,
    EventType,
    Gallery,
    Role
}
