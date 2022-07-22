import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewBeer from "./Pages/NewBeer";
import Home from "./Pages/Home";
import RateABeer from "./Pages/RateABeer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Home />} />
          <Route path="new-beer" element={<NewBeer />} />
          <Route path="rate-a-beer" element={<RateABeer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
