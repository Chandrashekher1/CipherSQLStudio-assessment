import { useState } from "react";
import { Send, Sparkles, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getAIHint } from "@/lib/api";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Message {
    role: "user" | "ai";
    content: string;
}

interface LLMProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LLM({ isOpen, onClose }: LLMProps) {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { role: "ai", content: "Hi! I'm Cipher AI. Ask me for SQL hints!" }
    ]);
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;
        
        const userMessage = input;
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setLoading(true);

        try {
            const res = await getAIHint(userMessage);
            if (res.success) {
                setMessages(prev => [...prev, { role: "ai", content: res.hint }]);
            } else {
                toast.error(res.message || "Failed to get hint");
            }
        } catch (error) {
            toast.error("Failed to connect to AI assistant");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="flex flex-col h-[300px] md:h-[600px] border border-border bg-card/50 rounded-md md:rounded-md">
            <div className="md:flex items-center justify-between p-2 border-b border-border">
                <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-1.5 rounded-full">
                        <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <h3 className="font-bold text-sm">Cipher AI</h3>
                        <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">Beta</span>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 hidden md:inline" onClick={onClose}>
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                    <div 
                        key={idx} 
                        className={cn(
                            "flex flex-col max-w-[85%] rounded-2xl p-3 text-sm animate-in fade-in slide-in-from-bottom-2",
                            msg.role === "user" 
                                ? "ml-auto bg-primary text-primary-foreground rounded-br-none" 
                                : "bg-muted text-foreground rounded-bl-none"
                        )}
                    >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                ))}
                {loading && (
                    <div className="bg-muted w-fit rounded-2xl rounded-bl-none p-3 animate-pulse">
                        <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-border mt-auto">
                <div className="relative">
                    <Input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Ask for a SQL hint..."
                        className="pr-10 rounded-full bg-background"
                        disabled={loading}
                    />
                    <Button 
                        size="icon" 
                        variant="ghost" 
                        className="absolute right-1 top-1 h-8 w-8 text-primary hover:text-primary/80 hover:bg-transparent"
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
