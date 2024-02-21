import type { Component } from 'solid-js';
import { createSignal, createEffect } from 'solid-js'; 


const App: Component = () => {
  const [id , setId] = createSignal<Number>();
  const [name , setName] = createSignal<string>("");
  const [email, setEmail] = createSignal<string>("");
  const [password, setPassword] = createSignal<string>("");
  const [users , setUsers] = createSignal<object>([]);
  const [buttonName, setButtonName] = createSignal<object>([]);

  const submitUser = (id: Number) =>{
    const user = {
      id,
      name: name(),
      email:email(),
      password:password(),
    }
  }
  return (
    <div>
      <h1 class=' bg-red-600 flex justify-center'>Hello World</h1>
    </div>
  );
};

export default App;
