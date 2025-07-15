import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import MainPage from './pages/MainPage.tsx'
import Navigation from "./components/Navigation/Navigation.tsx";
import PostPage from "./pages/PostPage.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {


  return (
      <BrowserRouter>
        <Navigation/>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path={`/post/:id`} element={<PostPage/>} />
            <Route path={"*"} element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
