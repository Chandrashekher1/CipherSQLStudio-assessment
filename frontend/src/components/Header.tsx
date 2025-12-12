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

interface HeaderProps {
    onRefresh?: () => void;
    workspaceName?: string;
}

export function Header({ onRefresh, workspaceName }: HeaderProps) {
    const [open, setOpen] = useState(false);

    return (
        <header className="flex items-center justify-between py-4 px-4 border-b border-border shadow-sm">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="md:text-xl font-semibold  md:ml-1 bg-white text-muted-foreground rounded-full md:px-2 py-1">{workspaceName}</h1>
            </div>
            <div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button><PlusIcon/> <span className="hidden md:inline">Create Table</span></Button>
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