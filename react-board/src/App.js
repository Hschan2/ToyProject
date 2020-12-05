import './App.css';
import {Component} from 'react';
import {observer} from 'mobx-react';
import userStore from './Components/userStore';
import loginForm from './Components/loginForm';
import submitButton from './Components/submitButton';

class App extends Component {
  async componentDidMount() {
    try {
      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      let result = await res.json();

      if(result && result.success) { // 로그인 상태 O
        userStore.loading = false;
        userStore.isLoggedIn = true;
        userStore.username = result.username;
      } else { // 로그인 상태 X
        userStore.loading = false;
        userStore.isLoggedIn = false;
      }

    } catch(e) { // 에러 발생 시 로그인 상태 X
      userStore.loading = false;
      userStore.isLoggedIn = false;
    }
  }

  async doLogout() {
    try {
      let res = await fetch('/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });

      let result = await res.json();

      if(result && result.success) { // 로그인 상태 O일 시 상태를 X로 변경
        userStore.isLoggedIn = false;
        userStore.username = '';
      }

    } catch(e) {
      console.log(e);
    }
  }

  render() {

    if(userStore.loading) {
      return (
        <div className="app">
          <div className="container">
            Loading...
          </div>
        </div>
      )
    } else {
      if(userStore.isLoggedIn) {
        return (
          <div className="app">
            <div className="container">
              Welcome, {userStore.username}
              <submitButton
                text={'Logout'}
                disabled={false}
                onClick={() => this.doLogout()}
              />
            </div>
          </div>
        );
      }

      return (
        <div className="app">
          <div className="container">
            <loginForm />
          </div>
        </div>
      );
    }
  }
}

// observer = 데이터가 변경될 때마다 View 업데이트
export default observer(App);
