import useFetchData from "../hooks/useFetchData";
import {getCategoriesEndpoint} from "../api/apiHandler";
import {Col, Container, Row} from "react-bootstrap";
import ItemCard from "./ItemCard";

const CategoriesSideBar = () => {

    const {data, loading} = useFetchData(getCategoriesEndpoint().uri, {});

    let categoryItems = [];

    if (loading) {
        return (
            <Container>
                <p>Loading ...</p>
            </Container>
        );
    } else {

        for (let categoryIdx in data.categories) {
            let category = data.categories[categoryIdx];
            categoryItems.push(
                <Col className="col-12 my-4">
                    <ItemCard id={category.id} title={category.name} description={category.description} image={category.image} actionUrl={`/category/${category.id}`} useButton={true}/>
                </Col>
            );
        }

        return (
            <Container>
                <Row className="overflow-auto" style={{height: "500px"}}>
                    {categoryItems}
                </Row>
            </Container>
        );

    }

};

export default CategoriesSideBar;