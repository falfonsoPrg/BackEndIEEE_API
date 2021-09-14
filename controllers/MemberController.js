const { Member, ChapterMember, Role, Chapter } = require('../database/sequelize')

MemberController = {}
MemberController.getMember = async (member_id) => {
    try {
        return await Member.findByPk(member_id,{
            include: {
                all: true
            }
        },{
            attributes: {
                exclude: ['password']
            }
        })
    } catch (error) {
        return error
    }
}
MemberController.getMemberByEmail = async (pEmail) => {
    try {
        return await Member.findOne({
            where:{
                email: pEmail
            },
            include: [{ model: ChapterMember, include: [{ model: Role },{model: Chapter}] }]
        })
    } catch (error) {
        return error
    }
}
MemberController.getMembers = async () => {
    try {
        return await Member.findAll({
            include: {
                all: true
            }
        },{attributes: {exclude: ['password']}})
    } catch (error) {
        return error
    }
}
MemberController.createMember = async (pMember) => {
    try {
        return await Member.create(pMember)
    } catch (error) {
        return error
    }
}

MemberController.updateMember = async (pMember) => {
    try {
        return await Mwember.update(pMember,{
            where: {
                member_id: pMember.member_id
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = MemberController