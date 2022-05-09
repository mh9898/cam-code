import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScanCode from '@/pages/ScanCode';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*<Route*/}
        {/*    path="/"*/}
        {/*    element={<Home />}*/}
        {/*/>*/}
        <Route path="/" element={<ScanCode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
