export default function MediaIcon({children, href}: {children: React.ReactNode, href: string}) {
    return (
        <a href={href} className="bg-blue-300 p-2 rounded-full hover:bg-blue-400 duration-100">
            {children}
        </a>
    )
}