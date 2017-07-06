import React, { Component } from 'react';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.card.name,
            art: props.card.art,
            premium: props.premium,
            group: props.card.group
        }
    }

    render() {
        return (
            <div></div>
        )
    }
}

module.exports = Card;