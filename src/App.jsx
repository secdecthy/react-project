// import { useState } from 'react';
import { Switch , Route } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/admin">
          <Main/>
        </Route>
      </Switch>
    </>
  )
}

export default App
