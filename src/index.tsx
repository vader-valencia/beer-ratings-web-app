import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewItem from "./Pages/NewItem";
import Home from "./Pages/Home";
import RateABeer from "./Pages/RateItem";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Home />} />
          <Route path="new-item" element={<NewItem />} />
          <Route path="rate-item" element={<RateABeer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
