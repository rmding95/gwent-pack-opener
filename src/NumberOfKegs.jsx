import React, { Component } from 'react';

export default class NumberOfKegs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numKegs: props.numKegs
        }
    }

    listenForEnterKeyPress = (e, callback) => {
        if (e.key === 'Enter') {
            this.props.onKeyPress(e.target.value);
        }
    }

    render() {
        return (
            <div style={styles.container}>
                <label htmlFor="numKegs" style={{width: '20%'}}># of Kegs</label>
                <input style={{width: '80%', marginLeft: 10}} type="text" id="numKegs" placeholder={this.state.numKegs} onKeyPress={this.listenForEnterKeyPress}/> 
            </div>
        )
    }
}

const styles = {
    container: {
        width: '75%',
        margin: 'auto',
        height: 30,
        padding: 20
    }
}