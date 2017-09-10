import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
var FontAwesome = require('react-fontawesome');

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.card.name,
            art: props.card.art,
            premium: props.card.premium,
            group: props.card.group,
            rarity: props.card.rarity,
        }
    }

    getStyles = (rarity, premium) => {
        return Object.assign(
            styles.card,
            (rarity === 'Common') ? styles.Common : (rarity === 'Rare') ? styles.Rare : (rarity === 'Epic') ? styles.Epic : styles.Legendary
        );
    }

    showCardImage = (e) => {
        this.setState({isMouseInside: true});
    }

    removeCardImage = () => {
        this.setState({isMouseInside: false});
    }

    render() {
        const premium = this.state.premium;
        var isMouseInside = this.state.isMouseInside;
        var cardImage = null;
        if (isMouseInside) {
            var src = "./src/" + this.state.art;
            cardImage = <img src={src} style={styles.image}/>
        }

        var premiumStar = null;
        if (premium) {
            premiumStar = <FontAwesome name='star-o' style={{color: 'yellow'}}></FontAwesome>
        }

        return (
            <div onClick={(e) => this.showCardImage(e)} onMouseEnter={() => this.showCardImage} onMouseLeave={() => this.removeCardImage} style={this.getStyles(this.state.rarity, this.state.premium)}>
                {cardImage}
                {premiumStar}
                <span>{this.state.name}</span>
            </div>
        )
    }
}

let styles = {
    card: {
        borderRadius: 5,
        height: 20,
        float: 'right',
        padding: 10,
        width: '20%'
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
    },
    image: {
        height: 50,
        width: 50
    }
}

