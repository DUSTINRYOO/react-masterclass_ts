import { useOutletContext } from "react-router-dom";

interface FollowersContext {
  nameOfMyUser: string;
}

function Followers() {
  const { nameOfMyUser } = useOutletContext<FollowersContext>();
  return <h1> Here {nameOfMyUser} followers</h1>;
}
export default Followers;
