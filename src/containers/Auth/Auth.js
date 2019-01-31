import React, {Component} from 'react';
import is from 'is_js';
import {connect} from 'react-redux'
import classes from './Auth.scss';
import Button from  '../../components/UI/Button/Button';
import Input from  '../../components/UI/Input/Input';
import {auth} from '../../store/actions/auth'

class Auth extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Enter valid email',
                autocomplete: "on",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            phone: {
                value: '+380.',
                type: 'tel',
                label: 'Phone',
                errorMessage: 'Enter valid phone number',
                autocomplete: "on",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    phone: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Enter valid password',
                autocomplete: "off",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    };

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
    };

    registerHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )

    };

    submitHandler = event => {
        event.preventDefault()
    };

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
        }
        if (validation.phone) {
            isValid = is.eppPhone(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {

        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        });

        this.setState({
            formControls, isFormValid
        })
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    autoComplete="on"
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Authentication</h1>

                    <form onSubmit={this.submitHandler} className={classes.AuthForm} autoComplete="on">

                        { this.renderInputs() }

                        <Button
                            type="succsess"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Signin
                        </Button>

                        <Button
                            type="primary"
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Signup
                        </Button>
                    </form>
                </div>
            </div>
        )
    }

}
function mapStateToProps(state){
    return {
        smth: state.auth.smth
    }
}
function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isRegistration) => dispatch(auth(email, password, isRegistration))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);