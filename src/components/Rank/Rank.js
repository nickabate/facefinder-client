export const Rank = ({ user }) => {
  return (
    <div>
      <div className="white f3">{user.name}, your entries are...</div>
      <div className="white f1">{user.entries}</div>
    </div>
  );
};
