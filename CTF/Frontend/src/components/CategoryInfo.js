import useFetchData from "../hooks/useFetchData";
import {Col, Container, Row} from "react-bootstrap";
import ItemCard from "./ItemCard";
import {getCategoryInfoEndpoint} from "../api/apiHandler";

const CategoryInfo = ({id}) => {

    const {
        data,
        loading
    } = useFetchData(getCategoryInfoEndpoint().uri, {id: id});

    if (loading) {
        return (<h1>Loading...</h1>);
    } else if (data) {

        let foodCategoryItem = data[data.length-1];
        return (
          <Container>
              <Row>
                  <h2>{foodCategoryItem.title}</h2>
              </Row>
              <Row className="mt-4">
                  <Col className="col-4">
                      <ItemCard id={id} title={foodCategoryItem.title} image={foodCategoryItem.image}/>
                  </Col>
                  <Col className="mx-4">
                      <h4 className="mb-4">Description</h4>
                      <p className="fs-6 fw-light">{foodCategoryItem.description}</p>
                      <h5 className="mb-4 mt-5">Recipe</h5>
                      <p className="fs-6 fw-light">{foodCategoryItem.recipe}</p>
                  </Col>
              </Row>
          </Container>
        );

    }

};

export default CategoryInfo;
