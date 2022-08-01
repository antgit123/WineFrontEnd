import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import WineDetails from "../components/WineDetails";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/wines/:id" element={<WineDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
