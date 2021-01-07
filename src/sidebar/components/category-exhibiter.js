import { createElement } from 'preact';

import { useStoreProxy } from '../store/use-store';

import CategorySelector from './category-selector';

/**
 * @typedef {import('../../types/config').MergedConfig} MergedConfig
 */

/**
 * UI for choosing which categories to display.
 */
function CategoryExhibiter() {
  const store = useStoreProxy();

  const onCheck = (name) => {
    store.showCategories([name])
  };

  const onUncheck = (name) => {
    store.hideCategories([name])
  };

  return (
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
    <CategorySelector onCheck={onCheck} onUncheck={onUncheck} defaultValue={store.categories()} />
  );
}

CategoryExhibiter.propTypes = {};

export default CategoryExhibiter;
