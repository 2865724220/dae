import { observable, action, autorun, runInAction, useStrict } from 'mobx';

useStrict(true);

class DemoStore {
    constructor() { }

    @observable num = 0;
    @observable str = '';
    @observable arr = [];
    @observable obj = new Map();

    @action
    add = () => {
        return ++this.num;
    }

    @action.bound
    handleChange (key, val) {
        this[key] = val;
    }

    @action
    remote = () => {
        setTimeout(() => {
            runInAction(() => this.arr = ['hello', 'react']);
        }, 1000);
    }

    @action
    addKey = () => {
        this.obj.set('key' + this.num, 'value' + this.num);
    }
}

const store = new DemoStore();

export default store;