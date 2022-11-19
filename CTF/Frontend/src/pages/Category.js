import {Container} from "react-bootstrap";
import {useParams} from "react-router-dom";
import CategoryInfo from "../components/CategoryInfo";

const Category = () => {

    const { categoryId } = useParams();

    return (
       <Container>
           <CategoryInfo id={categoryId} />
       </Container>
    );

};

export default Category;