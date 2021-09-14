const { ChapterInfo } = require('../database/sequelize')

ChapterInfoController = {}
ChapterInfoController.getChapterInfo = async (chapter_info_id) => {
    try {
        return await ChapterInfo.findByPk(chapter_info_id,{
            include: {
                all: true
            }
        })
    } catch (error) {
        return error
    }
}
ChapterInfoController.getChaptersInfo = async () => {
    try {
        return await ChapterInfo.findAll({
            include: {
                all: true
            }
        })
    } catch (error) {
        return error
    }
}
ChapterInfoController.createChapterInfo = async (pChapterInfo) => {
    try {
        return await ChapterInfo.create(pChapterInfo)
    } catch (error) {
        return error
    }
}

ChapterInfoController.updateChapterInfo = async (pChapterInfo) => {
    try {
        return await ChapterInfo.update(pChapterInfo,{
            where: {
                chapter_info_id: pChapterInfo.chapter_info_id
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = ChapterInfoController