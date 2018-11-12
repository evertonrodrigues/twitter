import React, { Component } from 'react';

import './Login.css';
import twitterLogo from '../twitter.svg';

export default class Login extends Component {

    state = {
        username: ''
    }

    handleInputChange = (event) => {
        this.setState({ username: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { username } = this.state;

        if (!username.length) {
            return;
        }
        localStorage.setItem('@twitter:username', username);
        this.props.history.push('/timeline');
    }

    render() {
        return (
            <div className="login-wrapper">
                <img src={twitterLogo} alt="Twitter" />
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="Nome do usuário"
                        value={this.state.username}
                        onChange={this.handleInputChange} />
                    <button type="submit">Entrar</button>
                </form>
            </div>)
    }
}