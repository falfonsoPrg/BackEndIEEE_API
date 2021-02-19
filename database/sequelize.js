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

//TODO: Create the actual models as below
const ChapterMember = ChapterMemberModel(sequelize)
const Chapter = ChapterModel(sequelize)
const Event = EventModel(sequelize)
const EventType = EventTypeModel(sequelize)
const Gallery = GalleryModel(sequelize)
const Member = MemberModel(sequelize)
const Role = RoleModel(sequelize)

//TODO; Create the relationships as below, use the sequelize documentation as guide
//User.hasMany(AnotherModel)
//AnotherModel.belongsTo(User)
Event.hasMany(Gallery);
Gallery.belongsTo(Event);
EventType.hasMany(Event);
Event.belongsTo(EventType);
Chapter.hasMany(Event);
Event.belongsTo(Chapter);
Chapter.hasMany(ChapterMember);
ChapterMember.belongsTo(Chapter);
Member.hasMany(ChapterMember);
ChapterMember.belongsTo(Member);
Role.hasMany(ChapterMember);
ChapterMember.belongsTo(Role);

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
    Event,
    EventType,
    Gallery,
    Role
}
