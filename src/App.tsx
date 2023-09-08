import './App.css';
import LoginButton from "./components/Login/Login";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const clienId = "58204115475-l0adfrri5pf9nrih03c541pv9i563n3n.apps.googleusercontent.com";

function App() {


  useEffect(() => {
    function start(){
      gapi.client.init({
        clienId: clienId,
        scope: ['https://www.googleapis.com/auth/webmasters.readonly'].join(' ')
      })
    }
    gapi.load("client:auth2", start)
  })

  return (
    <div className="App">
        <LoginButton />
      
    </div>
  );  
}

export default App;
