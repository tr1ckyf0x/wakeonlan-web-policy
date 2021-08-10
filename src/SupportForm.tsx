import React, { Fragment } from 'react';
import './SupportForm.css';
import Reaptcha from 'reaptcha';

interface State {
    name: string;
    email: string;
    message: string;
    captcha: string;
}

class SupportForm extends React.Component<any, State> {

    captcha: Reaptcha | null;

    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            captcha: ''
        };
        this.captcha = null;
    }

    handleChange = (event: React.FormEvent) => {
        const target = event.target as HTMLInputElement
        switch (target.name) {
            case "name":
                this.setState({ name: target.value });
                break;
            case "email":
                this.setState({ email: target.value });
                break;
            case "message":
                this.setState({ message: target.value });
                target.style.height = 'auto';
                target.style.height = (target.scrollHeight) + 'px';
                break;
        }
    }

    handleSubmit = () => {
        console.log("submitted");
        this.captcha?.execute();
    }

    onVerify = (recaptchaResponse: string) => {
        console.log(`CAPTCHA: ${recaptchaResponse}`);
        this.setState({ captcha: recaptchaResponse });
        this.sendReq();
    };

    async sendReq() {
        // POST request using fetch with async/await
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'ReCaptchaToken': this.state.captcha
            },
            body: JSON.stringify({
                username: this.state.name,
                email: this.state.email,
                message: this.state.message
            })
        };
        const response = await fetch(`https://us-central1-wakeonlan-63519.cloudfunctions.net/helloWorld`, requestOptions);
        const data = await response.json();
        console.log(data);
    }

    render() {
        return (
            <Fragment>
                <div className="SupportForm">
                    <div className="field-container" id="name-field-container">
                        <input className="field input-element" name="name" type="text" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                    </div>
                    <div className="field-container" id="email-field-container">
                        <input className="field input-element" name="email" type="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="field-container" id="message-field-container">
                        <textarea className="field textarea-element" name="message" placeholder="message" value={this.state.message} onChange={this.handleChange} />
                    </div>
                    <button type="button" id="submit-button" onClick={this.handleSubmit}>
                        Send
                    </button>
                </div>
                <Reaptcha
                    ref={e => (this.captcha = e)}
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY as string}
                    onVerify={this.onVerify}
                    size='invisible'
                />
            </Fragment>
        );
    }
}

export default SupportForm;
