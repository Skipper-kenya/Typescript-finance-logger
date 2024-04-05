import { FC } from "react";
import Dashboard from "./Dashboard";
import { Toaster } from "sonner";
//
const App: FC = () => {
  return (
    <div>
      <Toaster richColors position="top-center" />
      <Dashboard />
    </div>
  );
};

export default App;
