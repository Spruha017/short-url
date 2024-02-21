const express= require("express");
const urlRoute= require("./routes/url");
const { connectToMongoDB } = require("./connect");
const URL = require('./models/url');
const app= express();
const PORT= 8000;


// connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(console.log("Mongodb connected"));
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Error connecting to MongoDB:", err));


app.use(express.json());
app.use("/url", urlRoute);

app.get('/:shortId', async (req, res) =>{
    const shortId = req.params.shortId;

   const entry = await  URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory : {timestamp : Date.now(),}
            },
        },
    );

    res.redirect(entry.redirectURL);
});

app.listen(PORT, ()=> console.log("server started at ${PORT}"))