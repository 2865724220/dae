import React, { Component } from 'react';
import {$http, Qs, DateF} from '../../tools';
import Toast from '../../common/toast';

const params = Qs();

 export default class borrowProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer:null,
      second:3,
    }
  }
  componentDidMount() {
    this.state.timer = setInterval(()=>{
      this.setState({second:--this.state.second})
      if(this.state.second < 1){
         /* if(isiOS){
            closeThisPage();
          }else{
              nativeMethod.returnNativeMethod('4', 0, '', '');
          }   */ 
        }
    }, 1000);

   console.log(this.state.second);
  }

 componentWillUnmount () {
    clearInterval(this.state.timer);
  }


  render() {
    document.title = '还款中';
   /* const {bankCard} = this.state;*/
    return (
      <div className="paying-wrap">
         <img src={require('../../images/paying.png')} className="paying-img" alt=""/> 
         <div className="paying-time">
            <p className="big">还款中...</p>
            还有<span className="countDown">{this.state.second}</span>秒返回借款记录
         </div>
      </div>
    );
  }
}

