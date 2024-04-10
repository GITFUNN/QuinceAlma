import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import HomePage from "./pages/HomePage";
import Lista from "./pages/AlmaList";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/alma" element={<MainPage />} />
          <Route
            path="/alma/AMbdDb6FCvlUxT3g1G35rn6wfUmrTLr4q3v5caT9"
            element={<Lista />}
          />
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
