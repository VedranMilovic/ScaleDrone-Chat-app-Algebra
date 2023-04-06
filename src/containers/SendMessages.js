import React from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

class SendMessages extends React.Component {
  state = {
    text: "",
    error: "",
  };

  onMessageSubmit = (event) => {
    this.setState({ text: event.target.value });
  };

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.text !== "") {
      this.setState({ text: "" });
      this.props.onSendMessage(this.state.text);
      this.setState({ error: "" });
    } else {
      this.setState({
        error: "Please type your message",
      });
    }
  }

  render() {
    return (
      <div>
        <form
          onSubmit={(e) => this.handleSubmit(e)}
          className="message-send-container"
        >
          <input
            type="text"
            autoFocus
            placeholder="Enter your message"
            onChange={(e) => this.onMessageSubmit(e)}
            value={this.state.text}
            className="message-send-input"
          />
          <Alert className="user-error-message" variant="secondary">
            {this.state.error}
          </Alert>
          <Button
            type="submit"
            variant="outline-dark"
            style={{ padding: "20px 20px" }}
          >
            Send
          </Button>
        </form>
      </div>
    );
  }
}

export default SendMessages;
