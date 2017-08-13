import React, { Component } from 'react';

export default class OneMoreKeg extends Component {
    constructor(props) {
        super(props);
    }

    onButtonPress = (e) => {
        var newKeg = this.props.openKeg(1);
        var kegs = this.props.kegs
        kegs.push(newKeg);
        this.props.onClick(kegs);
    }

    render() {
        return (
            <div>
                <button onClick={() => this.onButtonPress()}>One More Keg</button>
            </div>
        )
    }
}

const styles = {
    button: {

    }
}