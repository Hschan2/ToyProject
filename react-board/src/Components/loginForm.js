import {Component} from 'react';
import inputField from './inputField';
import submitButton from './submitButton';
import userStore from './userStore';

class loginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonDisabled: false
    }
  }

  setInputValue(property, val) {
    val = val.trim();
    if(val.length > 12) return;

    this.setState({
      [property]: val
    })
  }

  resetForm() {
    this.setState({
      username: '',
      password: '',
      buttonDisabled: false
    })
  }

  async doLogin() {
    if(!this.state.username) return;
    if(!this.state.password) return;

    this.setState({
      buttonDisabled: true
    })

    try {
      let res = await fetch('/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });
      let result = await res.json();

      if(result && result.success) {
        userStore.isLoggedIn = true;
        userStore.username = result.username;
      } else if(result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    } catch(e) {
      console.log(e)
      this.resetForm();
    }
  }

  render() {
    return (
      <div className="loginForm">
        <inputField
          type="text"
          placeholder="userName"
          value={this.state.username ? this.state.username : ''}
          onChange={(val) => this.setInputValue('username', val)}
        />
        <inputField
          type="password"
          placeholder="Password"
          value={this.state.password ? this.state.password : ''}
          onChange={(val) => this.setInputValue('password', val)}
        />
        <submitButton
          text="Login"
          disabled={this.state.buttonDisabled}
          onClick={() => this.doLogin()}
        />
      </div>
    );
  }
}

export default loginForm;
