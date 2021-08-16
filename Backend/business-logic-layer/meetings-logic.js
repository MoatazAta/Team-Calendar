const dal = require("../data-access-layer/dal");

async function getAllTeamsAsync() {
    const sql = "SELECT * FROM teams"
    const teams = await dal.executeAsync(sql);
    return teams;
}

async function getMeetingPerTeamAsync(teamId){
    const sql = `SELECT M.*, T.teamName
    FROM Meeting AS M JOIN teams AS T
    ON M.teamId = T.teamId
    WHERE M.teamId = ${teamId}`;
    const meetings = await dal.executeAsync(sql);
    return meetings;
}

async function addMeetingAsync(meeting) {
    const sql = "INSERT INTO meeting VALUES(DEFAULT, ?, ?, ?, ?, ?)";
    const info = await dal.executeAsync(sql, [meeting.teamId, meeting.startTime, meeting.endTime, meeting.description, meeting.room]);
    meeting.meetingId = info.insertId;
    return meeting;
}

module.exports = {
    getAllTeamsAsync,
    getMeetingPerTeamAsync,
    addMeetingAsync
};