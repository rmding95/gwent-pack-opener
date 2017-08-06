import React, { Component } from 'react';

import CardRow from './CardRow.jsx';

export default class OpenedCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openedKegs: props.openedKegs
        }
    }

    // the constructor is only called the first time the component renders
    componentWillReceiveProps(nextProps) {
        this.setState({openedKegs: nextProps.openedKegs});
    }

    render() {
        var counter = 1;
        var listItems;
        if (typeof this.state.openedKegs == 'undefined') {
            listItems = null;
        } else {
            // keys need to be unique or else react will not rerender 
            listItems = this.state.openedKegs.map((keg, i) => {
                return (
                    <CardRow keg={keg} key={keg[0].name + keg[1].name + keg[2].name + keg[3].name} rowNum={counter++}></CardRow>
                )
            });
        }       
        return (
            <div style={styles.area}>{listItems}</div>
        )
    }
}

const styles = {
    area: {
        width: '75%',
        margin: 'auto'
    }
}
