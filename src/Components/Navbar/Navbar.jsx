import React from "react";
import Fire from "../../assets/fire.png";

import Party from "../../assets/partying-face.png";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-8 py-6 bg-black/60 backdrop-blur-sm">
            <h1 className="text-4xl font-extrabold text-red-600">Movie4u</h1>

            <input type="text" placeholder="Serach Any movie..." className="rounded bg-black text-white border border-black p-2 mr-8"></input>

            
        </nav>
    )
}

export default Navbar;
