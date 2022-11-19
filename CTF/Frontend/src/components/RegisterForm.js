import {Col, Container, Row} from "react-bootstrap";

const RegisterForm = () => {

    return (
        <Container className="mt-5">

            <Row className="my-4">
                <Col className="offset-4 col-4">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Enter email"/>
                    </div>
                </Col>
            </Row>

            <Row className="my-4">
                <Col className="offset-4 col-4">
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"
                               placeholder="Password"/>
                    </div>
                </Col>
            </Row>

            <Row className="my-4 text-center">
                <Col className="offset-4 col-4">
                    <button type="submit" className="btn btn-primary px-5 py-2">Register</button>
                </Col>
            </Row>

        </Container>
    );

};

export default RegisterForm;