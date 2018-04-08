import { observable, action, runInAction, useStrict, computed, extendObservable } from 'mobx';
import Toast from '../../common/toast'
import { $http, Qs } from '../../tools';

useStrict(true);

const params = Qs();
let bankNoTimer = null,
    interval = null,
    flag = false;

class BindCredit {
    @observable timer = 60;

    @observable bankNo = '';
    @observable bankName = '自动识别卡类型';
    @observable bankCode = '';
    @observable cardType = false;

    @observable period = '';
    @observable tradeNo = '';

    @observable mobile = '';
    @observable smsCode = '';
    @observable codeText = '获取验证码';

    @observable show = false;
    @observable tipStr = '有效期打印在信用卡正面卡号下方，月份在前，年份在后。';
    @observable userName='';
    @observable isBinded = '';
    @observable confirmBind = false;

    @observable open = false;
    @observable time = new Date();

  
    @action.bound 
    isBind (){
        if(params.cardNo && params.cardNo != null){
            this.isBinded = false;
           /* alert(params.bankName.replace(/%25/g, '%'));*/
            this.userName = decodeURIComponent(params.openName.replace(/%25/g, '%'));
            this.bankNo = decodeURIComponent(params.cardNo);
            this.bankName = decodeURIComponent(params.bankName.replace(/%25/g, '%'));
            this.period = decodeURIComponent(params.validPeriod.replace(/%25/g, '%'));
            this.mobile = decodeURIComponent(params.openPhone);
        }else{
            this.isBinded = true;
        }
    }

    @computed get canApply () {
        return /^([1-9])([0-9]{15,18})$/.test(this.bankNo)
            && /^1[3-9]\d{9}$/.test(this.mobile)
            && this.smsCode && this.smsCode.length == 6;
    }

    @action.bound
    handleChange(key, val) {
        this[key] = val ? val : '';
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
                        this.userName = res.data.realname;
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

    @action
    update = () => {
        if(this.timer >1) {
            this.codeText = --this.timer + "s";
        }else{
            flag = false;
            this.timer = 60;
            this.codeText = '获取验证码';
            clearInterval(interval);
        }
    }

    @action.bound
    sendSmsCode () { //  发送短信验证
        if(!(/^([1-9])([0-9]{14,18})$/.test(this.bankNo))){
            Toast.show("请正确输入银行卡号！");
            return;
        }
        if(!(/^1[3-9]\d{9}$/.test(this.mobile))){
            Toast.show("请正确输入手机号！");
            return;
        }
        if(!this.cardType){
            Toast.show("当前只可使用信用卡进行后续操作！");
            return;
        }
        if(flag){
            return;
        }
        flag = true;
        /*console.log(1)*/
        $http.post('/api/fastpayment/verifyCreditBankCard', {
            "bankCardNo": this.bankNo,
            "bankPhoneNo": this.mobile,
            /*"orderId": "",*/
            "requestSource": "A3",
            "userId": params.userId,
            "validPeriod": this.period,
            "mobile": params.mobilePhone,
            "deviceId": params.deviceId
        }).then(res =>{
            runInAction(() => {
                if(res.responseCode == "1000"){
                    this.codeText = this.timer + "s";
                    interval = setInterval(this.update, 1000);
                    this.tradeNo = res.data.trans_id;

                }else{
                    Toast.show(res.responseMsg || '验证银行卡信息失败');
                    this.tradeNo = res.data.trans_id;
                    this.codeText = this.timer + "s";
                    interval = setInterval(this.update, 1000);
                }
            });
        }, err => {
            flag = false;
            Toast.show(err.msg || '发送验证码失败');
        });
    }

    @action.bound
    showTips (tag) {
        this.tipStr = tag ? '手机号是办理该银行卡时所填写的手机号码。手机号异常请联系银行客服更新处理。' : '有效期打印在信用卡正面卡号下方，月份在前，年份在后。';
        this.show = !this.show;
    }

    @action
    confirmBindCard = () => {
        if(this.confirmBind){
            return
        }
        this.confirmBind = true;
        $http.post('/api/fastpayment/confirmCreditBankCard', {
            "requestSource": "A3",
            "smsCode": this.smsCode,
            "tradeNo": this.tradeNo,
            "userId": params.userId,
            "mobile": params.mobilePhone,
            "deviceId": params.deviceId
        }).then(res => {
            if(res.responseCode == "1000"){
                if(isiOS){

                    // bindSuccess();
                    closeThisPage("绑卡成功");
                }else{
                    nativeMethod.authenticationResult("绑卡成功");
                    // nativeMethod.bindSuccess();
                }
                // Toast.show("绑卡成功！");

            }else{
                    Toast.show(res.responseMsg || 'error'); 
                    runInAction(() =>{
                        this.confirmBind = false;
                    })
            }
        }, err => {
                this.confirmBind = false;
                Toast.show(err.msg || '绑卡失败');
        });
    }

    @action selectDate = (time) => {
       /* console.log(time)*/
        if(time){
            const d = new Date(time);
            const YY = (d.getFullYear() + '').substring(2);
            const m = d.getMonth() + 1;
            const M = (m > 9 ? m : '0' + m) + '';
            this.period = M + '/' + YY;
        }else{
            this.period = '';
        }
        this.open = false;
    }

    @action openDatePicker = () => {
        this.open = !this.open;
    }
}

export default new BindCredit();