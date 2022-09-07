const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

//Routes1: Get All the notes using Get
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
    
        res.json(notes)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("error occured")
      }
})

//Routes2: Add a new note using post login required 
router.post('/addnote', fetchuser, [body('title', 'Enter a valid title').isLength({ min: 3 }),
body('description', 'Enter a valid title').isLength({ min: 5 })], async (req, res) => {
    try {
        const {title, description, tag} = req.body;
        //validation check
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        const notes = new Notes({
            title, description, tag , user: req.user.id
        })
        const savedNote = await notes.save()
    
        res.json(savedNote)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("error occured")
      }
})

//Routes3: Add a new note using put login required "api/auth/updatenote"
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        
        const{title, description, tag} = req.body;
        //Create a newNote object
        const newNote = {};
        if(title){
            newNote.title = title
        };
        if(description){
            newNote.description = description
        };
        if(tag){
            newNote.tag = tag
        };
    
        //find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send('Not Found')}
    
        if(note.user.toString() !== req.user.id ){
            return res.status(401).send('Not Allowed')
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote},{new:true})
        res.json({note});

    } catch (error) {
        console.log(error.message)
        res.status(500).send("error occured")
      }

})


//Routes4: Delete a note using delete login required "api/auth/updatenote"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    
    try {
        //find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if(!note){return res.status(404).send('Not Found')}
        //Allow deletion only if user owns this note
        if(note.user.toString() !== req.user.id ){
            return res.status(401).send('Not Allowed')
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({sucess:"deleted",note:note});

        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("error occured")
      }



})

module.exports = router