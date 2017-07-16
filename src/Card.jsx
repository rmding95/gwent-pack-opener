import React, { Component } from 'react';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.card.name,
            art: props.card.art,
            premium: props.card.premium,
            group: props.card.group
        }
    }

    render() {
        return (
            <div style={styles.card}>
                <span>{this.state.name}</span>
            </div>
        )
    }
}

let styles = {
    card: {
        borderRadius: 5,
        width: 100,
        height: 20

    }
}

