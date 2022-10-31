import { useState } from "react";
import "./App.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { CustomModal } from "./components";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [showModal, setShowModa] = useState(true);

  const handleClose = () => setShowModa(false);
  const handleOpen = () => setShowModa(true);
  return (
    <div className="app">
      <header className="header">
        <KeyboardArrowLeftIcon className="icon" />
        <h1>View Audience</h1>
      </header>
      <div className="div__container">
        <button onClick={handleOpen}>Save Segement</button>
      </div>
      <CustomModal show={showModal} onClose={handleClose} />
    </div>
  );
}

export default App;
