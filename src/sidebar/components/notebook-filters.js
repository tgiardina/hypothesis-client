import { createElement } from 'preact';

import { useStoreProxy } from '../store/use-store';
import useUserFilterOptions from './hooks/use-user-filter-options';

import SelectFilter from './select-filter';

/**
 * @typedef {import('../store/modules/filters').FilterOption} FilterOption
 */

/**
 * Filters for the Notebook
 */
function NotebookFilters() {
  const store = useStoreProxy();

  const userFilter = store.getFilter('user');
  const userFilterOptions = useUserFilterOptions();

  return (
    <SelectFilter
      defaultOption={{ value: '', display: 'Everybody' }}
      icon="profile"
      onSelect={userFilter => store.setFilter('user', userFilter)}
      options={userFilterOptions}
      selectedOption={userFilter}
      title="Filter by user"
    />
  );
}

NotebookFilters.propTypes = {};

export default NotebookFilters;
