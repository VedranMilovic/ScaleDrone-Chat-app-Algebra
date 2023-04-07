import React from "react";
import UserLogin from "./UserLogin";
import Messages from "./Messages";
import SendMessages from "./SendMessages";
import Header from "../services/Header";

let headerUserName = "";

function getAvatar() {
  const number = Math.floor(Math.random() * 55 + 1);
  const background = "/cards/" + number + ".png";

  return "url(" + background + ")";
}

class Chat extends React.Component {
  state = {
    poruke: [],
    user: {
      ime: "",
      avatar: "",
    },
  };

  handleOnUserLogin = (loginUser) => {
    if (loginUser !== "") {
      this.drone = new window.Scaledrone("4SO4m5UD7o9GeTif", {
        data: { ime: loginUser, avatar: getAvatar() },
      });

      headerUserName = loginUser;

      this.drone.on("open", (error) => {
        if (error) {
          return console.error(error);
        }
        const user = { ...this.state.user };
        user.id = this.drone.clientId;
        this.setState({ ...this.state, user });
      });
      const room = this.drone.subscribe("observable-soba");

      room.on("member_join", (member) => {
        this.setState({
          ...this.state,
          poruke: [
            ...this.state.poruke,
            {
              id: member.id,
              timestamp: Date.now(),
              text: `User ${member.clientData.ime} has joined the room at `,
              clientId: member.clientData,
              member,
              serviceMember: "MEMBER_JOINED",
            },
          ],
        });
      });

      room.on("member_leave", (member) => {
        this.setState({
          ...this.state,
          poruke: [
            ...this.state.poruke,
            {
              id: member.id,
              timestamp: Date.now(),
              text: `User ${member.clientData.ime} has left the room at `,
              clientId: member.clientData,
              member,
              serviceMember: "MEMBER_LEFT",
            },
          ],
        });
      });

      room.on("message", ({ data, id, timestamp, clientId, member }) => {
        this.setState({
          ...this.state,
          poruke: [
            ...this.state.poruke,
            {
              id,
              timestamp,
              text: data,
              clientId,
              member,
              serviceMember: "MESSAGE",
            },
          ],
        });
      });
    } else {
      return;
    }
  };

  handleUserLogout = () => {
    this.setState({ poruke: [], user: {} });
    this.drone.close();
  };

  render() {
    return (
      <div className="chat-main">
        <Header
          userName={headerUserName}
          user={this.state.user}
          onLogout={this.handleUserLogout}
        />

        {this.state.user.id ? (
          <div className="messages-container">
            <div className="messages-main">
              <Messages
                poruke={this.state.poruke}
                currentUser={this.state.user}
              />
            </div>
            <SendMessages onSendMessage={this.onSendMessage} />
          </div>
        ) : (
          <div>
            <div>
              <div></div>
            </div>
            <UserLogin onUserLogin={this.handleOnUserLogin} />
          </div>
        )}
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-soba",
      message,
    });
  };
}

export default Chat;
