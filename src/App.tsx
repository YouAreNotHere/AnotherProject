import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // стили

import './App.css'
import MainPage from './pages/MainPage.tsx'
import Navigation from "./ui/Navigation.tsx";
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
          <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
      </BrowserRouter>
  )
}

export default App
