import { useState } from "react";
import { insertRow } from "@/lib/api";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Loader2, MoveRightIcon } from "lucide-react";
import { Input } from "./ui/input";

interface InsertRowFormProps {
    workspaceId: string;
    table: any;
    onClose?: () => void;
}

export default function InsertRowForm({ workspaceId, table, onClose }: InsertRowFormProps) {
  const [row, setRow] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (col: string, value: string) => {
    setRow({ ...row, [col]: value });
  }
  const handleSubmit = async () => {
    setLoading(true);
    try {
        const res = await insertRow(workspaceId, table.tableName, row);
        if (res.success) {
            toast.success("Row inserted successfully");
            if (onClose) onClose();
        } else {
            toast.error(res.message || "Failed to insert row");
        }
    } catch (error: any) {
        console.error(error);
        toast.error(error.message || "An unexpected error occurred");
    } finally {
        setLoading(false);
    }
  }
  return (
    <div className="">
      <h2 className="font-bold">Insert into <span className="font-semibold text-muted-foreground">{table.tableName}</span></h2>

      {table.columns.map((col: any) => (
        <div key={col.name} className="">
            <label className="text-sm font-medium">{col.name} <span className="text-red-800">*</span></label>
            <Input
                value={row[col.name] || ""}
                onChange={(e) => handleChange(col.name, e.target.value)}
                disabled={loading} 
            />
        </div>
      ))}

      <Button onClick={handleSubmit} variant="default" className="mt-4" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <MoveRightIcon className="mr-2 h-4 w-4" /> Insert Row
      </Button>
    </div>
  );
}
