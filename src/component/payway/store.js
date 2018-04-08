import { observable, action, runInAction, useStrict, computed, extendObservable } from 'mobx';
import Toast from '../../common/toast'
import { $http, Qs } from '../../tools';

useStrict(true);

const params = Qs();


class PayWay {
    @observable bankIndex = -1;
    @observable list = [{
        "id":0,
        "con":"工商银行"
    },{
        "id":1,
        "con":"工商银行01"
    },{
        "id":2,
        "con":"工商银行02"
    }
    ];

   
    @action.bound 
    isBind (){
        
    }

    @computed get canApply () {
        
    }

    @action.bound 
    selectBank (index) {
     this.bankIndex = index;
    }


    @action
    getUserInfo () {
        if(this.isBinded){
            $http.post('/api/fastpayment/user',{
            "userId": params.userId,
            "mobile": params.mobilePhone,
            "deviceId": params.deviceId
            }).then(res =>{
                if(res.data && res.responseCode == "1000"){
                    runInAction(() => {
                        this.list = res.data.realname;
                    });
               }else{
                    Toast.show(res.responseMsg || "查询用户信息失败");
               }

            },err =>{
                Toast.show("查询用户信息失败");
            })
        }
       
    }

    @action.bound
    getBankNo (event) {
        this.bankNo = event.target.value;
        if(/^([1-9])([0-9]{14,18})$/.test(this.bankNo)){
            if(bankNoTimer) {
                clearTimeout(bankNoTimer);
            }
            bankNoTimer = setTimeout(() => {
                $http.post('/api/fastpayment/queryCardBin', {
                    "bankCardNo": this.bankNo,
                    /*"orderId": "",*/
                    "requestSource": "A3",
                    "userId": params.userId,
                    "mobile": params.mobilePhone,
                    "deviceId": params.deviceId
                }).then(res=>{
                    if(res.data && res.responseCode == "1000"){
                        runInAction(() => {
                            this.bankName = res.data.bank_description;
                            this.bankCode = res.data.bank_id;
                            if(res.data.card_type != '2'){
                                Toast.show("当前只可使用信用卡进行后续操作！");
                            }else{
                                this.cardType = true;
                            }
                        });
                    }else{
                        Toast.show(res.responseMsg || "查询卡信息失败");
                    }
                }, err => {
                    Toast.show(err.msg || "error");
                });
            }, 1000);
        }
    }

}

export default new PayWay();