import {Col, Container, Row} from "react-bootstrap";
import {useState} from "react";
import { registerEndpoint } from "../api/apiHandler"

const RegisterForm = () => {

    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    return (

        <Container className="mt-5">

            <Row className="my-4">
                <Col className="offset-4 col-4">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)}/>
                    </div>
                </Col>
            </Row>

            <Row className="my-4">
                <Col className="offset-4 col-4">
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                               placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                    </div>
                </Col>
            </Row>

            <Row className="my-4 text-center">
                <Col className="offset-4 col-4">
                    <button type="submit" className="btn btn-primary px-5 py-2" onClick={() => registerEndpoint(email, password)}>
                        Register
                    </button>
                </Col>
            </Row>

        </Container>

    );

};

export default RegisterForm;
