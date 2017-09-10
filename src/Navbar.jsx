import React, { Component } from 'react';
import logo from './logo.svg';

import { Tab, Tabs } from 'react-bootstrap';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Tabs defaultActiveKey={1} id="main-nav">
                <Tab eventKey={1} title="Cards"></Tab>
                <Tab eventKey={2} title="Stats"></Tab>
            </Tabs>
        )
    }
}