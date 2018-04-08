import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {$http, Qs, DateF} from '../../tools';
import DatePicker from 'react-mobile-datepicker';
/*import initReactFastclick from 'react-fastclick';
initReactFastclick();*/

const params = Qs();


let Interval = null;

@inject('bindcredit')
@observer
export default class bindCredit extends Component {
	constructor(props) {
		super(props);
        this.timer = null;
	}
	
	componentDidMount() {
		/*console.log(this.state)*/
		this.props.bindcredit.isBind();
		this.props.bindcredit.getUserInfo();
	}
	componentWillUnmount() {
		clearInterval(Interval);
	}
	render() {
		document.title = '绑定信用卡';
        const {
            bankNo, getBankNo, bankName, mobile,userName,
            period, 
            smsCode, sendSmsCode, codeText,
            canApply, verifyRequired,
            show, tipStr, showTips,
            confirmBindCard, handleChange,getUserInfo,isBinded,
            open, time, openDatePicker, selectDate
        } = this.props.bindcredit;

		return (
			<div className="bindCredit">
				{/* <div className="header header-blue">
		            <a className="back_arr" href="javascript:void(0);"></a>
		            <h1>绑定信用卡</h1>
		        </div>*/}
		        <div className="mailbox-wrap">
		          <ul className="input-list">
		              <li>
		                <div className="label">持卡人</div>
		                <div className="input-c">
		                  {userName}
		                </div>
		              </li>
		              <li>
		                <div className="label">银行卡号</div>
		                <div className="input-c">
		                  <span style={{display:isBinded ? 'none': 'block'}}>{bankNo}</span>
		                  <input style={{display:isBinded ? 'block': 'none'}} type="number" value={bankNo} placeholder="请输入银行卡号" onChange={getBankNo}/>
		                </div>
		              </li>
		              <li>
		                <div className="label">卡类型</div>
		                <div className="input-c">
		                {bankName}
		                </div>
		              </li>
		            </ul>
		            <ul className="input-list">
		            <li className="help-info">
		                <div className="label">有效期</div>
		                <img src={require('../../images/apply_help_icon.png')} alt=""  onClick={()=>showTips(0)} />
		                <div className="input-c">
                           	<span style={{display:isBinded ? 'none': 'block'}}>{period}</span>

		                  	<div className="date-picker" style={{display:isBinded ? 'block': 'none'}}>
								<div className="select-btn" style={{color:period ? '#666':'#999'}} onClick={openDatePicker}>{period ? period:'请选择有效期'}</div>
								<DatePicker value={time} isOpen={open} onSelect={selectDate} onCancel={openDatePicker} theme='ios' dateFormat={['YYYY', 'MM']} showFormat='MM/YY'/>
							</div>
		                </div>
		              </li>
		              <li className="help-info">
		                <div className="label">手机号</div>
		                <img src={require('../../images/apply_help_icon.png')} alt=""  onClick={()=>showTips(1)} />
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
		           {/* <!-- 弹窗 -->*/}
		            <div className="help-tc" style={{display:show ? 'block': 'none'}}>
		              <div className="help-tc-inner">
		                <div className="help-text">{tipStr}</div>
		                <a href="javascript:;" className="confirm-btn" onClick={showTips}> 我知道了</a>
		              </div>
		              <div className="overlay"></div>
		            </div>
		           {/* <!-- 弹窗 -->
		            <!-- 可以提交则加类名submit-open -->*/}
		            <a href="javascript:;" style={{display:isBinded ? 'block': 'none'}}  className={canApply ? "submit-btn submit-open" : "submit-btn"} onClick={()=>{ canApply ? confirmBindCard():''}}>确认绑卡</a>
		          <span className="safe" style={{'marginTop':'8rem'}}><img src={require('../../images/dp.png')} />银行级数据加密防护</span>
		        </div>
			</div>
			
		)
	}
}

