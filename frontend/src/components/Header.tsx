import { SidebarTrigger } from "@/components/ui/sidebar";
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
import { PlusIcon } from "lucide-react";

export function Header({ onRefresh }: { onRefresh?: () => void }) {
    const [open, setOpen] = useState(false);

    return (
        <header className="flex items-center justify-between p-2 border-b border-border shadow-sm px-4 ">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-xl font-bold ml-1">CipherSQLStudio</h1>
            </div>
            <div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button><PlusIcon/> Create Table</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                            <DialogTitle>Create New Table</DialogTitle>
                            <DialogDescription>
                                Define the table structure by adding columns.
                            </DialogDescription>
                        </DialogHeader>
                        <CreateTableInput onClose={() => setOpen(false)} onRefresh={onRefresh}/>
                    </DialogContent>
                </Dialog>
            </div>
        </header>
    );
}