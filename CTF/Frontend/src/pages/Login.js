import {Container, Row} from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const routerNavigate = useNavigate();

    const onLoginSuccessful = (responseData) => {

        toast(responseData.message);
        localStorage.setItem("food_co_access_token", responseData.token);

        routerNavigate("/home");

    }

    const onLoginFailed = (responseData) => {
        toast(responseData.message);
    }

    return (

        <Container>

            <Row className="my-4 text-center">
                <h2>Login</h2>
            </Row>

            <LoginForm onLoginSuccessful={onLoginSuccessful} onLoginFailed={onLoginFailed}/>

            <Row className="my-5 text-center">
                <p>Not Registered? <a href="/register">Register</a></p>
            </Row>

        </Container>

    );

}

export default Login;
