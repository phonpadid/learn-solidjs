import type { Component, JSX } from 'solid-js';
import { createSignal } from 'solid-js';
import { nanoid } from 'nanoid';
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

const App = () => {
  const [id, setId] = createSignal<string>("");
  const [name, setName] = createSignal<string>("");
  const [email, setEmail] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");
  const [users, setUsers] = createSignal<User[]>([]);
  const [buttonName, setButtonName] = createSignal<string | JSX.Element | null>("");
  setButtonName("AddUser")
  // Delete User
  const deleteUser = (id: number | string) => {
    const newUser = users().filter((user) => user.id !== id)
    setUsers(newUser)
  }


  // Update User 
  const editUser = (id: number | string) => {
    const user = users().find((user) => user.id === id);
    if (user) {
      setId(user.id);
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setButtonName("Update");
    }
  };

  const submitUser = (id: number | string) => {
    if (id !== "") {
      setUsers(users().filter((user) => user.id !== id()));
      setUsers([...users(), { id: nanoid(8), name: name(), email: email(), password: password() }]);
    } else {
      setUsers([...users(), {id:nanoid(8) , name: name(), email: email(), password: password() }]);
    }
    setId("");
    setName("");
    setEmail("");
    setPassword("");
    setButtonName("Add User");
  };

  return (
    <>
      {/* Form */}
      <div class=' flex justify-center py-4'>
        <div class="w-full max-w-xs">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Username
              </label>
              <input value={name()} oninput={(e) => setName(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
              </label>
              <input value={email()} oninput={(e) => setEmail(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="youremail@gmail.com" />
              
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Password
              </label>
              <input value={password()} oninput={(e) => setPassword(e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
              
            </div>
            <div class="flex items-center justify-between">
              <button onclick={() => (buttonName() == "Add User" ? submitUser() : submitUser(id))} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                {buttonName()}
              </button>
            </div>
          </form>
        </div>
      </div>


      {/* Table */}
      <div class="relative rounded-xl overflow-auto">
        <div class="shadow-sm overflow-hidden my-8">
          <table class="border-collapse table-auto w-full text-sm">
            <thead>
              <tr>
                <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">ID</th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Name</th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Email</th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Password</th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Edit</th>
                <th class="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">Delete</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-slate-800">
              {
                users().map((user) => (
                  <tr key={user.id}>
                    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{user.id}</td>
                    <td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">{user.name}</td>
                    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">{user.email}</td>
                    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">{user.password}</td>
                    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                      <button class=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onclick={() => editUser(user.id)}>Edit</button>
                    </td>
                    <td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                      <button class=' bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onclick={() => deleteUser(user.id)}>Delete</button>
                    </td>
                  </tr>
                )
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
{/* <tr>
<td class="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
<td class="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">Malcolm Lockyer</td>
<td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">1961</td>
<td class="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">1234568</td>
</tr> */}
export default App;
