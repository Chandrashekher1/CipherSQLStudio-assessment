import { PlayIcon, Sparkles, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import Editor from "@monaco-editor/react";
import { useState } from "react";

interface SqlEditorProps {
    onRunQuery?: (query: string) => void;
    isLoading?: boolean;
    onOpenAI?: () => void;
}

export function SqlEditor({ onRunQuery, isLoading, onOpenAI }: SqlEditorProps) {
    const [code, setCode] = useState(`-- Welcome to CipherSQLStudio!
-- Write your SQL queries here
SELECT * FROM users;`);

    const handleRunClick = () => {
        if (onRunQuery) {
            onRunQuery(code);
        }
    };

    return (
        <div className="h-[300px] border border-border rounded-lg p-2 bg-card flex flex-col">
            <div className="flex justify-between border-b border-border py-2 px-4 shrink-0">
                <p className="flex justify-center items-center gap-2 font-semibold"><span className="bg-primary text-primary-foreground rounded-full w-4 h-4"></span> SQL Query</p>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="cursor-pointer" onClick={onOpenAI}><Sparkles/></Button>
                    <Button 
                        variant="default" 
                        size="default" 
                        className="cursor-pointer" 
                        onClick={handleRunClick}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="animate-spin mr-2"/> : <PlayIcon className="md:mr-2"/>} 
                        <span className="hidden md:inline">Run Query</span>
                    </Button>
                </div>
            </div>

            <div className="flex-1 my-2 md:my-4 min-h-0">
                <Editor
                    height="100%"
                    defaultLanguage="sql"
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    theme="vs-light"
                    options={{
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                    }}
                />
            </div>
            
        </div>
    );
}