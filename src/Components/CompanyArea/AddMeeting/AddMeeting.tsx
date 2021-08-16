import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import MeetingModel from "../../../Models/MeetingModel";
import "./AddMeeting.css";
import axios from "axios";
import TeamModel from "../../../Models/TeamModel";

function AddMeeting(): JSX.Element {

    const history = useHistory();
    const [teams, setTeams] = useState<TeamModel[]>([]);
    const { register, handleSubmit, formState } = useForm<MeetingModel>();

    useEffect(() => {
        axios.get<TeamModel[]>("http://localhost:3001/api/teams")
            .then(response => setTeams(response.data))
            .catch(err => alert(err.message));
    });


    async function send(meeting: MeetingModel) {
        try {
            await axios.post<MeetingModel>("http://localhost:3001/api/meetings", meeting);
            alert("Meeting added"); 
            history.push("/meeting");
        }
        catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="AddMeeting">
			<h2>Add Meeting</h2>
            <form onSubmit={handleSubmit(send)}>

                <label>Team: </label>
                <select {...register("teamId", { min: 1 })}>
                    <option disabled selected value="0">Select Team</option>
                    {teams.map(t => <option key={t.teamId} value={t.teamId}>{t.teamName}</option>)}
                </select>

                {formState.errors.teamId?.type === "min" && <span>Missing name</span>}

                <label>Start Time:</label>
                <input type="datetime-local" {...register("startTime", { required: true })} />
                {formState.errors.startTime?.type === "required" && <span>Missing Start Time</span>}

                <label>End Time:</label>
                <input type="datetime-local" {...register("endTime", { required: true })} />
                {formState.errors.endTime?.type === "required" && <span>Missing End Time</span>}

                <label>Description:</label>
                <input type="text" {...register("description", { required: true })} />
                {formState.errors.description?.type === "required" && <span>Missing description</span>}

                <label>Room:</label>
                <input type="text" {...register("room", { required: true })} />
                {formState.errors.room?.type === "required" && <span>Missing room</span>}

                <button>Add</button>

            </form>
        </div>
    );
}

export default AddMeeting;
