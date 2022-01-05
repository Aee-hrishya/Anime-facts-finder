import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Form, Button, FormGroup, Label, Col, Input, Row, Card, CardBody, CardFooter, CardHeader } from "reactstrap";
import UserContext from "../Context/UserContext";

function Signup() {

    const context = useContext(UserContext);

    //current component states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () => {
        //refer firebase docs for signup authentication
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                
                context.setUser({
                    email:userCredential.user.email,
                    uid:userCredential.user.uid
                })

            })
            .catch((error) => {
                toast(error.message, {
                    type:"warning"
                })
                // ..
            });
            
    }

    //Method to handle form submit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSignUp();
    }

    if(context.user?.uid){
        return <Navigate to="/" />// Redirecting the user to home page if the user is present else the signup form is shown
    }
    return (
        <Container className='text-center'>
            <Row>
                <Col lg={6} className='offset-lg-3 mt-5'>
                    <Card>
                        <Form onSubmit={handleFormSubmit}>
                            <CardHeader className=''>SignUp here</CardHeader>
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
                                    Sign Up
                                </Button>
                            </CardFooter>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;