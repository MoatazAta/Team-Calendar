import { NavLink } from "react-router-dom";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
			<h1> Team Calender </h1>
            <hr />
            <NavLink to="/home" exact>Home</NavLink>
            <span> | </span>
            <NavLink to="/meetings" exact>Meetings</NavLink>
            <span> | </span>
            <NavLink to="/add-meeting" exact>Add Meeting</NavLink>

            <Routing />
        </div>
    );
}

export default Layout;
