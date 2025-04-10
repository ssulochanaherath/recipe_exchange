import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/redux/store";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Account from "./pages/Account.tsx";
import Favorites from "./pages/Favorite";

function App() {
    return (
        <Provider store={store}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
        </Provider>
    );
}

export default App;
