const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 4000;

app.use(express.json());

app.get('/external-api', async (req, res) => {
    try {
        const { version, appKey } = req.query;
        const response = await axios.get('https://apis.openapi.sk.com/tmap/jsv2', {
            params: { version, appKey }
        });
        res.type('application/javascript');
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
});

app.get('/reverse-geocode', async (req, res) => {
    try {
        const response = await axios.get('https://apis.openapi.sk.com/tmap/geo/reverseLabel', {
            params: req.query
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
});

app.get('/puzzle/:poiId', async (req, res) => {
    try {
        const { poiId } = req.params;
        const { format, appKey, lat, lng } = req.query;
        const response = await axios.get(`https://apis.openapi.sk.com/tmap/puzzle/pois/${poiId}`, {
            params: { format, appKey, lat, lng }
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

