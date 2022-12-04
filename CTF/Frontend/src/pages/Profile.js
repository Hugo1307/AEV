import {Col, Container, Row} from "react-bootstrap";
import ProfileInfo from "../components/ProfileInfo";

const Profile = () => {

    return (
        <Container>
            <Row>
                <Col className="col-2">
                    <ProfileInfo />
                </Col>
                <Col>

                </Col>
            </Row>

        </Container>
    );
};

export default Profile;
