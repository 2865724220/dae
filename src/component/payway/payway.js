import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {$http, Qs, DateF} from '../../tools';
import DatePicker from 'react-mobile-datepicker';
import {
  BrowserRouter as Router,
  NavLink as Link,
  Redirect
} from 'react-router-dom';

import initReactFastclick from 'react-fastclick';
initReactFastclick();

const params = Qs();



@inject('payway')
@observer
export default class custodyBank extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    /*this.props.payway.selectBank();*/
  }
  componentWillUnmount() {
    /*clearInterval(Interval);*/
  }
  render() {
    document.title = '还款方式';
        const {
          list,
          selectBank,
          bankIndex
           
        } = this.props.payway;
    return (
      <div className="payWay">
          <div className="bgfff">
             <p className="pay-title">支付金额</p>
               <div className="pay-num">￥<span>1300</span>元</div>
               <ul className="pay-bank-ul">
                {
                  list.map((item, index) =>{
                    return <li className="clearfix" key = {index}>
                      <img src={require('../../images/bankLogo/ICBC.png')} className="bank-logo" alt=""/>
                      <span>中国工商银行储蓄卡 (8347)</span>
                      <span className={ bankIndex == index ?'bank-s bank-sed':'bank-s'}  onClick={()=>selectBank(index)}></span>
                    </li> 
                  })
                }
                  {/*<li className="clearfix">
                    <img src={require('../../images/bankLogo/ICBC.png')} className="bank-logo" alt=""/>
                    <span>中国工商银行储蓄卡 (8347)</span>
                    <span className="bank-s" onClick={selectBank(this,index)}><i></i></span>
                  </li>
                  <li className="clearfix">
                    <img src={require('../../images/bankLogo/ICBC.png')} className="bank-logo" alt=""/>
                    <span>中国工商银行储蓄卡 (8347)</span>
                    <span className="bank-s bank-sed" onClick={selectBank(this,index)}><i></i></span>
                  </li>*/}
                   <li className="clearfix unused">
                    <img src={require('../../images/bankLogo/ICBC.png')} className="bank-logo" alt=""/>
                    <span>中国工商银行储蓄卡 (8347)</span>
                    <span className="fr">卡内余额不足</span>
                  </li>
               </ul>
               <div className="use-new-bank clearfix">
                  <span>使用新卡还款</span>
                  <img src={require('../../images/more-arrow.png')} className="new-card" alt=""/>
               </div>
          </div>
          <p className="pay-tips">温馨提示:请保证您的银行卡有充足余额以保证还款成功</p>
          
          <a href="javascript:;" className = "submit-btn submit-open">确认支付</a>

          <div className="password-modal">
            <div className="password-body">
              <div className="password-title">
                <span>请输入交易密码</span>
                <em>关闭</em>
              </div>
              <div className="password-con clearfix">
               <ul className="password-dot clearfix">
                <li className=""><i>.</i></li>
                <li className=""><i>.</i></li>
                <li className=""><i>.</i></li>
                <li className=""><i>.</i></li>
                <li className=""><i>.</i></li>
                <li className=""><i>.</i></li>
               </ul>
              </div>
            </div>
            <div className="keyboard">
              <ul className="board-num clearfix">
                <li><span>1</span></li>
                <li><span>2</span></li>
                <li><span>3</span></li>
                <li><span>4</span></li>
                <li><span>5</span></li>
                <li><span>6</span></li>
                <li><span>7</span></li>
                <li><span>8</span></li>
                <li><span>9</span></li>
                <li><span>关闭</span></li>
                <li><span>0</span></li>
                <li><span>删除</span></li>
              </ul>
            </div>
          </div>
      </div>
      
    )
  }
}

