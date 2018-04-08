import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import Toast from '../../common/toast'

const style = {
    button: {
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        borderRadius: '4px',
        padding: '0 0.4rem'
    },
    input: {
        width: '10rem',
        height: '1.5rem',
        border: '1px solid #ccc',
        borderRadius: '3px',
        padding: '0.6rem 0.4rem'
    }
}

@inject('demoStore')
@observer
class Demo extends Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){ }

    componentWillReact(){
        // 
    }

    showToast = () => {
        Toast.show('呵呵哒');
    }

    showDate = (YY, M) => {
        return M + '/' + YY;
    }

    selectDate = (event) => {
        const val = event.target.value;
        const d = new Date(val);
        const YY = (d.getFullYear() + '').substring(2);
        const M = d.getMonth() + 1 + '';
        this.showDate(YY, M)
    }

    render() {
        const { num, str, arr, obj, add, handleChange, remote, addKey } = this.props.demoStore;
        return (
            <div>
                <p key='1'>demo</p>

                <div key='2'>
                    <input style={style.input} value={str} onChange={(e) => handleChange('str', e.target.value)}/>
                </div>
                <p key='3'>{str}</p>

                <div key='4' style={{"marginTop": "20px"}}>
                    <input style={style.button} type="button" value='点击+1' onClick={add} />
                </div>
                <p key='5'>{num}</p>

                <div key='6' style={{"marginTop": "20px"}}>
                    <input style={style.button} type="button" value='远程请求' onClick={remote} />
                </div>
                <div key='7'>
                {
                    arr.map((item, index)=>{
                        return <span style={{backgroundColor: '#fff'}} key={index+'_item'}>{item},</span>
                    })
                }
                </div>

                <div>
                    <input style={style.button} type="button" value='添加key' onClick={addKey} />
                    <p>{JSON.stringify(obj)}</p>
                    {
                        // <p>{JSON.stringify(obj)}</p>
                        (()=>{
                            for(let i in obj){
                                <p>
                                    <span>{i}</span> : <span>{obj[i]}</span>
                                </p>
                            }
                        })()
                    }
                </div>

                <div key="8">
                    <p style={{padding: '1rem'}}>toast</p>
                    <button style={style.button} onClick={this.showToast}>显示toast</button>
                </div>

                <div style={{position: 'relative'}}>
                    <input type="month" style={{
                        'position': 'absolute',
                        'display':'block',
                        'border':'1px solid red',
                        'width': '100%',
                        'height': '100%',
                        'textAlign': 'right',
                        'opacity': '0.5',
                    }} onChange={this.selectDate} ref="date"></input>
                    <p style={{'backgroundColor': '#fff', 'height': '2.7rem', lineHeight: '2.7rem'}}>日期选择——{'10/20'}</p>
                </div>
            </div>
        )
    }
}

export default Demo;