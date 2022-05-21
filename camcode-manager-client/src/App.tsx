import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemePreSets from '@/pages/ThemePreSets/ThemePreSets';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ThemePreSets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
