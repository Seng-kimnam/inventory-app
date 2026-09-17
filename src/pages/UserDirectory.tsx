import useFetch from "../custom/hook";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface UsersResponse {
  users: User[];
}

const UserDirectory = () => {
  const {
    data: user,
    loading,
    error,
  } = useFetch<UsersResponse>("https://dummyjson.com/users");

  console.log(user);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <></>
    // <div>
    //   {user?.users.map((user) => (
    //     <p key={user.id}>
    //       {user.firstName} {user.lastName}
    //     </p>
    //   ))}
    // </div>
  );
};

export default UserDirectory;
