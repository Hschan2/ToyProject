import {extendObservable} from 'mobx';

class userStore {
    constructor() {
        // extendObservable = Object.assign처럼 property와 같을 Target 오브젝트에 합쳐준다
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            username: ''
        })
    }
}

export default new userStore();