import { Header } from "@/components/Header";
import { LLM } from "@/components/LLM";
import Result from "@/components/Result";
import { AppSidebar } from "@/components/sidebar/Sidebar";
import { SqlEditor } from "@/components/SqlEditor";
import { runQuery } from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";


export default function Dashboard() {
    const [results, setResults] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(false);

    const [openLLM, setOpenLLM] = useState(true);
    const isMobile = useIsMobile();
    const navigate = useNavigate();
    const [refreshTables, setRefreshTables] = useState(false);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id) {
            navigate("/");
            toast.error("Please select a workspace");
        }
    }, [id, navigate]);
    const handleRunQuery = async (query: string) => {
        setLoading(true);
        try {
            if (!id) {
                toast.error("No workspace found, please create one.");
                return;
            }
            const data = await runQuery(id, query);
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
        <SidebarProvider>
            <AppSidebar refresh={refreshTables} />
            <SidebarInset>
                <Header onRefresh={() => setRefreshTables(prev => !prev)} />
                <div className="flex h-full w-full overflow-hidden relative">
                    <div className={`flex-1 w-full ${openLLM && !isMobile ? "md:w-[70%]" : "md:w-full"} justify-center overflow-auto flex flex-col h-full p-4 transition-all duration-300`}>
                        <SqlEditor 
                            onRunQuery={handleRunQuery} 
                            isLoading={loading} 
                            onOpenAI={() => setOpenLLM(true)}
                        />
                        <Result data={results} loading={loading} />
                    </div>
                    {openLLM && !isMobile && (
                        <div className="hidden md:block w-[30%] h-full p-4 border-l border-border animate-in slide-in-from-right-10 duration-300">
                             <LLM isOpen={openLLM} onClose={() => setOpenLLM(false)} />
                        </div>
                    )}

                    {isMobile && (
                        <Sheet open={openLLM} onOpenChange={setOpenLLM}>
                            <SheetContent side="bottom" className="h-[80vh] p-2 my-8 mx-8">
                                <SheetHeader className="sr-only">
                                    <SheetTitle>Cipher AI</SheetTitle>
                                    <SheetDescription>Ask for SQL hints</SheetDescription>
                                </SheetHeader>
                                <div className="h-full pt-4">
                                     <LLM isOpen={openLLM} onClose={() => setOpenLLM(false)} />
                                </div>
                            </SheetContent>
                        </Sheet>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}