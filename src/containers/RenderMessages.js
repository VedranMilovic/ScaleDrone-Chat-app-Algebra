function RenderMessages({ message, user }) {
  if (message.serviceMember === "MEMBER_JOINED") {
    return (
      <div style={{ color: "yellow" }}>
        {message.text} {new Date(message.timestamp).toLocaleString()}
      </div>
    );
  } else if (message.serviceMember === "MEMBER_LEFT") {
    return (
      <div style={{ color: "yellow" }}>
        {message.text} {new Date(message.timestamp).toLocaleString()}
      </div>
    );
  } else if (
    message.member.id === user.id &&
    message.serviceMember === "MESSAGE"
  ) {
    return (
      <li className="messages-list current">
        <div>
          <h3 className="message-content">{message.text}</h3>
          <span
            style={{
              background: `${message.member.clientData.avatar} no-repeat center/contain`,
              display: "inline-block",
              width: "50px",
              height: "50px",
            }}
          ></span>
          <p className="message-username">Ja</p>
        </div>
      </li>
    );
  } else {
    return (
      <li className="messages-list">
        <div>
          <div
            style={{
              background: `${message.member.clientData.avatar} no-repeat center/contain`,
              display: "inline-block",
              width: "50px",
              height: "50px",
            }}
          ></div>
          <h3 className="message-content">{message.text}</h3>

          <p className="message-username">{message.member.clientData.ime}</p>
        </div>
      </li>
    );
  }
}

export default RenderMessages;
