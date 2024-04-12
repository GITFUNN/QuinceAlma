import { BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";
import Lista1 from "./pages/AlmaList";
import Layout from "./components/Layout";




function App() {
  return (
   
   
    
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Layout/>}>
        <Route path = "/alma" element = {<MainPage/>}/>
        <Route path = "/ambddb6fcvluxt3g1g35rn6wfumrtlr4q3v5cat9" element = {<Lista1/>}/>
        <Route index element = {<HomePage />} />
        </Route>
      </Routes>
   </BrowserRouter>
  );  
}

export default App
