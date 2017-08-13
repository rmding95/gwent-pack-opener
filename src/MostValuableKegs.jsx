import React, { Component } from 'react';

import CardRow from './CardRow.jsx';

export default class MostValuableKegs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mvKegs: props.mvKegs
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({mvKegs: nextProps.mvKegs});
    }

    render() {
        var counter = 1;
        console.log(this.state.mvKegs);
        var listItems = this.state.mvKegs.map((data, i) => {
            return (
                <div key={i}>
                    <CardRow keg={data.cards} key={data.cards[0].name + data.cards[1].name + data.cards[2].name + data.cards[3].name} rowNum={counter++}></CardRow>
                    <span>Scrap Value: {data.totalScrapValue}</span>
                </div>
            )
        });
        return (
            <div style={styles.area}>
                <h2>Most Valuable Kegs</h2>
                {listItems}
            </div>
        )
    }
}

const styles = {
    area: {
        width: '75%',
        margin: 'auto',
        paddingBottom: 20
    }
}