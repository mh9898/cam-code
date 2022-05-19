import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScanCode from '@/pages/ScanCode/ScanCode';
import LandingPage from '@/pages/LandingPage/LandingPage';
import ReviewScanResult from '@/pages/ReviewScanResult/ReviewScanResult';
import ErrorOnScan from '@/pages/ErrorOnScan/ErrorOnScan';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ScanCode" element={<ScanCode />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/ReviewScan" element={<ReviewScanResult />} />
        <Route path="/ErrorOnScan" element={<ErrorOnScan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
