const express = require('express');

const db = require('../knexfile/lambda-notes.sqlite3');

const router = express.Router();

router.get('/', (req, res) => {
    db.find()
        .then(notes => {
            res.status(200).json(notes);
        })
        .catch(err => {
            console.error('error', err);

            res.status(500).json({ error: "The notes could not be retrieved." })
        });
})

router.get('/notes/:_id', (req, res) => {
    const { _id } = req.params;
    db.find(_id)
        .then(count => {
            if(count) {
                res.status(200).json(note);
            } else {
                res.status(404).json({ message: "The note with the specified ID does not exist." });
            }
        })
        .catch(err => res.status(500).json({ error: "The note could not be retrieved." }));
});

router.post('/create', async (req, res) => {
    const note = req.body;
    if(note.title && note.textBody) {
        try {
            const response = await db.insert(note);
            res.status(201).json(note);
        } catch(err) {
            res.status(500).json({ error: "There was an error while saving the note to the database" });
        }
    } else {
        res.status(400).json({ errorMessage: "Please provide a title and text body for the note." });
    }
});

router.delete('/notes/:_id/delete', (req, res) => {
    const { _id } = req.params;
    db.remove(_id)
        .then(count => {
            if(count) {
                res.status(200).json(note);
            } else {
                res.status(404).json({ message: "The note with the specified ID does not exist." });
            }
        })
        .catch(err => res.status(500).json({ error: "The note could not be removed" }));
});

router.put('/edit/:_id', (req, res) => {
    db.update(req.params._id, req.body)
        .then(notes => {
            res.status(200).json(note);
            if(!note.title || !note.textBody) {
                res.status(400).json({ errorMessage: "Please provide a title and text body for the note." });
            }
            if(!count) {
                res.status(404).json({ message: "The note with the specified ID does not exist." });
            }
        })
        .catch(err => res.status(500).json({ error: "The note could not be modified." }))
})

module.exports = router;