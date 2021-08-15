const { ChapterMember } = require('../database/sequelize')

ChapterMemberController = {}
ChapterMemberController.getChapterMember = async (member_id) => {
    try {
        return await ChapterMember.findByPk(member_id,{
            include: {
                all: true
            }
        })
    } catch (error) {
        return error
    }
}
ChapterMemberController.getChapterMembers = async () => {
    try {
        return await ChapterMember.findAll({
            include: {
                all: true
            }
        })
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
                member_id: pChapterMember.member_id,
                chapter_id: pChapterMember.chapter_id,
                role_id: pChapterMember.role_id,
            }
        })
    } catch (error) {
        return error
    }
}

ChapterMemberController.deleteChapterMember = async (pChapterMember) => {
    try {
        return await ChapterMember.destroy({
            where: {
                member_id: pChapterMember.member_id,
                chapter_id: pChapterMember.chapter_id,
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = ChapterMemberController