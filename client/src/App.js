import React from 'react';
import ReactDOM from 'react-dom';


ReactDOM.render(<Dashboard />, document.getElementById('app')); 

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <div className='container'>
            <div>Hello World</div>
        </div>
        );
    }
}