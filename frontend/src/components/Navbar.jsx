import {Link} from "react-router-dom";
import logo from "../assets/signbox-logo.svg";

function Navbar(){
    return(
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
            {/* logo */}
            <div className="flex items-center gap-2">
                <img src={logo} alt="SignBox Logo" className="w-8 h-8"/>
                <span className="text-xl font-bold text-[#2C2C2C]">SignBox</span>
            </div>

            {/* logout button */}
            <div>
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-[#853953] transition">
                Logout
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
