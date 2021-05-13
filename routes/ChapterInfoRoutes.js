const router = require('express').Router()
const ChapterInfoController = require('../controllers/ChapterInfoController')
const { CreateChapterInfoValidation, UpdateChapterInfoValidation } = require('../middlewares/Validation')

router.get('/:chapter_info_id', async (req,res)=>{
    /**
        #swagger.tags = ['ChaptersInfo']
        #swagger.path = '/chaptersinfo/{chapter_info_id}'
        #swagger.description = 'Endpoint to get one chapter'
     */
    const id = req.params.chapter_info_id
    const chapterinfo = await ChapterInfoController.getChapterInfo(id)
    if(chapterinfo){
        return res.status(200).send({
            response: chapterinfo
        })
    }
    return res.status(404).send({
        error: "Couldn't found that chapterinfo"
    })
})

router.get('/', async (req,res)=>{
    /**
        #swagger.tags = ['ChaptersInfo']
        #swagger.path = '/chaptersinfo'
        #swagger.description = 'Endpoint to get all chaptersinfo'
     */
    const chaptersinfo = await ChapterInfoController.getChaptersInfo()
    if(chaptersinfo.length > 0){
        return res.status(200).send({
            response: chaptersinfo
        })
    }
    return res.status(404).send({
        error: "Couldn't found any chapterinfo"
    })
})

router.post('/', async (req,res)=>{
    /**
        #swagger.tags = ['ChaptersInfo']
        #swagger.path = '/chaptersinfo'
        #swagger.description = 'Endpoint to create a chapterinfo'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/ChapterInfo'
            }
        }]
     */
    const {error} = CreateChapterInfoValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const chapter = await ChapterInfoController.createChapterInfo(req.body)
    if(chapter.errors || chapter.name){
        return res.status(400).send({
            error: "Couldn't save the chapterinfo"
        })
    }
    return res.status(201).send()
})

router.put('/', async (req,res)=>{
    /**
        #swagger.tags = ['ChaptersInfo']
        #swagger.path = '/chaptersinfo'
        #swagger.description = 'Endpoint to update a chaptersinfo'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/ChapterInfo'
            }
        }]
     */
    const {error} = UpdateChapterInfoValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const chapterinfo = await ChapterInfoController.updateChapterInfo(req.body);
    if(chapterinfo[0] == 0 || chapterinfo.name){
        return res.status(404).send({
            error: "Couldn't update the ChapterInfo"
        })
    }
    return res.status(204).send()
})


module.exports = router;