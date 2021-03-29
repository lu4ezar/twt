import { ApolloServer, gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';
import twitAPI from './graphql/datasources/twit';
import userAPI from './graphql/datasources/user';
import TwitModel from './mongoose/twit.model';
import UserModel from './mongoose/user.model';
import userTypeDefs from './graphql/typeDefs/user';
import twitTypeDefs from './graphql/typeDefs/twit';
import userResolvers from './graphql/resolvers/user';
import twitResolvers from './graphql/resolvers/twit';
import schema from './graphql/schema';
import dataSources from './graphql/datasources';

const createApolloServer = () => {
  // const typeDefs = gql`
  //   type User {
  //     login: String!
  //     password: String!
  //   }
  //   type Twit {
  //     operation: String!
  //     number: Float!
  //   }
  //   type Query {
  //     twits: [Twit!]!
  //   }
  // `;
  const twitts = [{ operation: 'add', number: 123 }];
  // const resolvers = {
  //   Query: {
  //     twits: () => twits,
  //   },
  // };
  return new ApolloServer({
    dataSources,
    schema,
    // typeDefs: [userTypeDefs, twitTypeDefs],
    // resolvers: [userResolvers, twitResolvers],
  });
};

describe('twits', () => {
  it('should return twitts', async () => {
    const server = createApolloServer();
    const { query } = createTestClient(server);

    const GET_TWITTS = `
			{
				twitts {
					author
					content {
						operation
						number
					}
				}
			}
		`;

    const response = await query({ query: GET_TWITTS });
    console.log('JSON.stringify(response)');
    console.log(JSON.stringify(response));
    expect(response.data?.twitts).toEqual([
      {
        content: {
          operation: 'add',
          number: 123,
        },
      },
    ]);
  });
});

// describe('Queries', () => {
//   it('fetches list of twits', async () => {
//     // create an instance of ApolloServer that mocks out context, while reusing
//     // existing dataSources, resolvers, and typeDefs.
//     // This function returns the server instance as well as our dataSource
//     // instances, so we can overwrite the underlying fetchers
//     const { server, userAPI, twitAPI } = constructTestServer({
//       context: () => ({ user: { id: 1, email: 'a@a.a' } }),
//     });

//     // mock the datasources' underlying fetch methods, whether that's a REST
//     // lookup in the RESTDataSource or the store query in the Sequelize datasource
//     twitAPI.get = jest.fn(() => [mockLaunchResponse]);
//     userAPI.store = mockStore;
//     userAPI.store.trips.findAll.mockReturnValueOnce([
//       { dataValues: { launchId: 1 } },
//     ]);

//     // use our test server as input to the createTestClient fn
//     // This will give us an interface, similar to apolloClient.query
//     // to run queries against our instance of ApolloServer
//     const { query } = createTestClient(server);
//     const res = await query({ query: GET_LAUNCHES });
//     expect(res).toMatchSnapshot();
//   });

//   it('fetches single launch', async () => {
//     const { server, launchAPI, userAPI } = constructTestServer({
//       context: () => ({ user: { id: 1, email: 'a@a.a' } }),
//     });

//     launchAPI.get = jest.fn(() => [mockLaunchResponse]);
//     userAPI.store = mockStore;
//     userAPI.store.trips.findAll.mockReturnValueOnce([
//       { dataValues: { launchId: 1 } },
//     ]);

//     const { query } = createTestClient(server);
//     const res = await query({ query: GET_LAUNCH, variables: { id: 1 } });
//     expect(res).toMatchSnapshot();
//   });
// });

// describe('Mutations', () => {
//   it('returns login token', async () => {
//     const { server, launchAPI, userAPI } = constructTestServer({
//       context: () => {},
//     });

//     userAPI.store = mockStore;
//     userAPI.store.users.findOrCreate.mockReturnValueOnce([
//       { id: 1, email: 'a@a.a' },
//     ]);

//     const { mutate } = createTestClient(server);
//     const res = await mutate({
//       mutation: LOGIN,
//       variables: { email: 'a@a.a' },
//     });
//     expect(res.data.login.token).toEqual('YUBhLmE=');
//   });

//   it('books trips', async () => {
//     const { server, launchAPI, userAPI } = constructTestServer({
//       context: () => ({ user: { id: 1, email: 'a@a.a' } }),
//     });

//     // mock the underlying fetches
//     launchAPI.get = jest.fn();

//     // look up the launches from the launch API
//     launchAPI.get
//       .mockReturnValueOnce([mockLaunchResponse])
//       .mockReturnValueOnce([{ ...mockLaunchResponse, flight_number: 2 }]);

//     // book the trip in the store
//     userAPI.store = mockStore;
//     userAPI.store.trips.findOrCreate
//       .mockReturnValueOnce([{ get: () => ({ launchId: 1 }) }])
//       .mockReturnValueOnce([{ get: () => ({ launchId: 2 }) }]);

//     // check if user is booked
//     userAPI.store.trips.findAll.mockReturnValue([{}]);

//     const { mutate } = createTestClient(server);
//     const res = await mutate({
//       mutation: BOOK_TRIPS,
//       variables: { launchIds: ['1', '2'] },
//     });
//     expect(res).toMatchSnapshot();
//   });
// });

// it('fetches single launch', async () => {
//   const userAPI = new UserAPI(UserModel.collection);
//   const twitAPI = new TwitAPI(TwitModel.collection);

//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     dataSources: () => ({ userAPI, twitAPI }),
//     context: () => ({ user: { id: 1, email: 'a@a.a' } }),
//   });

//   // mock the dataSource's underlying fetch methods
//   twitAPI.get = jest.fn(() => [mockLaunchResponse]);
//   userAPI = mockStore;
//   userAPI.trips.findAll.mockReturnValueOnce([{ dataValues: { launchId: 1 } }]);

//   // use the test server to create a query function
//   const { query } = createTestClient(server);

//   // run query against the server and snapshot the output
//   const res = await query({ query: GET_LAUNCH, variables: { id: 1 } });
//   expect(res).toMatchSnapshot();
// });
