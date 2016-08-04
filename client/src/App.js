import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard.js';


ReactDOM.render(<Dashboard />, document.getElementById('app')); 

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
         <div>Hello World</div>   
        );
    }
}