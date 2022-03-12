import { Link } from "react-router-dom";

const RouteTest = () => {
  return (
    <div>
      {/* a href 대신 Link to를 쓴다. */}
      <Link to={"/"}>HOME</Link>
      <br />
      <Link to={"/diary"}>DIARY</Link>
      <br />
      <Link to={"/new"}>NEW</Link>
      <br />
      <Link to={"/edit"}>EDIT</Link>
    </div>
  );
};

export default RouteTest;
