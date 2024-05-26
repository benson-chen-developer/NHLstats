const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get("/teams", async (req, res) => {
    try {
        const response = await axios.get("https://api.nhle.com/stats/rest/en/team/summary");
        const teamData = response.data;

        res.json(teamData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch team data' });
    }
});

app.get("/triCodes", async (req, res) => {
    try {
        const response = await axios.get("https://api.nhle.com/stats/rest/en/team");
        const data = response.data.data;

        const ret = [];
        data.forEach((team) => {
            ret.push({fullName: team.fullName, triCode: team.triCode})
        })

        res.json(ret);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch team data' });
    }
});

app.get("/clubStats/:code", async (req, res) => {
    try {
        const response = await axios.get(`https://api-web.nhle.com/v1/club-stats/${req.params.code}/now`);
        const data = response.data;

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch team data' });
    }
});

app.listen(3001, () => {
    console.log("Server is on 3001")
})