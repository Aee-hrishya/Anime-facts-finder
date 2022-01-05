import { useContext, useState } from "react";
import UserContext from "../Context/UserContext";
import { Container, Form, Button, FormGroup, Label, Col, Input, Row, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

function Signin() {

    const context = useContext(UserContext);

    //Current component states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {

        //Firebase aunthentication steps refer firebase docs for this
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                context.setUser(
                    {
                        email:userCredential.user.email,
                        uid:userCredential.user.uid
                    }
                )
            })
            .catch((error) => {
                toast(error.message,{
                    type:"error"
                });
                
            });
    }

    //Method to handle form submit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSignIn();
    }

    //Condition to check if user is there or not is user is present then redirect him to Home page
    if(context.user?.uid){
        return <Navigate to="/"/>
    }
    return (
        <Container className='text-center'>
            <Row>
                <Col lg={6} className='offset-lg-3 mt-5'>
                    <Card>
                        <Form onSubmit={handleFormSubmit}>
                            <CardHeader className=''>SignIn here</CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Label for='email' sm={3}>
                                        Email
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            type='email'
                                            name='email'
                                            id='email'
                                            placeholder='Provide your email'
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='password' sm={3}>
                                        Password
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            type='password'
                                            name='password'
                                            id='password'
                                            placeholder='Your password here'
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardFooter>
                                <Button type='submit' block color='success'>
                                    Sign In
                                </Button>
                            </CardFooter>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Signin;