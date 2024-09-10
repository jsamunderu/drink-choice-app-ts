import Home from "@/components/home";
import { ResultTable } from "@/components/result";

export default function Index() {
  return (
    <div className="min-h-screen relative bg-slate-200">
      <div className="flex justify-around flex-col items-center h-1/2 ">
        <Home/>
        <ResultTable/>
      </div>
    </div>
  );
}
