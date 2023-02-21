import React from "react";

function NavBar() {
    return(
        <nav class="navbar fixed-top bg-light">
            <div class="container-fluid">
                <a class="navbar-brand">HR system</a>
                <form class="d-flex" role="search">
                <button class="btn btn-outline-success" type="submit">Logout</button>
                </form>
            </div>
        </nav>
    );
}

export default NavBar;