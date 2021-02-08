/**
 * Copyright (c) IBM, Corp. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, css, customElement, property } from 'lit-element';

import { PageElement } from '../helpers/page-element';
import { ApolloQueryMixin } from '@apollo-elements/mixins';
import { ApolloError, TypedDocumentNode, gql } from '@apollo/client/core';

interface Data {
  launches: { id: string; missionName: string; }[];
}

const HomePageQuery: TypedDocumentNode<Data, { [key: string]: never }> = gql`
  query HomePage {
    launches {
      id
      missionName: mission_name
    }
  }
`;

@customElement('page-home')
export class PageHome extends ApolloQueryMixin(PageElement)<typeof HomePageQuery> {
  static styles = css`
    :host {
      padding: 1rem;
    }
  `;

  @property({ noAccessor: true }) data: Data | null = null;

  @property({ attribute: false }) error: Error | ApolloError | null = null;

  @property({ type: Boolean, reflect: true }) loading = false;

  query = HomePageQuery;

  render() {
    const launches = this.data?.launches ?? [];
    return html`
      <section>
        <h1>Home</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi,
          delectus? Unde, sit. Fuga modi ea praesentium. Nemo dicta qui, magnam
          cum dolorum excepturi beatae explicabo quidem fugiat ullam blanditiis
          minima!
        </p>

        <h2>Launches</h2>

        <ol>
          ${launches.map(({ id, missionName }) => html`
          <li data-launch-id="${id}">${missionName}</li>
          `)}
        </ol>

        <p>Here you can see <a href="/error">the not found page</a>.</p>
      </section>
    `;
  }
}
