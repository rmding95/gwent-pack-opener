import React, { Component } from 'react';

const NORTHERN_REALMS_FACTION = 'Northern Realms';
const NILFGAARD_FACTION = 'Nilfgaard';
const MONSTERS_FACTION = 'Monsters';
const SKELLIGE_FACTION = 'Skellige';
const SCOIATAEL_FACTION = 'Scoia\'tael';
const NEUTRAL_FACTION = 'Neutral';
const BRONZE_GROUP = 'Bronze';
const SILVER_GROUP = 'Silver';
const GOLD_GROUP = 'Gold';
const COMMON_RARITY = 'Common';
const RARE_RARITY = 'Rare';
const EPIC_RARITY = 'Epic';
const LEGENDARY_RARITY = 'Legendary';

export default class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openedKegs: props.openedKegs,
            factionCounts: {},
            rarityCounts: {},
            groupCounts: {}
        }
    }

    componentWillMount() {
        calculateStats(this.state.openedKegs);
    }

    calculateStats = (openedKegs) => {
        var numberOfCommons = 0;
        var numberOfRares = 0;
        var numberOfEpics = 0;
        var numberOfLegendaries = 0;
        var numberOfPremiumCommons = 0;
        var numberOfPremiumRares = 0;
        var numberOfPremiumEpics = 0;
        var numberOfPremiumLegendaries = 0;
        var numberOfBronzes = 0;
        var numberOfSilvers = 0;
        var numberOfGolds = 0;
        var numberOfPremiumBronzes = 0;
        var numberOfPremiumSilvers = 0;
        var numberOfPremiumGolds = 0;
        var numberOfNeutral = 0;
        var numberOfNortherRealms = 0;
        var numberOfNilfgaard = 0;
        var numberOfSkellige = 0;
        var numberOfMonsters = 0;
        var numberOfScoiatael = 0;
        openedKegs.forEach((keg) => {
            keg.forEach((card) => {
                switch(card.faction) {
                    case NILFGAARD_FACTION:
                        numberOfNilfgaard++;
                    case NORTHERN_REALMS_FACTION:
                        numberOfNortherRealms++;
                    case MONSTERS_FACTION:
                        numberOfMonsters++;
                    case SKELLIGE_FACTION:
                        numberOfSkellige++;
                    case SCOIATAEL_FACTION:
                        numberOfScoiatael++;
                    case NEUTRAL_FACTION:
                        numberOfNeutral++;
                }
                switch(card.rarity) {
                    case COMMON_RARITY:
                        if (card.premium) {
                            numberOfPremiumCommons++;
                        } else {
                            numberOfCommons++;
                        }
                    case RARE_RARITY:
                        if (card.premium) {
                            numberOfPremiumRares++;
                        } else {
                            numberOfRares++;
                        }
                    case EPIC_RARITY:
                        if (card.premium) {
                            numberOfPremiumEpics++;
                        } else {
                            numberOfEpics++;
                        }
                    case LEGENDARY_RARITY:
                        if (card.premium) {
                            numberOfPremiumLegendaries++;
                        } else {
                            numberOfLegendaries++;
                        }
                }
                switch(card.group) {
                    case BRONZE_GROUP:
                        if (card.premium) {
                            numberOfPremiumBronzes++;
                        } else {
                            numberOfBronzes++;
                        }
                    case SILVER_GROUP:
                        if (card.premium) {
                            numberOfPremiumSilvers++;
                        } else {
                            numberOfSilvers++;
                        }
                    case GOLD_GROUP:
                        if (card.premium) {
                            numberOfPremiumGolds++;
                        } else {
                            numberOfGolds++;
                        }
                }
            });
        });
        updateFactionCounts(numberOfNortherRealms, numberOfNilfgaard, numberOfMonsters, numberOfSkellige, numberOfNeutral, numberOfScoiatael);
        updateRarityCounts(numberOfCommons, numberOfRares, numberOfEpics, numberOfLegendaries, numberOfPremiumCommons, numberOfPremiumRares, numberOfPremiumEpics, numberOfPremiumLegendaries);
        updateGroupCounts(numberOfBronzes, numberOfSilvers, numberOfGolds, numberOfPremiumBronzes, numberOfPremiumSilvers, numberOfPremiumGolds);
    }

    updateFactionCounts = (numberOfNortherRealms, numberOfNilfgaard, numberOfMonsters, numberOfSkellige, numberOfNeutral, numberOfScoiatael) => {
        factionCounts = {NORTHERN_REALMS_FACTION: numberOfNortherRealms, NILFGAARD_FACTION: numberOfNilfgaard, 
                         MONSTERS_FACTION: numberOfMonsters, SKELLIGE_FACTION: numberOfSkellige, NEUTRAL_FACTION: numberOfNeutral, SCOIATAEL_FACTION: numberOfScoiatael};
        this.setState({factionCounts: factionCounts});
    }

    updateRarityCounts = (numberOfCommons, numberOfRares, numberOfEpics, numberOfLegendaries, numberOfPremiumCommons, numberOfPremiumRares, numberOfPremiumEpics, numberOfPremiumLegendaries) => {
        rarityCounts = {COMMON_RARITY: {regular: numberOfCommons, premium: numberOfPremiumCommons}, RARE_RARITY: {regular: numberOfRares, premium: numberOfPremiumRares}, 
                        EPIC_RARITY: {regular: numberOfEpics, premium: numberOfPremiumEpics}, LEGENDARY_RARITY: {regular: numberOfLegendaries, premium: numberOfPremiumLegendaries}};
        this.setState({rarityCounts: rarityCounts});
    }

    updateGroupCounts = (numberOfBronzes, numberOfSilvers, numberOfGolds, numberOfPremiumBronzes, numberOfPremiumSilvers, numberOfPremiumGolds) => {
        groupCounts = {BRONZE_GROUP: {regular: numberOfBronzes, premium: numberOfPremiumBronzes}, SILVER_GROUP: {regular: numberOfSilvers, premium: numberOfPremiumSilvers},
                       GOLD_GROUP: {regular: numberOfGolds, premium: numberOfPremiumGolds}};
        this.setState({groupCounts: groupCounts});
    }

    render() {
        return (
            <div></div>
        )
    }
}


