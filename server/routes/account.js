import {Router} from 'express';
import accountCtrl from '../controllers/account.controller'
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const account = require("../models/account.model");



const router = Router();

router.get('/', accountCtrl.readAccountMethod);
router.get('/:accountId',accountCtrl.findAccountMethod);
router.post('/',accountCtrl.addAccountMethod);
router.put('/:accountId',accountCtrl.editAccountMethod);
router.delete('/:accountId',accountCtrl.deleteAccountMethod);

router.post("/tambah", upload.single("acco_avatar"), async (req, res) => {
    
    const result = await cloudinary.uploader.upload(req.file.path);
  
    const   {acco_username ,
            acco_nama,
            acco_phone ,
            acco_shopname ,
            acco_gender,
            acco_birthdate ,
            acco_user_id} = req.body.data;
    
    const akun = await req.context.models.account.create({
        acco_username : acco_username,
        acco_nama : acco_nama,
        acco_phone : acco_phone,
        acco_shopname : acco_shopname,
        acco_gender : acco_gender,
        acco_birthdate : acco_birthdate,
        acco_avatar : result.secure_url,
        acco_user_id : acco_user_id,
    });
    return res.send(akun);


  });

export default router;

