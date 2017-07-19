import React, { Component } from 'react';

import Card from './Card.jsx';
import FifthCardChoice from './FifthCardChoice.jsx';

export default class CardRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keg: props.keg
        }
    }

    render() {
        return (
            <div style={styles.row}>
                <Card card={this.state.keg[0]}></Card>
                <Card card={this.state.keg[1]}></Card>
                <Card card={this.state.keg[2]}></Card>
                <Card card={this.state.keg[3]}></Card>
                <FifthCardChoice choices={this.state.keg[4]}></FifthCardChoice>
            </div>
        )
    }
}

const styles = {
    row: {
        width: '100%',
        height: 50
    }
}

