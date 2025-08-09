import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ProductList from './pages/product';
import EmailSignup from './pages/signup';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<EmailSignup />} />
        <Route path="/" element={<Home />} />
        <Route path="/ProductList" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
