/**
 * Copyright (c) IBM and its affiliates.
 *
 * This source code is licensed under the MIT license found in the LICENSE.txt
 * file in the root directory of this source tree.
 */

import ApolloClient, { gql } from 'apollo-boost';

import config from './config';

const client = new ApolloClient({
  uri: config.apiUrl
});

export { client, gql };