import React, { Component } from 'react';
import {$http, Qs, DateF} from '../../tools';
import Toast from '../../common/toast';

const params = Qs();

 export default class custodySupport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bankCard:{},
    }
  }
  componentDidMount() {
  }


  render() {
    document.title = '支持银行卡';
    const {bankCard} = this.state;
    return (
      <div className="bankCard">
      
         <div className="mailbox-wrap">
          <p className="custody-spt-tips">以下为江西银行所支持的开户行：</p>
            <ul className="input-list support-list">
                <li>
                 工商银行
                </li>
                <li>
                 农业银行 
                </li>
                <li>
                 招商银行
                </li>
                <li>
                 建设银行
                </li>
                <li>
                 中国银行
                </li>
                <li>
                 交通银行
                </li>
                <li>
                  广发银行
                </li>
                <li>
                  民生银行
                </li>
                <li>
                  兴业银行
                </li>
                <li>
                  浦发银行
                </li>
                <li>
                  中信银行 
                </li>
                <li>
                  光大银行
                </li>
                <li>
                  邮储银行 
                </li>
                <li>
                  平安银行 
                </li>

              </ul>
        </div>
      </div>
    );
  }
}

