import {Col, Container, Row} from "react-bootstrap";
import ProfileInfo from "../components/ProfileInfo";
import useFetchData from "../hooks/useFetchData";
import {getProfileEndpoint} from "../api/apiHandler";
import {useState} from "react";
import ProfileActions from "../components/ProfileActions";

const Profile = () => {

    const {
        data,
        loading
    } = useFetchData(getProfileEndpoint().uri, {});

    const [loadedData, setLoadedData] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setAdmin] = useState(false);

    if (!loading && !loadedData) {

        setLoadedData(true);

        setEmail(data.email);
        setPassword(data.password);
        setAdmin(data.isAdmin);

    }

    return (
        <Container>
            <Row>
                <Col className="col-3">
                    <ProfileInfo email={email} password={password} isAdmin={isAdmin} loading={!loadedData}/>
                </Col>
                <Col>
                    <ProfileActions isAdmin={isAdmin} loading={!loadedData}/>
                </Col>
            </Row>

        </Container>
    );

};

export default Profile;
