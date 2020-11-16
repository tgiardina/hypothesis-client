import { createElement } from 'preact';
import { useCallback, useEffect } from 'preact/hooks';
import propTypes from 'prop-types';

import * as searchFilter from '../util/search-filter';
import { withServices } from '../util/service-context';
import useRootThread from './hooks/use-root-thread';
import useStore from '../store/use-store';

import Menu from './menu';
import MenuItem from './menu-item';
import SvgIcon from '../../shared/components/svg-icon';
import ThreadList from './thread-list';

/**
 * @typedef NotebookContentProps
 * @prop {Object} [api] - Injected service
 * @prop {Object} [toastMessenger] - Injected service
 */

/**
 * The main content of the "notebook" route (https://hypothes.is/notebook)
 *
 * @param {NotebookContentProps} props
 */
function NotebookContent({ api, toastMessenger }) {
  const addAnnotations = useStore(store => store.addAnnotations);
  const annotationFetchStarted = useStore(
    store => store.annotationFetchStarted
  );
  const annotationFetchFinished = useStore(
    store => store.annotationFetchFinished
  );
  const clearAnnotations = useStore(store => store.clearAnnotations);
  const currentQuery = useStore(store => store.routeParams().q);
  const setSortKey = useStore(store => store.setSortKey);

  /**
   * Fetch annotations from the API and display them in the notebook.
   *
   * @param {string} query - The user-supplied search query
   */
  const loadAnnotations = useCallback(
    async query => {
      const queryParams = {
        _separate_replies: true,

        // nb. There is currently no way to load anything except the first
        // 20 matching annotations in the UI.
        offset: 0,
        limit: 20,

        ...searchFilter.toObject(query),
      };
      try {
        annotationFetchStarted();
        const results = await api.search(queryParams);
        addAnnotations([...results.rows, ...results.replies]);
      } finally {
        annotationFetchFinished();
      }
    },
    [addAnnotations, annotationFetchStarted, annotationFetchFinished, api]
  );

  // Update the notebook when this route is initially displayed and whenever
  // the search query is updated.
  useEffect(() => {
    // Sort the Notebook so that the newest annotations are at the top
    setSortKey('Newest');
    clearAnnotations();
    loadAnnotations(currentQuery).catch(err => {
      toastMessenger.error(`Unable to fetch annotations: ${err.message}`);
    });
  }, [
    clearAnnotations,
    currentQuery,
    loadAnnotations,
    setSortKey,
    toastMessenger,
  ]);

  const rootThread = useRootThread();

  const menuLabel = (
    <span className="notebook__menu-label">
      <SvgIcon name="profile" className="notebook__menu-icon" /> Everybody
    </span>
  );

  return (
    <div className="notebook">
      <header className="notebook__subheading">
        <h1>Group or Course Name</h1>
      </header>
      <div className="notebook__filters">
        <Menu label={menuLabel} title="Filter by User">
          <MenuItem
            onClick={() => alert('selected')}
            label="Delilah Devadamin"
          />
        </Menu>
      </div>
      <div className="notebook__result-count">
        <h2>{rootThread.totalChildren} threads</h2> ({rootThread.replyCount}{' '}
        annotations)
      </div>
      <div className="notebook__items">
        <ThreadList thread={rootThread} />
      </div>
    </div>
  );
}

NotebookContent.propTypes = {
  api: propTypes.object,
  toastMessenger: propTypes.object,
};

NotebookContent.injectedProps = ['api', 'toastMessenger'];

export default withServices(NotebookContent);
