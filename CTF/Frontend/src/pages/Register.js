import {Container, Row} from "react-bootstrap";
import RegisterForm from "../components/RegisterForm";

const Register = () => {

    return (

        <Container>

            <Row className="my-4 text-center">
                <h2>Register</h2>
            </Row>

            <RegisterForm/>

            <Row className="my-5 text-center">
                <p>Already Registered? <a href="/login">Login</a></p>
            </Row>

        </Container>

    );

};

export default Register;
