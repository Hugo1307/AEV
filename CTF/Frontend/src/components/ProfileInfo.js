import {Col, Container, Image, Row} from "react-bootstrap";

const ProfileInfo = (props) => {

    if (!props.loading) {
        return (
            <Container>
                <Row>
                    <Col className="text-center">
                        <Image className="bg-light rounded-5 my-5" style={{height: "100px", width: "100px"}}
                               src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"/>
                    </Col>
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
            <Container className="text-center mt-5">
                <div className="spinner-border" role="status" />
            </Container>
        )
    }

};

export default ProfileInfo;
