import React from 'react';
import ReactDOM from 'react-dom';
import Toast from './toast';
import './toast.css';

class ToastWrap extends React.Component {

    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {content: ''};
    }

    setContent = ({content, duration}) => {
        let ms = duration > 300 ? duration : 1500;
        this.setState({content: content}, () => {
            this.timer = setTimeout(() => {
                this.clearContent();
            }, ms);
        });
    }

    clearContent = () => {
        this.setState({content: ''}, () => {
            clearTimeout(this.timer);
        });
    }

    componentWillUnmount () {
        clearTimeout(this.timer);
    }

    render() {
        return (
            this.state.content
                ? <Toast options={{
                        content: this.state.content,
                        close: this.clearContent
                    }}/> : ''
        )
    }
}

ToastWrap.create = function() {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const toastWrap = ReactDOM.render(<ToastWrap/>, div);

    return {
        notice(props) {
            toastWrap.setContent(props);
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        }
    }
}

let _notice;
const notice = (content, duration) => {
    if(!_notice) {
        _notice = ToastWrap.create(content);
    }
    _notice.notice({content, duration})
}

export default {
    show: (content, duration) => notice(content, duration),
    hide() {
        if (_notice) {
            _notice.destroy();
            _notice = null;
        }
    },
}