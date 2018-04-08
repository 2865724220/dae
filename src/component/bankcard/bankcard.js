import React, { Component } from 'react';
import {$http, Qs, DateF} from '../../tools';
import Toast from '../../common/toast';

const params = Qs();

 export default class borrowProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankCard:{},
    }
  }
  componentDidMount() {
    $http.post('/service/userInfo/user/card-info', {
            "userBankCardId": params.userBankCardId,
            "userId": params.userId,
      }).then(res=>{
         if(res.data && res.code== "00"){
          this.setState({
            bankCard: res.data.data || {}
          },()=>{
            /*console.log(this.state.bankCard)*/
          });
         }
      }, err => {
         /* alert("error");*/
          Toast.show("error");
      });
  }


  render() {
    document.title = '我的银行卡';
    const {bankCard} = this.state;
    return (
      <div className="bankCard">
         <div className="header header-blue">
            <a className="back_arr" href="javascript:void(0);"></a>
            <h1>我的银行卡</h1>
        </div>
         <div className="mailbox-wrap">
            <ul className="input-list confirmed-bankCard">
                <li>
                  <div className="label">持卡人</div>
                  <div className="input-c">
                    {bankCard.openName}
                  </div>
                </li>
                <li>
                  <div className="label">银行名称</div>
                  <div className="input-c">
                   {bankCard.bankName}
                  </div>
                </li>
                <li>
                  <div className="label">银行卡号</div>
                  <div className="input-c">
                   {bankCard.cardNo}
                  </div>
                </li>
                <li>
                  <div className="label">预留手机号</div>
                  <div className="input-c">
                   {bankCard.phone}
                  </div>
                </li>
              </ul>
            {/*可以提交则加类名submit-open*/} 
            <a rel="external" href="javascript:;" className="submit-btn submit-open">重新绑卡</a>

          <span className="safe" style={{'marginTop':'8rem'}}><img src={require('../../images/dp.png')} />银行级数据加密防护</span>
        </div>
      </div>
    );
  }
}

