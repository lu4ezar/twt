import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Twitts from '../Twitts';
import './App.css';
import Login from '../Login';
import { useGetUserFromToken } from '../../apollo/hooks/user';

const FETCH_TWITTS = gql`
  query GetTwitts {
    twitts {
      author
      content {
        operation
        number
      }
    }
  }
`;

function App() {
  // React.useEffect(() => {
  // 	window.addEventListener(())
  // })

  const user = useGetUserFromToken();
  const { loading, data: { twitts = [] } = {}, error } = useQuery(FETCH_TWITTS);

  if (loading) {
    return <div>LOADING</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }
  return (
    <div className='App'>
      <nav className='App-header'>
        <header>Twittulator</header>
        {user ? <div>{user}</div> : <Login />}
      </nav>
      <main
        style={{
          flexGrow: 1,
        }}
      >
        <Twitts twitts={twitts} />
      </main>
    </div>
  );
}

export default App;
