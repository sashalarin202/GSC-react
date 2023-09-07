import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import axios from 'axios';

const clienId = "58204115475-l0adfrri5pf9nrih03c541pv9i563n3n.apps.googleusercontent.com";

function Login() {

    const onSuccess = (res:any) => {
        console.log('GOOGLE SUCCESS', res)

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
      
              setData(response.data);
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
                    isSignedIn = {true}
                >
                </GoogleLogin>
            </div>
            {/* <button onClick={execute()}>buttoon</button> */}
        </>
        
    )
}

export default Login;