import {Col, Container, Image, Row} from "react-bootstrap";

const ProfileActions = (props) => {

    if (!props.loading) {
        if (props.isAdmin) {
            return (
                <Container className="m-5">
                    <Row>
                        <h3>System Crontab Logs</h3>
                        <p>Log1 Log2</p>
                    </Row>
                    <Row className="text-center">
                        <p className="fs-4 fw-bold m-0">{props.email}</p>
                        <p className="fs-6 fw-light mt-3 mb-0">{props.password}</p>
                        <p className="fs-6 fw-light m-0">Is Admin: {props.isAdmin.toString()}</p>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Container>
                    <Row>
                        <h3>Only Available for System Administrators</h3>
                    </Row>
                </Container>
            );
        }
    } else {
        return (
            <Container className="text-center mt-5">
                <div className="spinner-border" role="status" />
            </Container>
        );
    }

}

export default ProfileActions;
