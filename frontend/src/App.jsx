import {Routes,Route} from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AnalyzeTransaction from "./pages/AnalyzeTransaction";
import LiveMonitor from "./pages/LiveMonitor";
import ModelInsights from "./pages/ModelInsights";
import Assistant from "./components/Assistant";
function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/analyze" element={<AnalyzeTransaction/>}/>
        <Route path="/monitor" element={<LiveMonitor/>}/>
        <Route path="/insights" element={<ModelInsights/>}/>
      </Routes>
      <Assistant />
    </>
  );
}

export default App;