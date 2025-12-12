import { Database } from "lucide-react";
import { Button } from "./ui/button";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "./ui/dialog";
import { CreateTableInput } from "./CreateTableInput";
import { useState } from "react";

export function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="flex items-center justify-between p-2 border-b border-boder shadow-sm px-4 cursor-pointer">
            <div className="flex items-center border-r border-boder pr-2">
                <span className="bg-blue-500 rounded p-2 text-white rounded-full"><Database/></span>
                <h1 className="text-xl font-bold ml-1">CipherSQLStudio</h1>
            </div>
            <div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Create Table</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                            <DialogTitle>Create New Table</DialogTitle>
                            <DialogDescription>
                                Define the table structure by adding columns.
                            </DialogDescription>
                        </DialogHeader>
                        <CreateTableInput onClose={() => setOpen(false)} />
                    </DialogContent>
                </Dialog>
            </div>
        </header>
    );
}