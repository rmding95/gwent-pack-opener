import React, { Component } from 'react';

import Card from './Card.jsx';
import FifthCardChoice from './FifthCardChoice.jsx';

export default class CardRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keg: props.keg,
            rowNum: props.rowNum
        }
    }

    render() {
        return (
            <div style={styles.row}>
                <div style={styles.a}>
                    {this.state.rowNum}
                    <Card card={this.state.keg[0]}></Card>
                    <Card card={this.state.keg[1]}></Card>
                    <Card card={this.state.keg[2]}></Card>
                    <Card card={this.state.keg[3]}></Card>
                </div>
                <div style={styles.b}>
                    <FifthCardChoice choices={this.state.keg[4]}></FifthCardChoice>
                </div>
            </div>
        )
    }
}

const styles = {
    row: {
        width: '100%',
        height: 50
    },
    a: {
        width: '66%',
        height: 50,
        float: 'left'
    },
    b: {
        width: '33%',
        height: 50,
        float: 'right'
    }
}

