import { gql, useApolloClient, useQuery, useReactiveVar } from '@apollo/client';
import Twitts from '../Twitts';
import './App.css';
import Login from '../Login';
import { isLoggedInVar } from '../../apollo';

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
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { loading, data: { twitts = [] } = {}, error } = useQuery(FETCH_TWITTS);
  const client = useApolloClient();

  const logout = () => {
    localStorage.removeItem('token');
    isLoggedInVar(false);
    client.resetStore();
  };

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
        {isLoggedIn ? (
          <div>
            <button onClick={() => logout()}>LOGOUT</button>
          </div>
        ) : (
          <Login />
        )}
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
