import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  onSubmit,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange
}) => (
  <form onSubmit={onSubmit}>
    <div>
      username
      <input
        type="text"
        value={username}
        placeholder='username'
        onChange={handleUsernameChange} />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        placeholder='password'
        onChange={handlePasswordChange}
      />
    </div>
    <button id="form-login-button" type="submit">login</button>
  </form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
};

export default LoginForm;