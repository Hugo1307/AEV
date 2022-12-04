import {removeAccessToken} from "../api/authHandler";
import {toast} from "react-toastify";

const TopBar = (props) => {

    const logOut = () => {

        removeAccessToken();
        toast("Logging Out...")

        setTimeout(() => window.location = "/", 2000);

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4">
            <a className="navbar-brand" href="/home">Food Co.</a>

            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active mx-3">
                        <a className="nav-link" href="/categories">Categories</a>
                    </li>
                    <li className="nav-item mx-3">
                        <a className="nav-link" href="/profile">Profile</a>
                    </li>
                    {
                        props.loggedIn ? <li className="nav-item mx-3">
                            <button type="button" className="btn btn-dark nav-item" onClick={() => logOut()}>Log-out</button>
                        </li> : <li></li>
                    }
                </ul>
            </div>
        </nav>

    );

}

export default TopBar;
