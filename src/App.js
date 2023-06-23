import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Home from './component/home';
import Detail from './component/detail';

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/summary/:title/:id' element = {<Detail/>}/>
      </Routes>
    </Router>      
    </div>
  );
}

export default App;
