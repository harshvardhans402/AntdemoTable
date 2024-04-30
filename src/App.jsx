// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
// import NotFound from './components/NotFound';

const AppRouter = () => {
  return (
    <div className='Home'>
      <Router>
        <Routes>
          <Route exact path="/"  >
            <Route path='/:page?' element={<Home />} />
            <Route path='/' element={<Home />} />
          </Route>


        </Routes>
      </Router>
      {/* <Home /> */}
    </div>
  );
};

export default AppRouter;
