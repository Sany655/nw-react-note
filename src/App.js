import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './components/Home';
export const Context = React.createContext()

function App() {
  const [note,setNote] = React.useState([])
  return (
    <Context.Provider value={{note,setNote}}>
      <Home />
    </Context.Provider>
  );
}

export default App;
