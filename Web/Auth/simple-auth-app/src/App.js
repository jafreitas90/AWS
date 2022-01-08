import logo from './logo.svg';
import './App.css';
import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
  Auth: {
      region: 'us-east-1', 
      userPoolId: 'us-east-1_VmzbVEYr1', 
      userPoolWebClientId: '21gb3ldl36kimajhs9m9ar3prn'
  }
});

async function signUp(event) {
  try {
    event.preventDefault();
    const userName = event.currentTarget.elements.usernameInput.value;
    const password = event.currentTarget.elements.passwordInput.value
    const email = event.currentTarget.elements.emailInput.value

    console.log(userName);
    console.log(password);
    console.log(email);
      const { user } = await Auth.signUp({
          username: userName,
          password: password,
          attributes: {
              email:email,
          }
      });
      // eslint-disable-next-line no-restricted-globals
      alert(user);
      console.log(user);
  } catch (error) {
      console.log('error signing up:', error);
  }
}

async function confirmSignUp(event) {
    try {
      event.preventDefault();
      const username = event.currentTarget.elements.usernameInput.value;
      const code = event.currentTarget.elements.codeInput.value

      await Auth.confirmSignUp(username, code);
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}

async function signIn(event) {
  try {
    event.preventDefault();
    const username = event.currentTarget.elements.usernameInput.value;
    const password = event.currentTarget.elements.passwordInput.value
      const user = await Auth.signIn(username, password);
      console.log('user: ', user);
  } catch (error) {
      console.log('error signing in', error);
  }
}

async function resendConfirmationCode(event) {
  try {
    event.preventDefault();
    const username = event.currentTarget.elements.usernameInput.value;
      await Auth.resendSignUp(username);
      console.log('code resent successfully');
  } catch (err) {
      console.log('error resending code: ', err);
  }
}

async function forgotPassword(event) {
  try {
    event.preventDefault();
    const username = event.currentTarget.elements.usernameInput.value;
      await Auth.forgotPassword(username);
      console.log('password sent for your email');
  } catch (err) {
      console.log('error resending code: ', err);
  }
}

async function confirmationPasswordCode(event) {
  try {
    event.preventDefault();
    const username = event.currentTarget.elements.usernameInput.value;
    const code = event.currentTarget.elements.codeInput.value;
    const newPassword = event.currentTarget.elements.newPasswordInput.value;
      const result = await Auth.forgotPasswordSubmit(username, code, newPassword);
      console.log(result);
  } catch (err) {
      console.log('error confirming password reset: ', err);
  }
}

async function signOut() {
  try {
      var result = await Auth.signOut();
      console.log(result);
  } catch (error) {
      console.log('error signing out: ', error);
  }
}

async function currentAuthenticatedUser() {
  try {
    var result = await Auth.currentAuthenticatedUser();
      console.log(result);
  } catch (error) {
      console.log('error signing out: ', error);
  }
}

function App() {
  return (
    <div className="App">
      <h2>Sign up</h2>
    <form onSubmit={signUp}>
      <div>
        <label htmlFor="emailInput">Email:</label>
        <input id="emailInput" type="text" />
      </div>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" />
      </div>
      <div>
        <label htmlFor="passwordInput">Password:</label>
        <input id="passwordInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
    ______________________________________________

    ______________________________________________
    <h2>Confirm sign up</h2>
    <form onSubmit={confirmSignUp}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" />
      </div>
      <div>
        <label htmlFor="codeInput">Code:</label>
        <input id="codeInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
    ______________________________________________

    ______________________________________________
    <h2>Resend sign up code</h2>
    <form onSubmit={resendConfirmationCode}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
    ______________________________________________

    ______________________________________________
    <h2>Sign in</h2>
    <form onSubmit={signIn}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" />
      </div>
      <div>
        <label htmlFor="passwordInput">Password:</label>
        <input id="passwordInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
    ______________________________________________

    ______________________________________________
    <h2>Forgot Password</h2>
    <form onSubmit={forgotPassword}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
    ______________________________________________


    ______________________________________________
    <h2>New Password</h2>
    <form onSubmit={confirmationPasswordCode}>
      <div>
        <label htmlFor="usernameInput">Username:</label>
        <input id="usernameInput" type="text" />
      </div>
      <div>
        <label htmlFor="codeInput">Code:</label>
        <input id="codeInput" type="text" />
      </div>
      <div>
        <label htmlFor="newPasswordInput">New Password:</label>
        <input id="newPasswordInput" type="text" />
      </div>
      <button type="submit">Submit</button>
    </form>
    ______________________________________________
    <div>
      <button type="button" onClick={async () => {await signOut();}} >Sign out</button>
    </div>

    ______________________________________________
    <div>
      <button type="button" onClick={async () => {await currentAuthenticatedUser();}} >currentAuthenticatedUser</button>
    </div>
    </div>
  );
}

export default App;
