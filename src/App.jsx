import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SideNav from "./components/sideNav";
import Home from "./components/Home";
import AboutMe from "./components/AboutMe";
import NewList from "./components/NewList";

export default function App() {
    return (
        <HashRouter>
            <div style={{ display: "flex", minHeight: "100vh" }}>
                <SideNav />
                <main style={{ flex: 1, padding: "20px" }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<AboutMe />} />
                        <Route path="/new-list" element={<NewList />} />
                    </Routes>
                </main>
            </div>
        </HashRouter>
    );
}
