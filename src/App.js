import logo from './logo.svg';
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './Component/Home';

function App() {

  return (
    <div className="App ">
      <Home />
      <ToastContainer />
    </div>
  );
}

export default App;
