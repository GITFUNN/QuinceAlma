import { BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";
import Lista from "./pages/AlmaList";
import Layout from "./components/Layout";




function App() {
  return (
   
   
    
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Layout/>}>
        <Route path = "/alma" element = {<MainPage/>}/>
        <Route path = "/alma/lista0000001" element = {<Lista/>}/>
        <Route index element = {<HomePage />} />
        </Route>
      </Routes>
   </BrowserRouter>
  );  
}

export default App
