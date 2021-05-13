const router = require('express').Router()
const ChapterMemberController = require('../controllers/ChapterMemberController')
const {CreateChapterMemberValidation,UpdateChapterMemberValidation  } = require('../middlewares/Validation')

router.get('/:chaptermember_id', async (req,res)=>{
    /**
        #swagger.tags = ['ChaptersMembers']
        #swagger.path = '/chaptersmembers/{chaptermember_id}'
        #swagger.description = 'Endpoint to get one chaptermember'
     */
    const chaptermember_id = req.params.chaptermember_id
    const chaptermember = await ChapterMemberController.getChapterMember(chaptermember_id)
    if(chaptermember){
        return res.status(200).send({
            response: chaptermember
        })
    }
    return res.status(404).send({
        error: "Couldn't found that chaptermember"
    })
})

router.get('/', async (req,res)=>{
    /**
        #swagger.tags = ['ChaptersMembers']
        #swagger.path = '/chaptersmembers'
        #swagger.description = 'Endpoint to get all chaptersmembers'
     */
    const chaptersmembers = await ChapterMemberController.getChapterMembers()
    if(chaptersmembers.length > 0){
        return res.status(200).send({
            response: chaptersmembers
        })
    }
    return res.status(404).send({
        error: "Couldn't found any chaptermember"
    })
})

router.post('/', async (req,res)=>{
    /**
        #swagger.tags = ['ChaptersMembers']
        #swagger.path = '/chaptersmembers'
        #swagger.description = 'Endpoint to create a chaptermember'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/ChapterMember'
            }
        }]
     */
    const {error} = CreateChapterMemberValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const chaptermember = await ChapterMemberController.createChapterMember(req.body)
    if(chaptermember.errors || chaptermember.name){
        return res.status(400).send({
            error: "Couldn't save the chaptermember"
        })
    }

    return res.status(201).send()
})

router.put('/', async (req,res)=>{
    /**
        #swagger.tags = ['ChaptersMembers']
        #swagger.path = '/chaptersmembers'
        #swagger.description = 'Endpoint to update a chaptermember'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/ChapterMember'
            }
        }]
     */
    const {error} = UpdateChapterMemberValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const chaptermember = await ChapterMemberController.updateChapterMember(req.body);
    if(chaptermember[0] == 0 || chaptermember.name){
        console.log(chaptermember)
        return res.status(404).send({
            error: "Couldn't update the ChapterMember"
        })
    }
    return res.status(204).send()
})


module.exports = router;