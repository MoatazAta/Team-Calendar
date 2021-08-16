const express = require("express");
const logic = require("../business-logic-layer/meetings-logic");
const router = express.Router();

router.get("/api/teams", async (request, response) => {
    try {
        const teams = await logic.getAllTeamsAsync();
        response.json(teams);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

router.get("/api/meetings-per-team/:teamId", async (request, response) => {
    try {
        const teamId = +request.params.teamId;
        const meetings = await logic.getMeetingPerTeamAsync(teamId);
        response.json(meetings);
    }
    catch(err) {
        response.status(500).send(err.message);
    }
});

router.post("/api/meetings", async(request, response) => {
    try {
        const meeting = request.body;
        const addedMeeting = await logic.addMeetingAsync(meeting);
        response.status(201).json(addedMeeting);
    } catch (error) {
        response.status(500).send(error.message);
    }
});

module.exports = router;