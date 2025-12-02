const Form = ({ message, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="form">
      <h2>What's making you happy right now?</h2>
      <textarea
        value={message}
        onChange={onChange}
        placeholder="My happy thought is..."
        maxLength="150"
        rows="3"
      />

      <p className="text-counter">{150 - message.length} / 150</p>

      <button
        type="submit"
        disabled={message.length < 5}
        className="submit-button"
      >
        Send Happy thought ❤️
      </button>
    </form>
  );
};
export default Form;
