const router = require('express').Router()
const ChapterController = require('../controllers/ChapterController')
//const {  } = require('../middlewares/Validation')

router.get('/:chapter_id', async (req,res)=>{
    /**
        #swagger.tags = ['Chapters']
        #swagger.path = '/chapters/{chapter_id}'
        #swagger.description = 'Endpoint to get one chapter'
     */
    const chapter_id = req.params.chapter_id
    const chapter = await ChapterController.getChapter(chapter_id)
    if(chapter){
        return res.status(200).send({
            response: chapter
        })
    }
    return res.status(404).send({
        error: "Couldn't found that chapter"
    })
})

router.get('/', async (req,res)=>{
    /**
        #swagger.tags = ['Chapters']
        #swagger.path = '/chapters'
        #swagger.description = 'Endpoint to get all chapters'
     */
    const chapters = await ChapterController.getChapters()
    if(chapters.length > 0){
        return res.status(200).send({
            response: chapters
        })
    }
    return res.status(404).send({
        error: "Couldn't found any chapter"
    })
})

router.post('/', async (req,res)=>{
    /**
        #swagger.tags = ['Chapters']
        #swagger.path = '/chapters'
        #swagger.description = 'Endpoint to create a chapter'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Chapter'
            }
        }]
     */
    const {error} = false //CreateChapterValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    const chapter = await ChapterController.createChapter(req.body)
    if(chapter.errors || chapter.name){
        return res.status(400).send({
            error: "Couldn't save the chapter"
        })
    }

    return res.status(201).send()
})

router.put('/', async (req,res)=>{
    /**
        #swagger.tags = ['Chapters']
        #swagger.path = '/chapters'
        #swagger.description = 'Endpoint to update a chapter'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Chapter'
            }
        }]
     */
    const {error} = false //UpdateChapterValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const chapter = await ChapterController.updateChapter(req.body);
    if(chapter[0] == 0 || chapter.name){
        return res.status(404).send({
            error: "Couldn't update the Chapter"
        })
    }
    return res.status(204).send()
})


module.exports = router;