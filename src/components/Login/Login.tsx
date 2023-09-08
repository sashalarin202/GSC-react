import './Login.css';
import { useState } from "react";
import GoogleLogin from "react-google-login";
import axios from 'axios';
import Dashboard from '../Dashboard/DashBoard';

const clienId = "58204115475-l0adfrri5pf9nrih03c541pv9i563n3n.apps.googleusercontent.com";

function Login() {
    const [loggedIn, setLoggedIn] = useState(false);


    const onSuccess = (res:any) => {
        console.log('GOOGLE SUCCESS', res)
        if (res.profileObj) {
            setLoggedIn(true);
        }
        

        const fetchData = async () => {
            const accessToken = res.accessToken; 
            const startDate = '2023-06-07';
            const endDate = '2023-09-07';
            const dimensions = ['PAGE'];
            const rowLimit= 10;
            try {
              const response = await axios.post(
                'https://searchconsole.googleapis.com/webmasters/v3/sites/sc-domain%3Aenguide.pl/searchAnalytics/query?',
                {
                  startDate,
                  endDate,
                  dimensions,
                  rowLimit
                },
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                }
              );
      
              setData(response.data.rows);
              if (res.profileObj) {
                setLoggedIn(true);
              }
            } catch (error) {
              console.error('Ошибка при запросе данных:', error);
            }
        };
        fetchData();
    }

    const onFailure = (res:any) => {
        console.log('GOOGLE Failed', res)
    }
        const [data, setData] = useState(null);

    return (
        <>
            <div id="signInButton">
                <GoogleLogin
                    clientId = {clienId}
                    buttonText = "Login"
                    onSuccess = {onSuccess}
                    onFailure = {onFailure}
                    cookiePolicy = {'single_host_origin'}
                    isSignedIn
                    render={renderProps => (
                        <button 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            className={loggedIn ? 'success-button' : 'failure-button'}
                    >{!loggedIn ? 'Connect Google Search Console':'Change Account'}</button>
                    )}
                >
                </GoogleLogin>
                  {loggedIn && (
                  <Dashboard data={data} />
                )}
            </div>
        </>
        
    )
}


export default Login;