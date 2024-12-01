import { useGetUsers } from "./http/generated/users/users";
import { CreateUser } from "./createUser";


export function App() {
  // use the method at the api.ts to get the users using react-query
  const { data: users } = useGetUsers()

  return (
    <div>
      <ul>
        {users?.data.map(user => {
          return <li key={user.id}>{user.name}</li>
        })}
      </ul>
      <CreateUser />
    </div>
  )
}
