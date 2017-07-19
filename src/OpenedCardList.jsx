import React, { Component } from 'react';

import CardRow from './CardRow.jsx';

export default class OpenedCardList extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            openedKegs: props.openedKegs
        }
    }

    componentDidMount() {

    }

    render() {
        const listItems = this.state.openedKegs.map((keg) => {
            return (
                <CardRow keg={keg}></CardRow>
            )
        });       
        return (
            <div style={styles.area}>{listItems}</div>
        )
    }
}

const styles = {
    area: {
        width: '66%',
        margin: 'auto'
    }
}
