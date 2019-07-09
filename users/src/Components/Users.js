import React from "react";

class Users extends React.Component {
  removeUser = e => {
    return fetch("http://localhost:3005/api/users/" + e.target.getAttribute("id"), {
      method: 'delete'
    })
    .then(response => response.json());
  };

  render() {
    return (
      <div>
        <center>
          <h1>Contact List</h1>
        </center>
        {this.props.users.map(user => (
          <div className="card" key={user.id}>
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{user.bio}</h6>
              <button
                type="button"
                className="btn btn-dark"
                id={user.id}
                onClick={this.removeUser}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Users;
