// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import CreateCertificate from './pages/CreateCertificate';
import ViewCertificate from './pages/ViewCertificate';
import VerifyCertificate from './pages/VerifyCertificate';
import MainLayout from './components/MainLayout';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Router>
        <Routes>
          {/* Wrap all page routes inside MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCertificate />} />
            <Route path="/verify" element={<VerifyCertificate />} />
            <Route path="/view" element={<ViewCertificate />} />
            <Route path="/about" element={<AboutUs />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
