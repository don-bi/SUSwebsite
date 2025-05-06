import MediaIcon from "./MediaIcon";
import { FaInstagram, FaTwitter } from "react-icons/fa6";
import { FaSearch, FaFacebookF } from "react-icons/fa";

export default function Header() {
    return (
        <div className="relative">
            <header className="bg-slate-100
            py-4 px-16
            flex justify-between
            border-b-4 border-sky-300">
                <h1 className="text-7xl">SUSPJ</h1>
                {/* right part of header */}
                <div className="flex flex-col gap-4">
                    <ul className="flex gap-2">
                        <MediaIcon href="#"><FaInstagram size={16}/></MediaIcon>
                        <MediaIcon href="#"><FaFacebookF size={16}/></MediaIcon>
                        <MediaIcon href="#"><FaTwitter size={16}/></MediaIcon>
                    </ul>
                    <div className="relative flex items-center">
                        <input type="text" placeholder="Search" className="px-6 py-1 rounded-md"/>
                        <button className="absolute right-0 pr-2"><FaSearch/></button>
                    </div>
                </div>
            </header>

            <div className="bg-slate-300
            py-4 pb-12 px-16
            text-4xl font-semibold underline underline-offset-4">
                {"Projects > Upper Port Urban Renewal"}
            </div>
            
            <nav className="bg-slate-800 
            absolute left-0 right-0 bottom-0 transform translate-y-1/2 mx-16">
                <ul className="text-white flex text-xl justify-center">
                    <li className="hover:bg-slate-700 py-2 px-4 duration-200"><a href="#">Home</a></li>
                    {/* <li className="hover:bg-slate-700 py-2 px-4 duration-200"><a href="#">Projects</a></li>
                    <li className="hover:bg-slate-700 py-2 px-4 duration-200"><a href="#">About</a></li>
                    <li className="hover:bg-slate-700 py-2 px-4 duration-200"><a href="#">Contact</a></li> */}
                </ul>
            </nav>
        </div>
    )
}