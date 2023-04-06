import RenderMessages from "./RenderMessages";

function Messages(props) {
  const { poruke, currentUser } = props;

  return (
    <ul className="messages-unordered-list">
      {poruke.map((m) => (
        <RenderMessages key={m.id} message={m} user={currentUser} />
      ))}
    </ul>
  );
}

export default Messages;
