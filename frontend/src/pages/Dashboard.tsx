import { Header } from "@/components/Header";
import Result from "@/components/Result";
import Sidebar from "@/components/sidebar/Sidebar";
import { SqlEditor } from "@/components/SqlEditor";
import { runQuery } from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleRunQuery = async (query: string) => {
        setLoading(true);
        try {
            const WORKSPACE_ID = "1765384183209"; 
            const data = await runQuery(WORKSPACE_ID, query);
            if (data.error) {
                toast.error(data.message);
                setResults([]);
            } else {
                setResults(data?.rows || []);
            }
        } catch (err: any) {
            toast.error(err.message || "Failed to run query");
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div className="flex">
                <Sidebar/>
                <div className="mx-5 my-4 w-full h-[calc(100vh-100px)] overflow-hidden flex flex-col">
                    <SqlEditor onRunQuery={handleRunQuery} isLoading={loading} />
                    <Result data={results} loading={loading} />
                </div>
            </div>
        </div>
    );
}