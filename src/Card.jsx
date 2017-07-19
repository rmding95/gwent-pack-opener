import React, { Component } from 'react';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.card.name,
            art: props.card.art,
            premium: props.card.premium,
            group: props.card.group,
            rarity: props.card.rarity
        }
    }

    getStyles = (rarity) => {
        return Object.assign(
            styles.card,
            (rarity === 'Common') ? styles.Common : (rarity === 'Rare') ? styles.Rare : (rarity === 'Epic') ? styles.Epic : styles.Legendary
        );
    }

    render() {
        return (
            <div style={this.getStyles(this.state.rarity)}>
                <span>{this.state.name}</span>
            </div>
        )
    }
}

let styles = {
    card: {
        borderRadius: 5,
        width: 100,
        height: 20,
        float: 'right',
        padding: 10,
    },
    Common: {
        backgroundColor: 'rgb(118, 118, 118)'
    },
    Rare: {
        backgroundColor: 'rgb(33, 133, 208)'
    },
    Epic: {
        backgroundColor: 'rgb(163, 51, 200)'
    },
    Legendary: {
        backgroundColor: 'rgb(242, 113, 28)'
    }
}

