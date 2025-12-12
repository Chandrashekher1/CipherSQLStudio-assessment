import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWorkspace } from "../lib/api";
import { Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function LandingPage() {
  const navigate = useNavigate();
  const [workspaceName, setWorkspaceName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateWorkspace = async () => {
    try {
      setLoading(true);
      const res = await createWorkspace(workspaceName || "New Workspace");

      if (res.success) {
        navigate(`/workspace/${res.workspaceId}`);
        toast.success("Workspace created successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to create workspace");
    } finally {
      setLoading(false);
    }
  };

//   const handleLoadWorkspace = () => {
//     if (!workspaceIdInput.trim()) {
//       toast.error("Please enter a workspace ID");
//       return;
//     }
//     navigate(`/workspace/${workspaceIdInput.trim()}`);
//     toast.success("Workspace loaded successfully");
//   };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-card shadow-xl rounded-2xl p-10 w-full max-w-md text-center animate-[fadeIn_0.8s_ease]">
        
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-primary/20 text-primary rounded-2xl flex items-center justify-center text-4xl shadow-md">
            <Database size={40}/>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-muted-foreground">CipherSQLStudio</h1>
        <p className="text-muted-foreground mt-1 mb-8">Browser-Based SQL Sandbox</p>

        <Input
          type="text"
          placeholder="Workspace Name (Optional)"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-lg bg-input text-input-foreground focus:ring-2 focus:ring-primary/80 outline-none"
        />

        <Button
          onClick={handleCreateWorkspace}
          disabled={loading}
          className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl shadow hover:bg-primary/80 transition-all"
        >
          + Create New Workspace
        </Button>

        {/* <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-muted" />
          <span className="px-3 text-muted-foreground text-sm">or</span>
          <div className="flex-grow h-px bg-muted" />
        </div>

        <Input
          type="text"
          placeholder="Enter workspace ID"
          value={workspaceIdInput}
          onChange={(e) => setWorkspaceIdInput(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-input text-input-foreground focus:ring-2 focus:ring-primary/80 outline-none"
        />

        <Button
          onClick={handleLoadWorkspace}
          variant="secondary"
          className="w-full mt-4"
        >
          Load Workspace
        </Button> */}
      </div>
    </div>
  );
}
