import './App.css';
import {Component} from 'react';
import {observer} from 'mobx-react';

class App extends Component {
  
  render() {
      return (
        <div className="app">
          <div className="container">
            
          </div>
        </div>
      );
    }
  }
}

// observer = 데이터가 변경될 때마다 View 업데이트
export default observer(App);
