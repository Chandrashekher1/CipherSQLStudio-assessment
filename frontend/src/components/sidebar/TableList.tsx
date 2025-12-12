import { useEffect, useState } from "react";
import { getTables } from "@/lib/api";
import { ChevronDown, ChevronRight, PlusCircleIcon, Table } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import InsertRowForm from "../InsertForm";

interface Column {
  name: string;
  type: string;
}


interface TableData {
  tableName: string;
  columns: Column[];
}

interface TableListProps {
    refresh?: boolean;
}

export function TableList({ refresh }: TableListProps) {
    const { id } = useParams<{ id: string }>();
    const [tables, setTables] = useState<TableData[]>([]);
    const [isOpen, setIsOpen] = useState(true);
    const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>({});
    const [selectedTable, setSelectedTable] = useState<TableData | null>(null);

    useEffect(() => {
        if(id){
            fetchTables();
        }
    }, [id, refresh])

    const fetchTables = async () => {
        try {
            const data = await getTables(id!);
            if (data.success) {
                setTables(data.tables);
            }
        } catch (error) {
            console.error("Failed to fetch tables", error);
        }
    };

    const toggleTable = (tableName: string) => {
        setExpandedTables(prev => ({
            ...prev,
            [tableName]: !prev[tableName]
        }));
    };

    const handleInsertClick = (e: React.MouseEvent, table: TableData) => {
        e.stopPropagation();
        setSelectedTable(table);
    }

    return (
        <div className="flex-1 overflow-y-auto py-2">
            <div className="flex items-center justify-between px-4 pb-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Tables
                    <span className="ml-2 text-xs text-muted-foreground bg-muted px-1 rounded-full">{tables.length}</span>
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
                    <span className="sr-only">Toggle Tables</span>
                </Button>
            </div>
            
            {isOpen && (
                tables.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-muted-foreground">No tables found</div>
                ) : (
                    <div className="space-y-1">
                        {tables.map((table) => (
                            <div key={table.tableName} className="px-2">
                                <button
                                    onClick={() => toggleTable(table.tableName)}
                                    className="w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                                >
                                    {expandedTables[table.tableName] ? (
                                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    <Table className="h-4 w-4 text-blue-500" />
                                    <span className="truncate">{table.tableName}</span>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="ml-auto cursor-pointer h-6 w-6" 
                                        onClick={(e) => handleInsertClick(e, table)}
                                    >
                                        <PlusCircleIcon className="h-4 w-4"/>
                                    </Button>
                                </button>
                                {expandedTables[table.tableName] && (
                                    <div className="ml-9 mt-1 space-y-1">
                                        {table.columns.map((column, idx) => (
                                            <div key={idx} className="flex items-center justify-between text-xs py-1 pr-2 text-muted-foreground hover:text-foreground">
                                                <div className="flex items-center gap-2">
                                                     <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                                                    <span className="truncate">{column.name}</span>
                                                </div>
                                                <span className="text-[10px] bg-secondary px-1 py-0.5 rounded text-secondary-foreground">{column.type}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )
            )}

            <Dialog open={!!selectedTable} onOpenChange={(open) => !open && setSelectedTable(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Insert Row</DialogTitle>
                        <DialogDescription>
                            Enter values for the table columns.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedTable && (
                        <InsertRowForm 
                            workspaceId={id!} 
                            table={selectedTable} 
                            onClose={() => setSelectedTable(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
