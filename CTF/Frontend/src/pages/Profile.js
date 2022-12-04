import {Col, Container, Row} from "react-bootstrap";
import ProfileInfo from "../components/ProfileInfo";
import useFetchData from "../hooks/useFetchData";
import {getCronLogs, getProfileEndpoint} from "../api/apiHandler";
import {useEffect, useState} from "react";
import ProfileActions from "../components/ProfileActions";
import axios from "axios";
import {getAuthorizationHeader} from "../api/authHandler";

const Profile = () => {

    const [loadedProfileData, setLoadedProfileData] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setAdmin] = useState(false);

    useEffect(() => {

        axios.get(getProfileEndpoint().uri, {
            headers: {Authorization: getAuthorizationHeader()}
        }).then(r => {

            const profileData = r.data;

            setEmail(profileData.email);
            setPassword(profileData.password);
            setAdmin(profileData.isAdmin);
            setLoadedProfileData(true);

        });

    }, []);

    return (
        <Container>
            <Row>
                <Col className="col-4">
                    <ProfileInfo email={email} password={password} isAdmin={isAdmin} loading={!loadedProfileData}/>
                </Col>
                <Col className="mt-5">
                    <ProfileActions isAdmin={isAdmin} loading={!loadedProfileData}/>
                </Col>
            </Row>

        </Container>
    );

};

export default Profile;
