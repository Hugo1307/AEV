import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Page from "./components/Page";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import Category from "./pages/Category";

function App() {

    if (!localStorage.getItem("food_co_access_token")) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Page component={<Login/>}/>} />
                    <Route path="/register" element={<Page component={<Register/>}/>} />
                    <Route path="/categories" element={<Page component={<Categories/>}/>} />
                    <Route path="/category/:categoryId" element={<Page component={<Category/>}/>} />
                    <Route path="*" element={<Page component={<Login/>}/>} />
                </Routes>
            </BrowserRouter>);
    } else {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>);
    }


}

export default App;
