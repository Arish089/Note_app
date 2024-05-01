const {Router} = require('express');
const notesModel = require('../models/noteModel');
const auth = require('../middleware/auth.middleware');

const noteRouter = Router();


noteRouter.post('/create',auth, async(req, res)=>{
    const {userId, title, description, username} = req.body;
    console.log(userId);
    try {
        const newNote = new notesModel({title, description, userId, username})
        await newNote.save();
        res.status(200).send("Note created successfully")
    } catch (error) {
       return res.status(500).json({message:error}) 
    }
})

noteRouter.get('/',auth, async(req, res)=>{
    const {userId, username} = req.body
    try {
        const notes = await notesModel.find({userId});
        res.status(200).send(notes)
    } catch (error) {
        res.status(500).send({message:"Error while getting the notes"}) 
    }
})

noteRouter.patch('/update/:id',auth, async(req, res)=>{
const {id} = req.params;
try {
    await notesModel.findByIdAndUpdate({_id:id},req.body)
    res.status(200).json({
        message: `Note updated successfully with id: ${id}`
    })
} catch (error) {
    res.status(500).json("Error while updating the note:",error)
}
})

noteRouter.delete('/delete/:id',auth, async(req, res)=>{
    const {id} = req.params;
    try {
        await notesModel.findByIdAndDelete({_id:id})
        res.status(200).json({
            message: `Note deleted successfully with id: ${id}`
        })
    } catch (error) {
        res.status(500).json("Error while deleting the note:",error)
    }
    })
module.exports = noteRouter;