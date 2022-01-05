import { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import UserContext from "../Context/UserContext";

function NavBar() {

    const context = useContext(UserContext);

    const [isOpen, setIsOpen] = useState(false);//States to handle the toggle

    //This method is specially for toggling when the screen size reduces to mobile screen size
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" >Anime Facts</a>
                <button onClick={toggle} class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={!isOpen ? false : true} aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${isOpen ? "collapse" : ""} navbar-collapse`} id="navbarNav">
                    <ul className="navbar-nav ms-auto ">
                        {   
                            //Checking whether user is present or not and showing the links accordingly
                            context.user ? (
                                <NavLink onClick={() => { context.setUser(null); }} to="/signup" className="nav-item text-white">
                                    Logout
                                </NavLink>) : (
                                <>
                                    <NavLink to="/signup" className="nav-item text-white mx-2">
                                        SignUp
                                    </NavLink>
                                    <NavLink to="/signin" className="nav-item text-white mx-2">
                                        SignIn
                                    </NavLink>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
