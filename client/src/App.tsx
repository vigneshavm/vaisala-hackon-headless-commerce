import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ProductList from './pages/product';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
            <Route path="/ProductList" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
