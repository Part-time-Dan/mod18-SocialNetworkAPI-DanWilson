const { User, Thought } = require('../models');

const thoughtController = {
    getAllThoughts: async (req, res) => {
        // all thoughts
    },

    getThoughtById: async (req, res) => {
        // get a single thought by its _id
    },

    createThought: async (req, res) => {
        // create a new thought
    },

    updateThought: async (req, res) => {
        // update a thought by its _id
    },

    deleteThought: async (req, res) => {
        // delete a thought by its _id
    },

    createReaction: async (req, res) => {
        // create a reaction within a thought's reactions array
    },

    deleteReaction: async (req, res) => {
        // delete a reaction from a thought's reactions array
    }
};

module.exports = thoughtController;
