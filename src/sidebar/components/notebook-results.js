import { createElement } from 'preact';
import propTypes from 'prop-types';

import useRootThread from './hooks/use-root-thread';
import { useStoreProxy } from '../store/use-store';
import { countVisible } from '../util/thread';

/**
 * Render count of annotations (or filtered results) visible in the notebook view
 * There are three possible overall states:
 * - No results (regardless of whether annotations are filtered): "No results"
 * - Annotations are unfiltered: "X threads (Y annotations)"
 * - Annotations are filtered: "X results [(and Y more)]"
 */
function NotebookResults() {
  const store = useStoreProxy();
  const forcedVisibleCount = store.forcedVisibleAnnotations().length;
  const hasAppliedFilter = store.hasAppliedFilter();
  const rootThread = useRootThread();
  const visibleCount = countVisible(rootThread);

  // TODO: Test that this is valid when in focused-user mode
  const hasResults = rootThread.totalChildren
    ? rootThread.totalChildren > 0
    : false;

  const hasForcedVisible = forcedVisibleCount > 0;
  const matchCount = visibleCount - forcedVisibleCount;
  const threadCount = rootThread.totalChildren;

  return (
    <span className="notebook-results">
      {!hasResults && <h2>No results</h2>}
      {hasResults && hasAppliedFilter && (
        <span>
          <h2>
            {matchCount} {matchCount === 1 ? 'result' : 'results'}
          </h2>
          {hasForcedVisible && <em> (and {forcedVisibleCount} more)</em>}
        </span>
      )}
      {hasResults && !hasAppliedFilter && (
        <span>
          <h2>
            {threadCount} {threadCount === 1 ? 'thread' : 'threads'}
          </h2>{' '}
          <em>
            ({visibleCount} {visibleCount === 1 ? 'annotation' : 'annotations'})
          </em>
        </span>
      )}
    </span>
  );
}

NotebookResults.propTypes = {
  loadAnnotationsService: propTypes.object,
};

export default NotebookResults;
