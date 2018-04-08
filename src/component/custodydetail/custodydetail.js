import React, { Component } from 'react';
import {$http, Qs, DateF} from '../../tools';
import Toast from '../../common/toast';

const params = Qs();

 export default class custodyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankCard:{},
    }
  }
  componentDidMount() {
  }


  render() {
    document.title = '存管详情';
    const {bankCard} = this.state;
    return (
      <div className="custodyDetail">
        <p>存管也叫做第三方资金存管。是国家为了确保借贷双方资金安全，由第三方合法机构管理借贷资金流转的模式。</p>
        <p>本平台为了确保借贷双方资金安全，委托第三方金融机构——江西银行管理借贷资金。借款人需要在江西银行免费办理一个电子账户（无年费），用户的借款资金将打款至江西银行电子账户并立即转账至用户绑定的收款银行卡中，完成放款。用户在还款时也是通过打款至江西银行电子账户完成。</p>
        <p>本平台提供极速放款和还款服务，确保资金安全，流程极简！</p>
      </div>
    );
  }
}

