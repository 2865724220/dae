import React, { Component } from 'react';
import {$http, Qs, DateF, toFix} from '../../tools';
import Toast from '../../common/toast';

const params = Qs();

 export default class borrowDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    borrowList:{},
    contractList:[],
    }
  }

  componentDidMount(){
    /*console.log($http)*/
    $http.get('/cashman-web/service/loan/users/loan-orders/detail' + '?loanId=' + params.loanId).then((res) => {
      if(res.data && res.code=='00'){
        this.setState({borrowList:res.data.loanOrderInfoDto || {} });
        this.setState({contractList:res.data.contractList || [] });
      }else{
        Toast.show(res.message);
      }
    }, e => {
      /*console.log(e, 'err')*/
      Toast.show("error");
    });
  }

  
  render() {
    document.title = '借款详情';
    const {borrowList, contractList} = this.state;
    return (
      <div className="borrowDetail">
         {/*<div className="header header-blue">
            <a className="back_arr" href="javascript:void(0);"></a>
            <h1>借款详情</h1>
        </div>*/}
        <div className="mailbox-wrap">
            <div className="sub-title">
              借款信息
            </div>
            <ul className="input-list confirmed-bankCard">
                <li>
                  <div className="label">借款金额</div>
                  <div className="input-c">
                    <span>{borrowList.orderAmount}元</span>
                  </div>
                </li>
                <li>
                  <div className="label">实际到账</div>
                  <div className="input-c">
                    <span>{borrowList.paymentAmount}元</span>
                  </div>
                </li>
                <li>
                  <div className="label">利息</div>
                  <div className="input-c">
                    <span>{borrowList.interestAmount}</span>
                  </div>
                </li>
                <li>
                  <div className="label">借款期数</div>
                  <div className="input-c">
                    <span>{borrowList.periods}</span>
                  </div>
                </li>
                <li>
                  <div className="label">申请日期</div>
                  <div className="input-c">
                   <span>{DateF(borrowList.createdTime, 'date')}</span>
                  </div>
                </li>
                 <li>
                  <div className="label">借款用途</div>
                  <div className="input-c">
                   <span>{borrowList.loanUsage}</span>
                  </div>
                </li>
                <li>
                  <div className="label">收款银行</div>
                  <div className="input-c">
                    <span>{borrowList.bankName}</span>
                  </div>
                </li>
                <li>
                  <div className="label">借款合同</div>
                  <div className="input-c">
                  {
                    contractList.map((item,index) =>{
                      return <a key={index} href={/*'http://'+*/ item.contractUrl}>《{item.contractName}》</a>
                    })
                  }
                    
                  </div>
                </li>
              </ul>
        </div>
      </div>
    );
  }
}

