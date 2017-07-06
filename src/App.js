import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// ASSUMPTIONS
// rarity of cards in packs is determined by seed
// cards are chosen randomly
// legendary average 1 out of 20 kegs
// epic average 1 out of 5 kegs
// rare average 1 out of ? kegs

// legendary pity timer: 40 kegs
// epic pity timer: 15 kegs ??

// ASSUMING: 71.45% common, 22.76% rare, 4.59% epic and 1.19% legendary
// 23.2% chance common -> rare
const commonToRareUpgradeChance = 0.232;
// 20.5% chance rare -> epic
const rareToEpicUpgradeChance = 0.205;
// 20.6% chance epic -> legendary
const epicToLegendaryUpgradeChance = 0.206;
// not sure about premium chances yet
const premiumUpgradeChance = 0.02

var data = require('./data/card_json.json');

class App extends Component {
    constructor() {
        super();
        
        var cardData = {};
        data.forEach(function(element) {
            if (!(element.rarity in cardData)) {
                cardData[element.rarity] = []
                cardData[element.rarity].push(element);
            } else {
                cardData[element.rarity].push(element);
            }
        }, this);

        var seed = getRandomInt(1, 10000);
        this.state = {
            initialKegs: 50,
            seed: seed,
            cardData: cardData
        }
    }

    // not using seed for now
    _openKeg = (seed) => {
        // generate first 4 cards
        var cards = [];
        for (var i = 0; i < 4; i++) {
            // card starts as common
            var rarity = 'Common';
            var roll = Math.random();
            var premium = false;
            if (roll <= commonToRareUpgradeChance) {
                // upgraded to rare
                rarity = 'Rare';
                roll = Math.random();
                if (roll <= rareToEpicUpgradeChance) {
                    // upgraded to epic
                    rarity = 'Epic'
                    roll = Math.random();
                    if (roll <= epicToLegendaryUpgradeChance) {
                        // upgraded to legendary
                        rarity = 'Legendary';
                    }
                }
            }
            var premiumRoll = Math.random();
            if (premiumRoll <= premiumUpgradeChance) {
                premium = true;
            }
            var cardRoll = getRandomInt(0, this.state.cardData[rarity].length);
            cards.push(this.state.cardData[rarity][cardRoll]);
        }
        // generate choices for 5th card, starts as rare
        var fifthRoll = Math.random();
        var rarity = 'Rare';
        if (fifthRoll <= rareToEpicUpgradeChance) {
            fifthRoll = Math.random();
            rarity = 'Epic';
            if (fifthRoll <= epicToLegendaryUpgradeChance) {
                rarity = 'Legendary';
            }
        }
        var choices = this.state.cardData[rarity];
        var choice1Roll = getRandomInt(0, choices.length)
        var choice1 = choices[choice1Roll]
        choices.splice(choice1Roll, 1);
        var choice2Roll = getRandomInt(0, choices.length);
        var choice2 = choices[choice2Roll];
        choices.splice(choice2Roll, 1);
        var choice3Roll = getRandomInt(0, choices.length);
        var choice3 = choices[choice3Roll];
        var fifthCard = [choice1, choice2, choice3];
        cards.push(fifthCard);
        console.log(cards);
    }

    // show loading screen while pack opening is loading
    componentDidMount() {
        this._openKeg(1);
    }

    render() {
        return (
            <div></div>
        )
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default App;