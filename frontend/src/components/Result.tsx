import { Table, Loader2 } from "lucide-react";

interface ResultProps {
    data?: any[] | null;
    loading?: boolean;
}

export default function Result({ data, loading = false }: ResultProps) {
    const columns = data && data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <div className="my-4 h-[300px] border border-border rounded-lg p-2 bg-card flex flex-col">
            <div className="flex items-center gap-2 border-b border-border pb-2 font-semibold shrink-0">
                <Table className="text-primary"/>
                <span>Result</span>
                {data && data.length > 0 && <span className="text-xs text-muted-foreground ml-2">({data.length} rows)</span>}
            </div>

            <div className="flex-1 overflow-auto min-h-0 bg-background/50 rounded-md mt-2 relative">
                {loading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="mt-2 text-sm text-muted-foreground">Running query...</p>
                    </div>
                ) : !data ? (
                     <div className="flex flex-col justify-center items-center h-full text-muted-foreground">
                        <Table className="h-10 w-10 mb-2 opacity-50"/>
                        <p>Run a query to see the result</p>
                    </div>
                ) : data.length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-full text-muted-foreground">
                         <div className="h-10 w-10 mb-2 opacity-50 border-2 border-dashed border-muted-foreground rounded flex items-center justify-center">
                            <span className="text-xl font-bold">!</span>
                         </div>
                        <p>No record found</p>
                    </div>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-muted/50 sticky top-0 z-0">
                            <tr>
                                {columns.map((col) => (
                                    <th key={col} className="px-4 py-2 font-medium text-muted-foreground whitespace-nowrap">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, i) => (
                                <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
                                    {columns.map((col) => (
                                        <td key={`${i}-${col}`} className="px-4 py-2 whitespace-nowrap">
                                            {typeof row[col] === 'object' ? JSON.stringify(row[col]) : String(row[col])}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}