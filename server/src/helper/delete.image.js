const fs = require('fs').promises; 

const deleteImage = async (userImagePath) => {
    try {
        await fs.access(userImagePath)
        await fs.unlink(userImagePath)
        console.log("image was deleted")
    } catch (error) {
        console.error('image does not exist or could not be deleted.')
    }
};


module.exports = deleteImage;