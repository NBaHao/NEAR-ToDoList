import 'regenerator-runtime/runtime';
import React from 'react';
import CreateTodo from './components/CreateTodo';
import TodoList from './components/TodoList';
import { SignInPrompt, SignOutButton } from './ui-components';

export default function App({ isSignedIn, contract, wallet }) {
  if (!isSignedIn) {
    return <SignInPrompt onClick={() => wallet.signIn()}/>;
  }
  return (
    <>
      <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()}/>
      <CreateTodo contract={contract}/>
      <TodoList contract={contract} />
    </>
  )

}
