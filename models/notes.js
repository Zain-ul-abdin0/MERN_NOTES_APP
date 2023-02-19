const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

notesSchema.virtual('id').get(function(){
    return this._id.toHexString()
})
notesSchema.set('toJSON',{
    virtuals:true
})

exports.Notes = mongoose.model('Notes', notesSchema);