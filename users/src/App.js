import React from "react";
import "./App.css";
import Users from "./Components/Users";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3005/api/users/")
      .then(res => res.json())
      .then(data => {
        this.setState({ users: data });
      })
      .catch(console.log);
  }

  render() {
    return (
      <div>
        <Users users={this.state.users} />
      </div>
    );
  }
}

export default App;
