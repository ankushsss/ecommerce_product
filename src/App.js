import './App.css';
import RoutesData from './routesData';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <Router >
      <RoutesData/>
    </Router>
  );
}

export default App;
