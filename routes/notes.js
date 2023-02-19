const express = require('express');
const {Notes} = require('../models/notes');
const router = express.Router();
const mongoose = require('mongoose');


router.get(`/`, async(req,res) =>{

    const notesList = await Notes.find().then((notesList=>{
        res.status(200).json(notesList)
    })).catch((err)=>{
        res.send(500).json({
            error:err,
            success:false
        })
    })

})

router.post(`/`, async(req,res)=>{
    let note = new Notes({
        name:req.body.name,
        description: req.body.description

    })
    note = await note.save();
    if(!note){
        return res.status(500).send('The note cannot be created')
    }
    return res.send(note)
})

router.put(`/update/:id`, async(req,res)=>{
    let note = await Notes.findByIdAndUpdate(
        req.params.id,{
            name : req.body.name,
            description: req.body.description
        },{
            new : true
        }
    ).then((note=>{
        res.status(200).send('Note is updated');
    })).catch((err=>{
        res.send(500).json({
            error:err,
            success:false
        })
    }))
})

router.delete(`/delete/:id`, async(req,res)=>{
    Notes.findByIdAndRemove(req.params.id).then(note=>{
        if(note){
            return res.status(200).json({
                success:true,
                message:'Note is Successfully deleted'
            })
        }
        else{
            return res.status(400).json({
                success:true,
                message:'Note is not deleted'
            })
        }
    })
})

module.exports = router; 