import { observable, action, runInAction, useStrict, computed, extendObservable } from 'mobx';
import { $http, Qs } from '../../tools';
import Toast from '../../common/toast';
const _DEV_ = process.env.NODE_ENV === 'development' ? true : false;
const repaymentUrl = _DEV_ ? 'http://120.55.44.90:10002' : 'http://payment.xianjinxia.com';


useStrict(true);

const params = Qs();

class Repayment {
    @observable selectIndex = {0:false, 1:false, 2:false, 3:false, 4: false, 5:false};
    @observable list = [];
    @observable repaymentOrderIds = [];
    @observable loadShow = true;
    @observable isPaying = false;
    @observable allPay = false;


    @computed get maxNoPayIndex () {
        return this.list.filter(item => item.status == 30).length;
    }

    @computed get maxSelectIndex () {
        let index = -1;
        for(let i in this.selectIndex){
            if(this.selectIndex[i]){
                index = i;
            }
        }
        return index;
    }
    @computed get getRepaymentOrderId () {
        return this.list.filter((item,index) =>this.selectIndex[index]).map(item =>item.id);
    }

    @computed get payMoney () {
        let total = 0;
        this.list.forEach((item, index) =>{
            /*还款金额*/
            if(this.selectIndex[index] && item.status=='10' && !this.isPaying){
                total += item.repaymentTotalAmount*1;
                this.repaymentOrderIds = this.list.filter(index => this.selectIndex[index] ? item.id:'');
               /* console.log(this.list.filter(index => this.selectIndex[index]))*/
            }
        });
        return total;
    }

    @action.bound
    selectItem (index) {
       /* console.log(this.maxNoPayIndex)*/
        if(!this.selectIndex[index]){
            for(let i = 0; i <= index; i ++){
                this.selectIndex[i] = true;
            }
        }else{
            for(let i = this.maxSelectIndex; i >= index; i --){
                this.selectIndex[i] = false;
            }
        }
    }

    @action
    getList = () => {
        $http.post('/cashman-web/service/repayment/repayment-orders', {
            "userId": params.userId,
            "loanId": params.loanId
        }).then(res => {
            if(res.code == "00"){
                runInAction(() => {
                    this.list = res.data.filter(v => v.status == 10).concat(res.data.filter( v => v.status != 10));
                    this.loadShow = false;
                    this.isPaying = this.list.some(v => v.repaymentWaitingAmount > 0);
                    this.allPay = this.list.length >0 ? this.list.every(v => v.status == 30):false;
                });
            }else {
                runInAction(() => {
                    this.loadShow = false;
                });
                Toast.show(res.message);
            }
        }, err => {
             runInAction(() => {
                this.loadShow = false;
            });
        });
    }

    @action
    immediatePay = () => {
        $http.post('/cashman-web/service/repayment/repay-commit',{
            "userId": params.userId,
            "amount": this.payMoney,
            "repaymentOrderIds": this.getRepaymentOrderId,
        }).then(res => {
            if(res.code == "00"){
                let data = res.data;
                let exextData = JSON.parse(res.data.exextData);
                runInAction(() => {
                    window.location.href =`${repaymentUrl}/?bizId=${data.bizId}&couponId=&userId=${params.userId}&repayMoney=${data.withholdingAmount}&couponMoney=&createTime=${exextData.createdAt}&expireDate=${data.expireDate}&deviceId=${params.deviceId}&bizType=${data.bizType}&requestSource=${data.requestSource}&sessionId=${params.sessionId}&mobile=${params.mobilePhone}&sign=${data.sign}#/app`;
                });
            }else{
                Toast.show(res.message);
            }
 
        },err => {

        })
    }
}

export default new Repayment();