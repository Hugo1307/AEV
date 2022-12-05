import {Col, Container, Row} from "react-bootstrap";
import Categories from "./Categories";
import CategoriesSideBar from "../components/CategoriesSideBar";

const Home = () => {
    return (
        <Container fluid>
            <h1>Welcome</h1>
            <Row className="mt-5">
                <Col className="col-8">
                    <p>Food Co. changed the food world by providing the tools to share recipes and cooking tips, while celebrating the expertise of home cooks online. Since then, Food Co. has become the world's largest community-driven food brand, providing trusted resources to more than 60 million home cooks each month.</p>
                    <p>Every day, cooks from around the world publish recipes and inspire one another through recipe photos, ratings, reviews, and videos. The combination of the Food Co. community with our team of editorial and kitchen professionals provides authority found nowhere else on the internet and has turned the brand into an indispensable resource for cooks of all skill levels.</p>
                    <p>The heart of Food Co. is our community of home cooks who share their beloved family recipes, create new recipes, and photograph, rate, and review each other's recipes. Each week, more than 15 million registered members add more than 2,000 recipe ratings, 800 new recipe photos, and almost 200 new recipes to the site. And every minute of every day, 27 people are saving recipes they love or want to try later.</p>
                </Col>
                <Col>
                    <CategoriesSideBar />
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
