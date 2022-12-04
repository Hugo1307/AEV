import {Container, Row} from "react-bootstrap";
import "./LogViewStyle.css"

const LogViewComponent = (props) => {

    return (
        <Container className="h-100">
            <Row className="mt-3 h-75">
                <textarea className="log-view-text form-control" readOnly value={props.text} />
            </Row>
        </Container>
    );

};

export default LogViewComponent;