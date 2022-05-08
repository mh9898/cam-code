import { useState } from 'react';
import ScanCode from "@/pages/ScanCode";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
      <BrowserRouter>
        <Routes>
          {/*<Route*/}
          {/*    path="/"*/}
          {/*    element={<Home />}*/}
          {/*/>*/}
          <Route
              path="/"
              element={<ScanCode />}
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
