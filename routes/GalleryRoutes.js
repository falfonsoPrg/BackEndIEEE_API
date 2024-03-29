const router = require('express').Router()
const GalleryController = require('../controllers/GalleryController')
const {  CreateGalleryValidation, UpdateGalleryValidation} = require('../middlewares/Validation')
const cloudinary = require('cloudinary').v2
cloudinary.config({ 
    cloud_name: process.env.CLOUDY_NAME, 
    api_key: process.env.CLOUDY_KEY, 
    api_secret: process.env.CLOUDY_KEY_S 
});

router.get('/:gallery_id', async (req,res)=>{
    /**
        #swagger.tags = ['Galleries']
        #swagger.path = '/galleries/{gallery_id}'
        #swagger.description = 'Endpoint to get one gallery'
     */
    const gallery_id = req.params.gallery_id
    const gallery = await GalleryController.getGallery(gallery_id)
    if(gallery){
        return res.status(200).send({
            response: gallery
        })
    }
    return res.status(404).send({
        error: "Couldn't found that gallery"
    })
})

router.get('/', async (req,res)=>{
    /**
        #swagger.tags = ['Galleries']
        #swagger.path = '/galleries'
        #swagger.description = 'Endpoint to get all galleries'
     */
    const galleries = await GalleryController.getGalleries()
    if(galleries.length > 0){
        return res.status(200).send({
            response: galleries
        })
    }
    return res.status(404).send({
        error: "Couldn't found any gallery"
    })
})

router.post('/', async (req,res)=>{
    /**
        #swagger.tags = ['Galleries']
        #swagger.path = '/galleries'
        #swagger.description = 'Endpoint to create a gallery'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Gallery'
            }
        }]
     */
    const {error} = CreateGalleryValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    var matches = req.body.path.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    if (matches.length !== 3) {
        return res.status(422).send({
            error: "The image have an incorrect format"
        })
    }
    await cloudinary.uploader.upload(req.body.path)
    .then(result =>{
        req.body.path = result.url
    })
    .catch(err=>{
        return res.status(422).send({
            error: "Couldn't save the image"
        })
    })   

    const gallery = await GalleryController.createGallery(req.body)
    if(gallery.errors || gallery.name){
        return res.status(400).send({
            error: "Couldn't save the gallery"
        })
    }

    return res.status(201).send()
})

router.put('/', async (req,res)=>{
    /**
        #swagger.tags = ['Galleries']
        #swagger.path = '/galleries'
        #swagger.description = 'Endpoint to update a gallery'
        #swagger.parameters = [{
            description: 'description',
            in:'body',
            required: true,
            name: 'body',
            schema: {
                $ref: '#/definitions/Gallery'
            }
        }]
     */
    const {error} = UpdateGalleryValidation(req.body)
    if(error) return res.status(422).send({
        error: error.details[0].message
    })

    const gallery = await GalleryController.updateGallery(req.body);
    if(gallery[0] == 0 || gallery.name){
        return res.status(404).send({
            error: "Couldn't update the Gallery"
        })
    }
    return res.status(204).send()
})

module.exports = router;
