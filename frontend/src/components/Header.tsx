import { Database } from "lucide-react";

export function Header() {
    return (
        <header className="flex items-center justify-between p-2 border-b border-boder shadow-sm px-4">
            <div className="flex items-center border-r border-boder pr-2">
                <span className="bg-blue-500 rounded p-2 text-white rounded-full"><Database/></span>
                <h1 className="text-xl font-bold ml-1">CipherSQLStudio</h1>
            </div>
        </header>
    );
}