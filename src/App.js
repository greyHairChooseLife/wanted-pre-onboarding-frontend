import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Todo from './pages/Todo';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/todo" element={<Todo />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
