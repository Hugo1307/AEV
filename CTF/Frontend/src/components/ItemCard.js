const ItemCard = ({title, description, image, useButton, actionUrl}) => {

    return (
        <div className="card">
            <img className="card-img-top" src={image} alt="Card image cap" height={"250"}/>
                <div className="card-body">
                    <h5 className="card-title mt-2">{title}</h5>
                    <p className="card-text">{description}</p>
                    {useButton ? <a href={actionUrl} className="btn btn-primary">View Category</a> : undefined}
                </div>
        </div>
    );

};

export default ItemCard;