const UserCard = ({user}) => {
    const {firstName, lastName, photoUrl, age, gender, about} = user;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={user.photoUrl}
          alt="photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="name">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age+", "+gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
            <button className="btn btn-secondary">👍</button>
            <button className="btn btn-primary">👎🏻</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
