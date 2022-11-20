import TopBar from "./TopBar";
import {Container} from "react-bootstrap";
import {ToastContainer} from "react-toastify";

const Page = (props) => {

    return (
        <Container>
            <TopBar/>
            {props.component}
            <ToastContainer position="bottom-right"/>
        </Container>
    );

}

export default Page;
