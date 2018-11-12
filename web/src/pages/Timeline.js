import React, { Component } from 'react';
import socket from 'socket.io-client';

import api from '../services/api';

import './Timeline.css';
import twitterLogo from '../twitter.svg';
import Tweet from '../components/Tweet';

export default class Timeline extends Component {

    state = {
        newTweet: '',
        tweets: []
    }

    async componentDidMount() {
        this.subscribeToEvents();

        const response = await api.get('tweets');
        this.setState({ tweets: response.data });
    }

    handleInputChange = (event) => {
        this.setState({ newTweet: event.target.value });
    }

    handleNewTweet = async (event) => {
        if (event.keyCode !== 13) return;
        const content = this.state.newTweet;
        const author = localStorage.getItem('@twitter:username');
        await api.post('tweets', { content, author });
        this.setState({ newTweet: '' });
    }

    subscribeToEvents = () => {
        const io = socket('http://localhost:3001');
        io.on('tweet', data => {
            this.setState({tweets: [data, ...this.state.tweets]});            
        });
        io.on('like', data => {
            this.setState({ tweets: this.state.tweets.map(tweet =>
                tweet._id === data._id ? data : tweet
                )})
        });
    }

    render() {
        return (
            <div className="timeline-wrapper">
                <img height={24} src={twitterLogo} alt="Twitter" />
                <form>
                    <textarea
                        value={this.state.newTweet}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweet}
                        placeholder="Whats happing?" />
                </form>

                <ul className="tweet-list">
                    {this.state.tweets.map(tweet => (
                        <Tweet key={tweet._id} tweet={tweet} />
                    ))}
                </ul>
            </div>
        );
    }
}