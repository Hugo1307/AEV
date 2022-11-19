import {Container, Row} from "react-bootstrap";
import LoginForm from "../components/LoginForm";

const Login = () => {

    return (

        <Container>

            <Row className="my-4 text-center">
                <h2>Login</h2>
            </Row>

            <LoginForm/>

        </Container>

    );

}

export default Login;