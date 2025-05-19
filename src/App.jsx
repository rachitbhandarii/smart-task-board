import React from "react";
import TaskBoard from "./components/TaskBoard";

function App() {
  return (
    <div className="h-screen w-screen bg-blue-50 flex flex-col">
      <header className="bg-white shadow-md">
        <div className="container mx-auto p-6">
          <h1 className="font-bold text-violet-500 ml-7">Smart Task Board</h1>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <TaskBoard />
      </main>
    </div>
  );
}

export default App;
