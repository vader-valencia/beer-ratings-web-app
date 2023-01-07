import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewItem from "./Pages/NewItem";
import Home from "./Pages/Home";
import RateItem from "./Pages/RateItem";
import React from "react";
import Category from "./Pages/Category";
import NewCategory from "./Pages/NewCategory";
import Categories from "./Pages/Categories";


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="new-category" element={<NewCategory />} />
          <Route path="new-item" element={<NewItem />} />
          <Route path="rate-item" element={<RateItem />} />
          <Route path='categories/:id' element={<Category />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
