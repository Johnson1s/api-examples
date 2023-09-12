import { apolloClient } from '../apollo-client';
import {
  PublicationSearchRequest,
  PublicationType,
  SearchPublicationsDocument,
} from '../graphql/generated';

const searchRequest = async (request: PublicationSearchRequest) => {
  const result = await apolloClient.query({
    query: SearchPublicationsDocument,
    variables: {
      request,
      statsRequest: {},
    },
  });

  return result.data.searchPublications;
};

export const search = async () => {
  const result = await searchRequest({
    query: 'lens',
    where: {
      publicationTypes: [PublicationType.Quote, PublicationType.Post, PublicationType.Comment],
    },
  });
  console.log('search publications: result', result);

  return result;
};

(async () => {
  await search();
})();
