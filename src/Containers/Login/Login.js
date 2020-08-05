import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { firebaseApp } from "./../../Config/firebase";
import Swal from "sweetalert2";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.history.push("/home");
      } else {
        this.props.history.push("/");
      }
    });
  }

  handelChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandle = async () => {
    let { email, password } = this.state;
    await firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        Swal.fire("Login Successful!", "success");
        this.props.history.push("/home");
      })
      .catch((error) => {
        // var errorCode = error.code;
        var errorMessage = error.message;
          Swal.fire({
            icon: 'error',
            text: error.message,
          })
        console.log(errorMessage);
      });
  };

  render() {
    console.log(this.state);
    return (
      <div className="login">
        <div className="spacer" />
        <Container maxWidth="sm">
          <Paper elevation={3} className="paper">
            <div className="form-title">
              <span>LOG IN</span>
            </div>
            <br />
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={this.handelChange}
            />
            <br />
            <br />
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handelChange}
            />
            <br />
            <br />
            <div style={{ textAlign: "right" }}>
              <span>
                Don't have Account? <Link to="/register">Signup</Link>
              </span>
            </div>
            <br />

            <Button
              type="button"
              variant="contained"
              color="primary"
              style={{ width: "40%", height: "40px" }}
              onClick={this.submitHandle}
            >
              Log In
            </Button>
          </Paper>
        </Container>
      </div>
    );
  }
}

export default Login;
