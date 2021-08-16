import { Redirect, Route, Switch } from "react-router-dom";
import AddMeeting from "../../CompanyArea/AddMeeting/AddMeeting";
import MeetingsList from "../../CompanyArea/meetingsList/meetingsList";
import Home from "../Home/Home";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Switch>
                <Route path="/home" component={Home} exact />
                <Route path="/meetings" component={MeetingsList} exact />
                <Route path="/add-meeting" component={AddMeeting} exact />
                <Redirect from="/" to="/home" exact />
            </Switch>
        </div>
    );
}

export default Routing;
