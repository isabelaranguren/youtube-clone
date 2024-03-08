import express from 'express';
import ffmpeg from 'fluent-ffmpeg';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());


// TODO: ADD LOGGING 
app.post("/process-video", (req, res) => {
    // Get the path of the input video file from the request body
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    // Check if the input file path is defined
    if (!inputFilePath || !outputFilePath) {
        return res.status(400).send('Bad Request: Missing file path');
    }

    ffmpeg(inputFilePath)
    .outputOptions('-vf', 'scale=-1:360')
    .on('end', () => {
        console.log("Processing finished succesfully");
        res.status(200).send("Processing finished succesfully");
    })
    .on('error', (err) => {
        console.log(`An error occurred:  + ${err.message}`);
        res.status(500).send(`Internal Server Error: +${err.message}`);
    })
    .save(outputFilePath);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


