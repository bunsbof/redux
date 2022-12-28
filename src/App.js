import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Employee from "./pages/Employee";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Employee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
