import {Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {loginEndpoint} from "../api/apiHandler";

const LoginForm = (props) => {

    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [responseData, setResponseData] = useState(undefined);
    const [responseStatus, setResponseStatus] = useState(undefined);

    const performLogin = async (email, password) => {
        let axiosResponse = await loginEndpoint(email, password);
        setResponseData(axiosResponse.response.data);
        setResponseStatus(axiosResponse.response.status);
    }

    useEffect(() => {

        if (!responseData || !responseStatus) {
            return;
        }

        responseStatus === 200 ? props.onLoginSuccessful(responseData) : props.onLoginFailed(responseData)

        setResponseStatus(undefined);
        setResponseData(undefined);

    }, [props, responseData, responseStatus]);

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
                    <button type="submit" className="btn btn-primary px-5 py-2" onClick={() => performLogin(email, password)}>Login</button>
                </Col>
            </Row>

        </Container>
    );

}

export default LoginForm;
