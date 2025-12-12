import { Database } from "lucide-react";
import { TableList } from "./TableList";
import { WorkspaceList } from "./WorkspaceList";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

export function AppSidebar({ refresh }: { refresh?: boolean }) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-2 font-bold text-primary">
          <Database className="h-8 w-8 bg-primary/90 rounded-full p-1 text-primary-foreground" />
          <span className="text-xl">CipherSQLStudio</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
             <TableList refresh={refresh} />
             <WorkspaceList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
