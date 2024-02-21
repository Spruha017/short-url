


// // var generateId = require('time-uuid');
// const URL = require('../models/url');
// const shortid = require("shortid");

// async function handleGenerateNewShortURL(req, res) {
//     const body = req.body;
//     if (!body.url) return res.status(400).json({ error: 'url is required' });
  
//     const shortID =  shortid();
  
//     await URL.create({
//         shortId: shortID,
//         redirectURL: body.url,
//         visitHistory: [], // Corrected typo in visitHistory
//     });

//     return res.json({ id: shortID}); // Returning the generated ID
// }

// async function handleGetAnalytics(req, res) {
//     const shortId = req.params.shortId;
//     const result = await URL.findOne({ shortID });
//     return res.json({ totalClicks: result.vistiHistory.length, analytics: result.vistiHistory });
// }

// module.exports = {
//     handleGenerateNewShortURL,
//     handleGetAnalytics,
// };

// Import the Mongoose model for URLs
const URLModel = require('../models/url');
const shortid = require("shortid");


async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' });
  
    const shortID = shortid.generate();
  
    // Use the Mongoose model's create method
    await URLModel.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    // Use the Mongoose model's findOne method
    const result = await URLModel.findOne({ shortId });
    if (!result) {
        return res.status(404).json({ error: 'Short URL not found' });
    }
    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};

