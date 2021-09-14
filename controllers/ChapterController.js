const { Chapter, ChapterMember, ChapterInfo, Event, Member, Role  } = require('../database/sequelize')

ChapterController = {}
ChapterController.getChapter = async (chapter_id) => {
    try {
        return await Chapter.findByPk(chapter_id,{
            include: [{ model: ChapterMember, include: [{ model: Member },{ model: Role }] },{ model: Event },{ model: ChapterInfo }]
        })
    } catch (error) {
        return error
    }
}
ChapterController.getChapters = async () => {
    try {
        return await Chapter.findAll({
            include: [{ model: ChapterMember, include: [{ model: Member },{ model: Role }] },{ model: Event },{ model: ChapterInfo }]
        })
    } catch (error) {
        return error
    }
}
ChapterController.createChapter = async (pChapter) => {
    try {
        return await Chapter.create(pChapter)
    } catch (error) {
        return error
    }
}

ChapterController.updateChapter = async (pChapter) => {
    try {
        return await Chapter.update(pChapter,{
            where: {
                chapter_id: pChapter.chapter_id
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = ChapterController