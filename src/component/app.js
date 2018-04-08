import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BindCredit from './bindcredit/bindcredit';
import BankCard from './bankcard/bankcard';
import BorrowDetail from './borrowdetail/borrowdetail';
import BorrowProgress from './borrowprogress/borrowprogress';
import Repayment from './repayment/repayment';
import LoanProtocol from './loanprotocol/loanprotocol';
import PlatformService from './platformservice/platformservice';
import CustodyBank from './custodybank/custodybank';
import CustodySupport from './custodysupport/custodysupport';
import CustodyDetail from './custodydetail/custodydetail';
import Paying from './paying/paying';
import PayWay from './payway/payway';
/*import Demo from './demo/demo';*/

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route exact path="/" component={Repayment} />
                <Route path="/progress" component={BorrowProgress} />
                <Route path="/borrowdetail" component={BorrowDetail} />
                <Route path="/bankcard" component={BankCard} />
                <Route path="/bindcredit" component={BindCredit} />
                <Route path="/loanprotocol" component={LoanProtocol} />
                <Route path="/platformservice" component={PlatformService} />
                <Route path="/custodybank" component={CustodyBank} />
                <Route path="/custodysupport" component={CustodySupport} />
                <Route path="/custodydetail" component={CustodyDetail} />
                <Route path="/paying" component={Paying} />
                <Route path="/payway" component={PayWay} />
                {/*<Route path="/demo" component={Demo} />*/}
            </div>
        );
    }
}

export default App;
