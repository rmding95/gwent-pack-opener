import React, { Component } from 'react';

import Card from './Card.jsx';

export default class FifthCardChoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choices: props.choices
        }
    }

    render() {
        return (
            <div>
                <Card card={this.state.choices[0]}></Card>
                <Card card={this.state.choices[1]}></Card>
                <Card card={this.state.choices[2]}></Card>
            </div>
        )
    }
}

