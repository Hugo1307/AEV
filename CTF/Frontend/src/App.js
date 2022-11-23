import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Page from "./components/Page";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {

    if (!localStorage.getItem("food_co_access_token")) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Page component={<Login/>}/>} />
                    <Route path="/register" element={<Page component={<Register/>}/>} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        );
    } else {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<Page component={<Home/>}/>} />
                    <Route path="/categories" element={<Page component={<Categories/>}/>} />
                    <Route path="/category/:categoryId" element={<Page component={<Category/>}/>} />
                    <Route path="/profile" element={<Page component={<Profile/>} />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </BrowserRouter>
        );
    }

}

export default App;
