import { Link } from 'react-router-dom';

const ProductCard = (props) => {
    return (
        <>
        <div className="card">
            <div className="card bg-light">
                <img src={props.data.image_link} alt={"Image of " + props.data.name}></img>
                <Link to={`/product/${props.data._id}`} state={{ info: props.data }}>
                    {props.data.name}
                </Link>
                <div className="card-text">{props.data.price}</div>
            </div>
        </div>
        </>
    )
}

export default ProductCard