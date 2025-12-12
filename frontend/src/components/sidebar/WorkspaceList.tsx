import { useEffect, useState } from "react";
import { getAllWorkspaces } from "@/lib/api";
import { ChevronDown, ChevronRight, Briefcase } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Workspace {
    workspaceId: string;
    name: string;
    createdAt: string;
}

export function WorkspaceList() {
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        fetchWorkspaces();
    }, []);

    const fetchWorkspaces = async () => {
        try {
            const data = await getAllWorkspaces();
            
            if (data.success) {
                setWorkspaces(data.workspaces);
            }
        } catch (error) {
            console.error("Failed to fetch workspaces", error);
        }
    };

    return (
        <div className="py-2">
            <div className="w-full">
                <div className="flex items-center justify-between px-4">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Workspaces
                    </div>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-6 h-6 p-0"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <ChevronDown className="h-4 w-4" />
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                        <span className="sr-only">Toggle Workspaces</span>
                    </Button>
                </div>
                
                {isOpen && (
                    <div className="space-y-1 mt-2">
                        {workspaces.length === 0 ? (
                            <div className="px-4 py-2 text-sm text-muted-foreground">
                                No workspaces found
                            </div>
                        ) : (
                            workspaces.map((workspace) => (
                                <div key={workspace.workspaceId} className="px-2">
                                    <Button
                                        variant={id === workspace.workspaceId ? "secondary" : "ghost"}
                                        size="sm"
                                        className="w-full justify-start gap-2"
                                        onClick={() => {
                                            navigate(`/workspace/${workspace.workspaceId}`);
                                            toast.success(`Switched to ${workspace.name}`);
                                        }}
                                    >
                                        <Briefcase className="h-4 w-4" />
                                        <span className="font-normal">{workspace.name}</span>
                                    </Button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
