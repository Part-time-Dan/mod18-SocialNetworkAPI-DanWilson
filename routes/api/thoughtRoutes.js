const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// routes for thoughts
router.get('/', getAllThoughts);
router.get('/:thoughtId', getThoughtById);
router.post('/', createThought);
router.put('/:thoughtId', updateThought);
router.delete('/:thoughtId', deleteThought);

// routes for reactions within a thought
router.post('/:thoughtId/reactions', createReaction);
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
