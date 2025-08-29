const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");




dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/generate-audio", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.murf.ai/v1/speech/generate",
      {
        voice_id:"en-IN-aarav","style":"Narrative",
        text: req.body.text,
        format: "mp3"
      },
      {
        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "Authorization": `Bearer ${process.env.MURF_API_KEY}`,
          "api-key": process.env.MURF_API_KEY
        }
      }
    );

    res.json(response.data); // forward audioUrl back to frontend
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Murf API request failed" });
  }
});


app.post("/api/extract-text", upload.single("pdfFile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Extract text from PDF buffer
    const data = await pdfParse(req.file.buffer);

    res.json({
      text: data.text, // extracted text
      numPages: data.numpages,
      info: data.info,
    });
    
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Error extracting PDF text");
  }
});



app.post("/api/contact", async (req, res) => {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwkEk_1T1wL22SHQOWmJMLpyCbwBEBJwCBLswtCmb6CK-lb3hVy-KK6rQMIwQHXc-6k/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();

    res.json(data); // Send response back to frontend
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
