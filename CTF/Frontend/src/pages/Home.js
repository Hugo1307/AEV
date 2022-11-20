import {Col, Container, Row} from "react-bootstrap";
import Categories from "./Categories";

const Home = () => {
    return (
        <Container fluid>
            <h1>Welcome</h1>
            <Row className="mt-5">
                <Col className="col-8">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </Col>
                <Col>
                    <Categories isVertical/>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
