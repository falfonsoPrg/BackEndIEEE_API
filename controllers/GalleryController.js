const { Gallery } = require('../database/sequelize')

GalleryController = {}
GalleryController.getGallery = async (gallery_id) => {
    try {
        return await Gallery.findByPk(gallery_id,{
            include: {
                all: true
            }
        })
    } catch (error) {
        return error
    }
}
GalleryController.getGalleries = async () => {
    try {
        return await Gallery.findAll({
            include: {
                all: true
            }
        })
    } catch (error) {
        return error
    }
}
GalleryController.createGallery = async (pGallery) => {
    try {
        return await Gallery.create(pGallery)
    } catch (error) {
        return error
    }
}

GalleryController.updateGallery = async (pGallery) => {
    try {
        return await Gallery.update(pGallery,{
            where: {
                gallery_id: pGallery.gallery_id
            }
        })
    } catch (error) {
        return error
    }
}

module.exports = GalleryController