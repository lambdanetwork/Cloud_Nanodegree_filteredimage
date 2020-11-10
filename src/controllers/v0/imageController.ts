import {filterImageFromURL, deleteLocalFiles} from '../../util/util';
import express from 'express';
import validUrl from 'valid-url';
import { requireAuth } from '../../util/auth';


const router = express.Router();
router.get('/filteredimage', requireAuth, async (req, res) => {
    const image_url: string = decodeURIComponent(req.query.image_url);
    // url 
    try {
        if (!validUrl.isUri(image_url)) return res.status(400).send('image_url is not valid url');
        const imagePath: string = await filterImageFromURL(image_url);
        res.status(200).sendFile(imagePath, () => {
            deleteLocalFiles([imagePath]);
        });
    } catch(err){
        res.status(500).json({
            messages: "Error processing file"
        })
    }
    
})

export default router