const { Chapter } = require('../database/sequelize')

ChapterController = {}
ChapterController.getChapter = async (chapter_id) => {
    try {
        return await Chapter.findByPk(chapter_id)
    } catch (error) {
        return error
    }
}
ChapterController.getChapters = async () => {
    try {
        return await Chapter.findAll()
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