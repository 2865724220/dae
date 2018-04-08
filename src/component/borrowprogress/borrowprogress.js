import React, { Component } from 'react';
import {$http, Qs, DateF, toFix} from '../../tools';
import Toast from '../../common/toast';

const params = Qs();

 export default class borrowProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progressList:[],
      loanOrder:{}
    }
  }
  componentDidMount() {
    $http.post('/cashman-web/service/repayment/traces', {
            "loanId": params.loanId
        }).then(res=>{
         if(res.data && res.code== "00"){
          this.setState({
            progressList: res.data.traceList || [],
            loanOrder: res.data.loanOrderInfoRespDto || {}
          }, ()=>{
          });
         }else{
           Toast.show(res.message);
         }
      }, err => {
          Toast.show("error");
      });

  }

  render() {
    document.title = '借款进度';
    const {progressList,loanOrder} = this.state;
    return (
      <div className="borrowDetailWrao bgfff">
        {/* <div className="header header-blue">
            <a className="back_arr" href="javascript:void(0);"></a>
            <h1>借款进度</h1>
            <em><a rel="external" href="javascript:;">借款详情</a></em>
        </div>*/}
        <div className="wrapper borrow-detail blue">
            <div className="title">申请进度</div>
            <ul className="progress-block">
            {
              progressList.map((item,index) =>{
                return  <li className={index == 0 ? "active":""} key={index}>
                            <div className="progress-icon"></div>
                            <div className="progress-info">
                                 <div className="progress-text">
                                    <span className="p-title">{item.eventText}</span>
                                    <span className="p-time">{DateF(item.createdTime)}</span>
                                </div>
                                {
                                  item.orderEvent=="LOAN_APPLY" ? 
                                   <div className="subtext">
                                    申请借款{loanOrder.orderAmount}元，期限{loanOrder.periods}期，利息{loanOrder.interestAmount}元
                                  </div>
                                :''
                                }
                                {
                                  item.orderEvent=="LOAN_CONFIRM" ? 
                                   <div className="subtext">
                                     已进入风控审核状态，请耐心等待
                                  </div>
                                :''
                                }
                                 {
                                  item.orderEvent=="PAYMENTING" ? 
                                   <div className="subtext">
                                     已进入风控审核状态，请耐心等待
                                  </div>
                                :''
                                }
                                 {
                                  item.orderEvent=="RISK_DATA_FAIL" ? 
                                   <div className="subtext">
                                     抱歉，您本次申请未通过
                                  </div>
                                :''
                                }
                                 {
                                  item.orderEvent=="PAYMENT_FAIL" ? 
                                   <div className="subtext">
                                     请检查您的银行卡信息填写是否正确
                                 </div>
                                :''
                                }
                                 {
                                  item.orderEvent=="PAYMENT_SUCCESS" ? 
                                   <div className="subtext">
                                      恭喜放款成功！请在您尾号（{loanOrder.lastFourBankCardNo}）的银行卡中查看到账情况
                                  </div>
                                :''
                                }
                            </div>
                        </li>
                  })
              }
            
          </ul>
            <a  href="https://www.wenjuan.in/s/rQvUn2/" className="investigate-link">去填问卷，会有福利哦 <img src={require('../../images/new/jt_right.png')} /></a>
          </div>
      </div>
    );
  }
}

