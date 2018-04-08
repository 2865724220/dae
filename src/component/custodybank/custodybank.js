import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {$http, Qs, DateF} from '../../tools';
import DatePicker from 'react-mobile-datepicker';
import {
  BrowserRouter as Router,
  NavLink as Link,
  Redirect
} from 'react-router-dom';

/*import initReactFastclick from 'react-fastclick';
initReactFastclick();*/

const params = Qs();


let Interval = null;

@inject('custodybank')
@observer
export default class custodyBank extends Component {
  constructor(props) {
    super(props);
        this.timer = null;
  }
  
  componentDidMount() {
    this.props.custodybank.getUserInfo();
  }
  componentWillUnmount() {
    clearInterval(Interval);
  }
  render() {
    document.title = '绑定银行卡';
        const {
            bankNo, getBankNo, bankName, mobile,userName,userId,
            period, 
            smsCode, sendSmsCode, codeText,
            canApply, verifyRequired,
            show, tipStr, showTips,
            confirmBindCard, handleChange,getUserInfo,isBinded,
            open, time, openDatePicker, selectDate,goSupport
        } = this.props.custodybank;

    return (
      <div className="bindCredit">
            <div className="mailbox-wrap">
              <ul className="input-list">
                  <li>
                    <div className="label">持卡人</div>
                    <div className="input-c">
                      {userName}
                    </div>
                  </li>
                  <li>
                    <div className="label">身份证号</div>
                    <div className="input-c">
                      {userId}
                    </div>
                  </li>
                  <li>
                    <div className="label">银行卡号</div>
                    <div className="input-c">
                      <span style={{display:isBinded ? 'none': 'block'}}>{bankNo}</span>
                      <input style={{display:isBinded ? 'block': 'none'}} type="number" value={bankNo} placeholder="请输入银行卡号" onChange={getBankNo}/>
                    </div>
                  </li>
                  <li className="help-info">
                    <div className="label">银行卡开户行</div>
                    <img src={require('../../images/apply_help_icon.png')} alt=""  onClick={goSupport} />
                    <div className="input-c">
                    {bankName}
                    </div>
                  </li>
                </ul>
                <ul className="input-list">
                  <li className="help-info">
                    <div className="label">预留手机号</div>
                    <div className="input-c">
                      <span style={{display:isBinded ? 'none': 'block'}}>{mobile}</span>
                      <input style={{display:isBinded ? 'block': 'none'}} type="tel" value={mobile} placeholder="请输入银行预留手机号" onChange={(event)=>handleChange('mobile', event.target.value)} />
                    </div>
                  </li>
                    <li style={{display:isBinded ? 'block': 'none'}}>
                    <div className="label">验证码</div>
                    <div className="input-c sec-code">
                      <input type="tel" value={smsCode} onChange={(event)=>handleChange('smsCode', event.target.value)} placeholder="请输入短信验证码" />
                      <i className="sec-time" onClick={sendSmsCode}>{codeText}</i>
                    </div>
                  </li>
                </ul>
               {/* <!-- 可以提交则加类名submit-open -->*/}
               <div className="custody-tips">
                <span className="red">友情提示</span>：绑定存管卡后，此存管卡将作为您日后在由<span className="red">口袋理财</span>作为资金方的唯一收款卡。为了保证您的放款不受影响，请确保此卡真实有效。
               </div>
                <a href="javascript:;" style={{display:isBinded ? 'block': 'none'}}  className={canApply ? "submit-btn submit-open" : "submit-btn"} onClick={()=>{ canApply ? confirmBindCard():''}}>确认提交</a>
                <a href={`#/custodydetail`} className="custody-introduction">什么是存管？</a>
                <span className="safe" style={{'marginTop':'4rem'}}><img src={require('../../images/dp.png')} />银行级数据加密防护</span>
            </div>
      </div>
      
    )
  }
}

