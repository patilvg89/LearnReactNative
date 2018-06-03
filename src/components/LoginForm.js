import React, {Component} from 'react'
import {Alert, Text} from 'react-native'
import {AlertDialog, Button, Card, CardSection, Input, Spinner} from "./common"

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {email: 'vrgptl@gmail.com', password: 'virendra', error: '', loading: false};
    }

    mRenderButton() {
        if (this.state.loading) {
            return <Spinner size={'small'}/>
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log in
            </Button>
        );
    }

    mRenderSuccessDialog() {
        return (
            Alert.alert('Login Success')
        );
    }

    onButtonPress() {
        const {email, password} = this.state;

        this.setState({error: '', loading: true})

        console.log(email + '-' + password)
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.onLoginSuccess()
            })
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        this.onLoginSuccess()
                    })
                    .catch(() => {
                        this.onLoginFailed()
                    })
            })
    }

    onLoginFailed() {
        console.log("User Already exists or server error");

        this.setState({
            error: 'Authentication failed',
            loading: false
        })
    }

    onLoginSuccess() {
        console.log("Login Success or New user create success");
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false,
        });

        this.mRenderSuccessDialog()
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        placeholder={'email'}
                        autoCorrect={false}
                        value={this.state.email}
                        onChangeText={text => this.setState({email: text})}/>
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder={'password'}
                        value={this.state.password}
                        onChangeText={text => this.setState({password: text})}/>
                </CardSection>

                <Text style={styles.errorTextStyle}>{this.state.error}</Text>

                <CardSection>
                    {this.mRenderButton()}
                </CardSection>

            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};
export default LoginForm;