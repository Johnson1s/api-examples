import { apolloClient } from '../apollo-client';
import { getAddressFromSigner } from '../ethers.service';
import { ProfilesManagedDocument } from '../graphql/generated';

const getProfilesManaged = async (address: string) => {
  const result = await apolloClient.query({
    query: ProfilesManagedDocument,
    variables: {
      request: {
        address,
      },
      statsRequest: {},
      reactionsRequest: {},
      countOpenActionsRequest: {},
    },
  });

  return result.data.profilesManaged.items;
};

// currently does not work due to postgres syntax error
const profilesManaged = async () => {
  const address = getAddressFromSigner();

  const result = await getProfilesManaged(address);

  console.log(`profiles managed: result: ${result}`);

  return result;
};

(async function () {
  await profilesManaged();
})();
