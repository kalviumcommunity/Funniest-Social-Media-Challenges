const express = require('express');
const router = express.Router();
const model = require('./schema'); // Adjust the path if `schema.js` is located elsewhere

// Create (POST)
router.post('/post', async (req, res) => {
    try {
        const funny = req.body;

        // Validate input
        if (!funny.challenge || !funny.description) {
            return res.status(400).send({ msg: "Enter all required fields: id, challenge, and description" });
        }

        // Create and save a new document
        const newFunny = new model(funny);
        const savedFunny = await newFunny.save();

        return res.status(200).send({ msg: "Challenge created successfully", data: savedFunny });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ msg: "Something went wrong", error });
    }
});

// Read All (GET)
router.get('/get', async (req, res) => {
    try {
        const challenges = await model.find(); // Fetch all documents
        return res.status(200).send({ msg: "Challenges retrieved successfully", data: challenges });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ msg: "Something went wrong", error });
    }
});


// Update (PUT)
router.put('/update/:id', async (req, res) => {
    try {
        const {id} = req.params.id;
        const updates = req.body; // Updates sent in the request body

        // Update the document
        const updatedChallenge = await model.findOneAndUpdate({ id }, updates, { new: true });

        if (!updatedChallenge) {
            return res.status(404).send({ msg: "Challenge not found" });
        }

        return res.status(200).send({ msg: "Challenge updated successfully", data: updatedChallenge });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ msg: "Something went wrong", error });
    }
});

// Delete (DELETE)
router.delete('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params.id;

        // Delete the document
        const deletedChallenge = await model.findOneAndDelete({ id });

        if (!deletedChallenge) {
            return res.status(404).send({ msg: "Challenge not found" });
        }

        return res.status(200).send({ msg: "Challenge deleted successfully", data: deletedChallenge });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ msg: "Something went wrong", error });
    }
});

module.exports = router;