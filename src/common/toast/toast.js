import React, { Component } from 'react';

class toast extends Component {

    constructor (props) {
        super(props);
    }

    render() {
        const { content, close } = this.props.options;
        return (
            <div className="toast-wrap" onClick={close}>
                <div className="toast-con">
                    <span>{content}</span>
                </div>
            </div>
        );
    }
}

export default toast;