import "./List.css";
const List = ({ anime, image }) => {
    return (
        <>
            <div className="row">
                <img className="img-thumbnail mx-auto img-fluid col-xs-6" src={image} alt="Anime poster" />
                <p className="col-xs-6">{anime}</p>
            </div>
        </>


    );
}

export default List;