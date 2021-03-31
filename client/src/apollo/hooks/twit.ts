import { useMutation, gql } from '@apollo/client';
import { Twit } from '../../generated/graphql';

export const GET_TWITTS = gql`
  query GetTwitts {
    twitts {
      _id
      author
      content {
        number
      }
      replies {
        _id
      }
    }
  }
`;

export const GET_REPLIES = gql`
  query GetReplies($id: ID!) {
    replies(id: $id) {
      _id
      author
      parent
      content {
        operation
        number
      }
      replies {
        _id
        content {
          number
        }
        replies {
          _id
          content {
            number
          }
        }
      }
    }
  }
`;

const POST_TWIT = gql`
  mutation PostTwit($twit: PostTwitInput!) {
    postTwit(input: $twit) {
      author
      content {
        number
      }
    }
  }
`;

export const usePostTwit = () => {
  const [postTwit, { data }] = useMutation(POST_TWIT, {
    update(cache, data) {
      const newTwit = data.data.twit;
      let twitts: [Twit];
      const cachedQuery: any = cache.readQuery({
        query: GET_TWITTS,
      });
      if (cachedQuery.data === null) {
        twitts = [newTwit];
      } else {
        const cachedTwitts = cachedQuery.twitts;
        twitts = [...cachedTwitts, newTwit] as any;
      }
      cache.writeQuery({
        query: GET_TWITTS,
        data: { twitts },
      });
    },
    onError(err) {
      console.log(err.message);
    },
  });
  return {
    postTwit,
    data,
  };
};
