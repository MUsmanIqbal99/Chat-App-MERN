import {v4 as uuidv4} from 'uuid'
import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + uuidv4())
  }
})

export const upload = multer({
  storage
})