import ItemCard from "../components/ItemCard";
import {Col, Container, Row} from "react-bootstrap";
import useFetchData from "../hooks/useFetchData";
import {getCategoriesEndpoint} from "../api/apiHandler";

const Categories = (props) => {

    const {data, loading} = useFetchData(getCategoriesEndpoint().uri, {});

    let categoryItems = [];

    if (loading) {
        return (
            <Container>
                <Row>
                    <Col>
                        <h2 className={"mb-5"}>Categories</h2>
                    </Col>
                </Row>
                <p>Loading ...</p>
            </Container>
        );
    } else {

        for (let categoryIdx in data.categories) {
            let category = data.categories[categoryIdx];

            if (props.isVertical) {
                categoryItems.push(
                    <Col className="col-12 my-4">
                        <ItemCard id={category.id} title={category.name} description={category.description} image={category.image} actionUrl={`/category/${category.id}`} useButton={true}/>
                    </Col>
                );
            } else {
                categoryItems.push(
                    <Col className="col-xl-3 col-xxl-3 col-sm-6 col-md-6">
                        <ItemCard id={category.id} title={category.name} description={category.description} image={category.image} actionUrl={`/category/${category.id}`} useButton={true}/>
                    </Col>
                );
            }

        }

        return (
            <Container>
                <Row>
                    <Col>
                        <h2 className={"mb-5"}>Categories</h2>
                    </Col>
                </Row>
                <Row className="overflow-auto" style={{height: "500px"}}>
                    {categoryItems}
                </Row>
            </Container>
        );

    }

};

export default Categories;
