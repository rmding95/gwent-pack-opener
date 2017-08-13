import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import OpenedCardList from './OpenedCardList.jsx';
import NumberOfKegs from './NumberOfKegs.jsx';
import OneMoreKeg from './OneMoreKeg.jsx';
import MostValuableKegs from './MostValuableKegs.jsx';
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

const commonScrapValue = 20;
const rareScrapValue = 80;
const epicScrapValue = 200;
const legendaryScrapValue = 400;

// not sure about these values yet
const commonPremiumScrapValue = 50;
const rarePremiumScrapValue = 80;
const epicPremiumScrapValue = 200;
const legendaryPremiumScrapValue = 400;

const topMostValuableKegsToDisplay = 5;

// need to double check for non-collectable cards
var data = require('./data/card_json.json');

class App extends Component {
    constructor(props) {
        super(props);
        
        var cardData = {};
        data.forEach(function(element) {
            if (!(element.rarity in cardData)) {
                cardData[element.rarity] = []
            }
            cardData[element.rarity].push(element);
        }, this);
        var seed = getRandomInt(1, 10000);
        this.state = {
            initialKegs: 50,
            seed: seed,
            cardData: cardData,
            openedKegs: []
        }
    }

    // not using seed for now
    // pity timer not implemented yet
    openKeg = (seed) => {
        // generate first 4 cards
        var cards = [];
        var totalScrapValue = 0;
        for (var i = 0; i < 4; i++) {
            // card starts as common
            var rarity = 'Common';
            var roll = Math.random();
            var premium = false;
            totalScrapValue = totalScrapValue + commonScrapValue;
            if (roll <= commonToRareUpgradeChance) {
                // upgraded to rare
                rarity = 'Rare';
                roll = Math.random();
                totalScrapValue = totalScrapValue + rareScrapValue - commonScrapValue;
                if (roll <= rareToEpicUpgradeChance) {
                    // upgraded to epic
                    rarity = 'Epic'
                    roll = Math.random();
                    totalScrapValue = totalScrapValue + epicScrapValue - rareScrapValue;
                    if (roll <= epicToLegendaryUpgradeChance) {
                        // upgraded to legendary
                        rarity = 'Legendary';
                        totalScrapValue = totalScrapValue + legendaryScrapValue - epicScrapValue;;
                    }
                }
            }
            var premiumRoll = Math.random();
            if (premiumRoll <= premiumUpgradeChance) {
                premium = true;
                if (rarity === 'Common') {
                    totalScrapValue = totalScrapValue - commonScrapValue + commonPremiumScrapValue;
                } else if (rarity === 'Rare') {
                    totalScrapValue = totalScrapValue - rareScrapValue + rarePremiumScrapValue;
                } else if (rarity === 'Epic') {
                    totalScrapValue = totalScrapValue - epicScrapValue + epicPremiumScrapValue;
                } else {
                    totalScrapValue = totalScrapValue - legendaryScrapValue + legendaryPremiumScrapValue;
                }
            }
            var cardRoll = getRandomInt(0, this.state.cardData[rarity].length);
            var card = this.state.cardData[rarity][cardRoll];
            card['premium'] = premium;
            cards.push(card);
        }
        // generate choices for 5th card, starts as rare
        var fifthRoll = Math.random();
        var fifthCardRarity = 'Rare';
        // not accounting for premium scrap values in 5th card choice yet
        totalScrapValue = totalScrapValue + rareScrapValue;
        if (fifthRoll <= rareToEpicUpgradeChance) {
            fifthRoll = Math.random();
            fifthCardRarity = 'Epic';
            totalScrapValue = totalScrapValue + epicScrapValue - rareScrapValue;
            if (fifthRoll <= epicToLegendaryUpgradeChance) {
                fifthCardRarity = 'Legendary';
                totalScrapValue = totalScrapValue + legendaryScrapValue - epicScrapValue;
            }
        }
        var choices = this.state.cardData[fifthCardRarity];
        var choice1Roll = getRandomInt(0, choices.length)
        var choice1 = choices[choice1Roll]
        var choice1PremiumRoll = Math.random();
        choice1['premium'] = (choice1PremiumRoll <= premiumUpgradeChance);
        var choice2Roll = getRandomInt(0, choices.length);
        // observed situation where choice1 and choice2 rolls were the same
        while (choice2Roll === choice1Roll) {
            choice2Roll = getRandomInt(0, choices.length);
        }
        var choice2 = choices[choice2Roll];
        var choice2PremiumRoll = Math.random();
        choice2['premium'] = (choice2PremiumRoll <= premiumUpgradeChance);
        var choice3Roll = getRandomInt(0, choices.length);
        while (choice3Roll === choice1Roll && choice3Roll === choice2Roll) {
            choice3Roll = getRandomInt(0, choices.length);
        }
        var choice3 = choices[choice3Roll];
        var choice3PremiumRoll = Math.random();
        choice3['premium'] = (choice3PremiumRoll <= premiumUpgradeChance);
        var fifthCard = [choice1, choice2, choice3];
        cards.push(fifthCard);
        return {cards: cards, totalScrapValue: totalScrapValue};
    }

    renderKegs = (numKegs) => {
        var allCards = [];
        var kegsAndScrap = [];
        var mvKegs = [];
        for (var i = 0; i < numKegs; i++) {
            var data = this.openKeg(1);
            allCards.push(data.cards);
            kegsAndScrap.push(data);
        }
        mvKegs = this.calculateMostValuableKegs(kegsAndScrap);
        this.setState({kegsAndScrap: kegsAndScrap});
        this.setState({mvKegs: mvKegs});
        this.setState({openedKegs: allCards});        
    }

    calculateMostValuableKegs = (data) => {
        data.sort((a, b) => {
            return a.totalScrapValue - b.totalScrapValue;
        });
        if (data.length <= 5) {
            return data;
        } else {
            return data.slice(data.length - topMostValuableKegsToDisplay);
        }
    }

    listenForEnterKeyPress = (value) => {
        this.renderKegs(value);
    }

    oneMoreKegButtonPress = (kegs) => {
        var newKeg = kegs[kegs.length - 1].cards;
        var openedKegs = this.state.openedKegs;
        openedKegs.push(newKeg);
        var mvKegs = this.calculateMostValuableKegs(kegs);
        this.setState({openedKegs: openedKegs});
        this.setState({mvKegs: mvKegs});
        this.setState({kegsAndScrap: kegs});
    }

    // show loading screen while pack opening is loading
    componentWillMount() {
        this.renderKegs(this.state.initialKegs);
    }

    render() {
        return (
            <div>
                <NumberOfKegs numKegs={this.state.initialKegs} onKeyPress={this.listenForEnterKeyPress}></NumberOfKegs>
                <MostValuableKegs mvKegs={this.state.mvKegs}></MostValuableKegs>
                <OpenedCardList openedKegs={this.state.openedKegs}></OpenedCardList>
                <OneMoreKeg onClick={this.oneMoreKegButtonPress} kegs={this.state.kegsAndScrap} openKeg={this.openKeg}></OneMoreKeg>
            </div>
        )
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default App;
