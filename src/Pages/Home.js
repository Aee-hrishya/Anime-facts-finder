import axios from "axios";
import { useState, useContext } from "react";
import UserContext from "../Context/UserContext";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { Button, Input, Container, Row, Col, InputGroup } from "reactstrap";
import List from "../Components/List";

function Home() {

    const context = useContext(UserContext);

    const [search, setSearch] = useState("");//to store the what user types in the input field

    const [anime, setAnime] = useState("");//To store data we get from the search in anime

    const rndInt = Math.floor(Math.random() * 12) + 1 //Variable to generate random numbers between 1 and 12

    const changeHandler = (e) => {
        setSearch(e.target.value);
    }

    //Method to fetch the info from the API
    const fetchAnime = async () => {
        try {
            const { data } = await axios.get(`https://anime-facts-rest-api.herokuapp.com/api/v1/${search}`);

            console.log(data);
            setAnime(data);
        }
        catch (error) {
            toast("Anime not found", {
                type: "error"
            });
        }

    }

    //If user not present then navigate to signin page else show the home page
    if (!context.user?.uid) {
        return <Navigate to="/signin" />
    }
    return (
        <>
            <Container>
                <Row className=" mt-3">
                    <Col md="5">
                        <InputGroup>
                            <Input
                                type="text"
                                value={search}
                                placeholder="Please provide the username"
                                onChange={changeHandler}
                            />
                            <div>
                                <Button onClick={fetchAnime} color="secondary" >Get Fact</Button>
                            </div>
                        </InputGroup>

                    </Col>
                </Row>


            </Container>
        
            <div className="mx-5 my-5 display-5">
                {anime ? (<List anime={anime.data[rndInt].fact} image={anime.img} />) : (null)}{/*only if the anime is found then show the fact else display null */}
            </div>
        </>
    );
}

export default Home;