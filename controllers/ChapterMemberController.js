const { ChapterMember } = require('../database/sequelize')

ChapterMemberController = {}
ChapterMemberController.getChapterMember = async (chapter_id) => {
    try {
        return await ChapterMember.findByPk(chapter_id)
    } catch (error) {
        return error
    }
}
ChapterMemberController.getChapterMembers = async () => {
    try {
        return await ChapterMember.findAll()
    } catch (error) {
        return error
    }
}
ChapterMemberController.createChapterMember = async (pChapterMember) => {
    try {
        return await ChapterMember.create(pChapterMember)
    } catch (error) {
        return error
    }
}

ChapterMemberController.updateChapterMember = async (pChapterMember) => {
    try {
        return await ChapterMember.update(pChapterMember,{
            where: {
                chapter_member_id: pChapterMember.chapter_member_id
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = ChapterMemberController