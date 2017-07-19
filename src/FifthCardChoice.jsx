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
            <div style={styles.area}>
                <Card card={this.state.choices[0]}></Card>
                <Card card={this.state.choices[1]}></Card>
                <Card card={this.state.choices[2]}></Card>
            </div>
        )
    }
}

const styles = {
    area: {
        float: 'right',
        border: '2px solid black',
        borderRadius: '2px'
    }
}

