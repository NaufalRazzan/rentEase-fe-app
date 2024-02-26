import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from "./pages/home"
import { Navbar } from './components/shared/navbar';
import { Footer } from './components/shared/footer';

function App() {
  return (
    <div>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      
    </Routes>
    <Footer />
    </div>
  );
}

export default App;
