import axios from "axios";
import { Component, SyntheticEvent } from "react";
import MeetingModel from "../../../Models/MeetingModel";
import teamModel from "../../../Models/TeamModel";
import "./meetingsList.css";

interface MeetingsListState {
	teams: teamModel[];
    meetings: MeetingModel[];
}

class MeetingsList extends Component<{}, MeetingsListState> {

    public constructor(props: {}) {
        super(props);
        this.state = { teams:[] , meetings: [] };
    }

    public async componentDidMount(){
        try {
            const response = await axios.get<teamModel[]>("http://localhost:3001/api/teams");
            this.setState({teams: response.data});
        } 
        catch (error) {
            alert(error.message);
        }
    }

    private teamSelected = async (args: SyntheticEvent) => {
        try {
            const teamId = (args.target as HTMLSelectElement).value;
            const response = await axios.get<MeetingModel[]>("http://localhost:3001/api/meetings-per-team/" + teamId);
            this.setState({meetings: response.data });
            } 
        catch (error) {
            alert(error.message);
        }
    }
    
    public render(): JSX.Element {
        return (
            <div className="meetingsList">
				<h2>Meetings</h2>
                <select onChange={this.teamSelected}>
                    <option selected disabled value="0">Select Team</option>
                    {this.state.teams.map(t => <option key={t.teamId} value={t.teamId} >{t.teamName}</option>)}
                </select>
                {this.state.meetings.length > 0 && <table>
                    <thead>
                        <tr>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Description</th>
                            <th>Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.meetings.map(m=> 
                            <tr key={m.meetingId}>
                                <td>{m.startTime}</td>
                                <td>{m.endTime}</td>
                                <td>{m.description}</td>
                                <td>{m.room}</td>
                            </tr>
                            )}
                    </tbody>
                </table>}
                {this.state.meetings.length === 0 && <p>No meetings to show</p>}
            </div>
        );
    }
}

export default MeetingsList;
