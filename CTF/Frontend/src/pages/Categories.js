import ItemCard from "../components/ItemCard";
import {Col, Container, Row} from "react-bootstrap";

const Categories = () => {

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className={"mt-3 mb-5"}>Categories</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ItemCard id={1} title={"Hamburger"} description={"Category for Hamburgers"} image={"https://www.minervafoods.com/wp-content/uploads/2016/06/como_fazer_hamburguer_caseiro.jpg"} actionUrl={"/category/1"} useButton={true}/>
                </Col>
                <Col>
                    <ItemCard id={2} title={"Pizza"} description={"Category for Pizza"} image={"https://static.clubedaanamariabraga.com.br/wp-content/uploads/2020/08/pizza-margherita.jpg?x41527"}  actionUrl={"/category/2"} useButton={true}/>
                </Col>
                <Col>
                    <ItemCard id={3} title={"Vegetables"} description={"Category for Vegetables"} image={"https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg"}  actionUrl={"/category/3"} useButton={true}/>
                </Col>
            </Row>
        </Container>
    );

};

export default Categories;