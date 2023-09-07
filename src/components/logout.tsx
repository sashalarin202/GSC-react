import GoogleLogout from "react-google-login";

const clienId = "58204115475-l0adfrri5pf9nrih03c541pv9i563n3n.apps.googleusercontent.com";

function Logout() {

    const onSuccess = () => {
        console.log('logout SUCCESS')
    }

    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId = {clienId}
                buttonText = {"Logout"}
                onSuccess = {onSuccess}
            >
            </GoogleLogout>
        </div>
    )
}

export default Logout;