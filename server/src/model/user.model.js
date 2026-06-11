import {model , Schema} from 'mongoose'
import { ROLES } from '../constants/model.constants.js'

const userSchema = new Schema(
  {
    name: { type: String,
         required: true,
          trim: true },
    email: { type: String,
         required: true, 
         unique: true,
          lowercase: true,
           trim: true },
    password: { type: String},

    role: {
         type: String,
         enum: Object.values(ROLES),
          default: ROLES.SCORER
         },
    isDeleted: {
         type: Boolean,
          default: false
         },
  },
  { timestamps: true }
)

const userModel  = model('user', userSchema)

export default  userModel
