
import React from 'react';
import { Component } from 'react';

class UserProfile extends Component {
  render() {
    return (
      <div>
        {/* Display User Information */}
        <h2>User Profile</h2>
        <p>Name: {this.props.user.name}</p>
        <p>Email: {this.props.user.email}</p>

        {/* Display User Skills */}
        <h3>Skills</h3>
        <ul>
          {this.props.user.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserProfile;
