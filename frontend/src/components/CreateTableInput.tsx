import { useState } from "react";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DialogFooter } from "./ui/dialog";
import { createTable} from "@/lib/api";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

interface Column {
    name: string;
    type: string;
}

const DATA_TYPES = ["INTEGER", "TEXT"];

interface CreateTableInputProps {
    onClose?: () => void;
    onRefresh? :() => void;
}

export function CreateTableInput({ onClose , onRefresh }: CreateTableInputProps) {
    const [tableName, setTableName] = useState("");
    const [columns, setColumns] = useState<Column[]>([{ name: "", type: "TEXT" }]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams<{ id: string }>();

   
    const handleAddColumn = () => {
        setColumns([...columns, { name: "", type: "TEXT" }]);
    }

    const handleRemoveColumn = (index: number) => {
        if (columns.length > 1) {
            setColumns(columns.filter((_, i) => i !== index));
        }
    }

    const handleColumnChange = (index: number, field: keyof Column, value: string) => {
        const newColumns = [...columns];
        newColumns[index] = { ...newColumns[index], [field]: value };
        setColumns(newColumns);
    }

    const handleCreate = async () => {

        if (!tableName.trim()) {
            toast.error("Table name is required");
            return;
        }
        setLoading(true);
        try {
            if (!id) {
                toast.error("Workspace ID not found");
                return;
            }
            const res = await createTable(id, tableName, columns);
            if (res.error) {
                toast.error(res.message || "Failed to create table");
            } else {
                toast.success("Table created successfully");
                onRefresh?.()
                if (onClose) onClose();
            }
        } catch (error: any) {
             toast.error(error.message || "Failed to create table");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="grid gap-4 py-4">
            <div className="grid gap-2">
                <label htmlFor="tableName" className="text-sm font-medium">Table Name <span className="text-red-800">*</span></label>
                <Input 
                    id="tableName" 
                    value={tableName} 
                    onChange={(e) => setTableName(e.target.value)} 
                    placeholder="users" 
                />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Columns <span className="text-red-800">*</span></label>
                    <Button variant="outline" size="sm" onClick={handleAddColumn}>
                        <Plus className="mr-2 h-4 w-4" /> Add Column
                    </Button>
                </div>

                <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
                    {columns.map((col, index) => (
                        <div key={index} className="flex gap-2 items-start">
                             <Input 
                                value={col.name} 
                                onChange={(e) => handleColumnChange(index, "name", e.target.value)} 
                                placeholder="Column Name" 
                                className="flex"
                            />
                            <select 
                                value={col.type} 
                                onChange={(e) => handleColumnChange(index, "type", e.target.value)}
                                className="h-8 rounded-md border border-input bg-background px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {DATA_TYPES.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleRemoveColumn(index)}
                                disabled={columns.length === 1}
                                className="text-muted-foreground hover:text-destructive"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <DialogFooter>
                <Button onClick={handleCreate} disabled={loading}>
                     {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Table
                </Button>
            </DialogFooter>
        </div>
    );
}