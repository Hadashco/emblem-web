import React from 'react';
import ReactDOM from 'react-dom';


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