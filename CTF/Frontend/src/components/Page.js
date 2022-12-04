import TopBar from "./TopBar";
import {Container} from "react-bootstrap";
import {ToastContainer} from "react-toastify";

const Page = (props) => {

    return (
        <Container>
            <TopBar loggedIn={props.loggedIn}/>
            <div className="mt-3">
                {props.component}
            </div>
            <ToastContainer position="bottom-right"/>
        </Container>
    );

}

export default Page;
