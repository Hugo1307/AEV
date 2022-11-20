const TopBar = () => {

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4">
            <a className="navbar-brand" href="/home">Food Co.</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active mx-4">
                        <a className="nav-link" href="/categories">Categories</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/profile">Profile</a>
                    </li>
                </ul>
            </div>
        </nav>

    );

}

export default TopBar;
