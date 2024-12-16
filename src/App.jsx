import { useState } from "react";
import Create from "./components/Create";

const App = () => {
    const [tasks, settasks] = useState(
        JSON.parse(localStorage.getItem("tasks")) || []
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
            {<Create tasks={tasks} settasks={settasks} />}
        </div>
    );
};

export default App;