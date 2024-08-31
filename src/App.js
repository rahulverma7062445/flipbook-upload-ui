import './App.css';
import { Route, Routes } from "react-router-dom";
import FileUpload from "./Components/FileUpload.js";
import FileProgress from "./Components/FileProgress.js"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<FileUpload />} />
        <Route exact path="/FileProgress" element={<FileProgress />} />

      </Routes>
    </div>
  );
}

export default App;
