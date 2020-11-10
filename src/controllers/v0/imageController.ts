import {filterImageFromURL, deleteLocalFiles} from '../../util/util';
import express from 'express';
import validUrl from 'valid-url';
import { requireAuth } from '../../util/auth';


const router = express.Router();
router.get('/filteredimage', requireAuth, async (req, res) => {
    const image_url = decodeURIComponent(req.query.image_url);
    // url 
    console.log(image_url)
    if (!validUrl.isUri(image_url)) return res.status(400).end();
    const imagePath = await filterImageFromURL(image_url);
    res.sendFile(imagePath, () => {

        deleteLocalFiles([imagePath]);
    });
    
})

export default router