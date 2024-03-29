const router = require('express').Router()
const ChapterController = require('../controllers/ChapterController')
const {CreateChapterValidation,UpdateChapterValidation  } = require('../middlewares/Validation')
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: process.env.CLOUDY_NAME, 
    api_key: process.env.CLOUDY_KEY, 
    api_secret: process.env.CLOUDY_KEY_S 
});

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
    const {error} = CreateChapterValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })
    await cloudinary.uploader.upload(req.body.logo_path)
    .then(result =>{
        req.body.logo_path = result.url
    })
    .catch(err=>{
        return res.status(422).send({
            error: "Couldn't save the image"
        })
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
    const {error} = UpdateChapterValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    if(req.body.logo_path && req.body.logo_path !== ""){
        var matchesUrl = req.body.logo_path.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
        if(!matchesUrl){
            var matches = req.body.logo_path.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
            if (matches.length !== 3) {
                return res.status(422).send({
                    error: "The image have an incorrect format"
                })
            }
            await cloudinary.uploader.upload(req.body.logo_path)
            .then(result =>{
                req.body.logo_path = result.url
            })
        }
    }

    const chapter = await ChapterController.updateChapter(req.body);
    if(chapter[0] == 0 || chapter.name){
        return res.status(404).send({
            error: "Couldn't update the Chapter"
        })
    }
    return res.status(204).send()
})

module.exports = router;
