export const Rank = ({ user }) => {
  return (
    <div>
      <div className="white f3">{user.name}, you've found a total of</div>
      <div className="white f1">{user.entries} faces.</div>
    </div>
  );
};
