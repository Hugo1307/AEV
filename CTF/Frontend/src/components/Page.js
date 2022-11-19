import TopBar from "./TopBar";
import {Container} from "react-bootstrap";

const Page = (props) => {

    return (
        <Container>
            <TopBar/>
            {props.component}
        </Container>
    );

}

export default Page;