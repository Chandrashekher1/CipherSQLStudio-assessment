import { Table } from "lucide-react";

export default function Result() {
    return (
        <div className="my-4 h-[200px] border border-border rounded-lg p-2 bg-card ">
            <div className="flex items-center gap-2 border-b border-border pb-2 font-semibold">
                <Table className="text-primary"/>
                <span>Result</span>
            </div>

            <div className="flex flex-col justify-center items-center h-full overflow-y-auto">
                <Table className="text-muted-foreground"/>
                <p className="text-muted-foreground">Run a query to see the result</p>
            </div>
        </div>
    );
}