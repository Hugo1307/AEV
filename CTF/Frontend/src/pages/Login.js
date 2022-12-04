import {Container, Row} from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import {toast} from "react-toastify";
import {setAccessToken} from "../api/authHandler";

const Login = () => {

    const navigate = (path, time) => {
        setTimeout(() => {
            window.location = path;
        }, time);
    }

    const onLoginSuccessful = (responseData) => {

        toast(responseData.message);
        setAccessToken(responseData.token);

        navigate("/home", 2000);

    }

    const onLoginFailed = (responseData) => {
        toast(responseData.message);
    }

    return (

        <Container>

            <Row className="my-4 text-center">
                <h2>Login</h2>
            </Row>

            <LoginForm onLoginSuccessful={onLoginSuccessful} onLoginFailed={onLoginFailed} />

            <Row className="my-5 text-center">
                <p>Not Registered? <a href="/register">Register</a></p>
            </Row>

        </Container>

    );

}

export default Login;
