import "./App.css";
import Login from "./Component/Login/login";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import TrangChu from "./Component/TrangChu/TrangChu";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<TrangChu />} />
      </Routes>
    </div>
  );
}

export default App;
