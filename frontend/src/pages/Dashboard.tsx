import { Header } from "@/components/Header";
import Result from "@/components/Result";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { SqlEditor } from "@/components/SqlEditor";

export default function Dashboard() {
    return (
        <div>
            <Header />
            <Sidebar/>

            <div className="mx-20 my-4">
                <SqlEditor/>
                <Result/>
            </div>
        </div>
    );
}