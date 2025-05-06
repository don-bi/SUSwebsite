import { FaEarthAfrica } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-slate-300 py-4 px-16 mt-20 flex items-center gap-4">
            <FaEarthAfrica size={24} />
            <p>SUSTAINABLE PORT JEFFERSON</p>
        </footer>
    )
}