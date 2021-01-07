import { createElement, Fragment } from 'preact';

import propTypes from 'prop-types';
import Categories from '../category-constants'

import Category from './category';

/**
 * @typedef {import('../../types/config').MergedConfig} MergedConfig
 */

/**
 * @typedef CategorySelectorProps
 * @prop {function} onCheck - On check event
 *  (name) => void
 * @prop {function} onUncheck - On uncheck event
 *  (name) => void
 * @prop {Set<string>} [defaultValue=[]] - Which categories should be preselected
 */

/**
 * Displays category options.
 *
 * @param {CategorySelectorProps} props
 */
function CategorySelector({ onCheck, onUncheck, defaultValue=new Set() }) {
  return (
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
    <Fragment>
      <Category 
        name={Categories.ESSENTIAL}
        color="yellow" 
        onCheck={onCheck} 
        onUncheck={onUncheck} 
        defaultValue={defaultValue.has(Categories.ESSENTIAL)} />
      <Category 
        name={Categories.POLICY_MAKERS} 
        color="green" 
        onCheck={onCheck} 
        onUncheck={onUncheck}
        defaultValue={defaultValue.has(Categories.POLICY_MAKERS)} />
      <Category 
        name={Categories.EXPERTS} 
        color="purple" 
        onCheck={onCheck} 
        onUncheck={onUncheck}
        defaultValue={defaultValue.has(Categories.EXPERTS)} />
      <Category 
        name={Categories.COMPARISONS} 
        color="red" 
        onCheck={onCheck} 
        onUncheck={onUncheck}
        defaultValue={defaultValue.has(Categories.COMPARISONS)} />
    </Fragment>
  );
}

CategorySelector.propTypes = {
  onCheck: propTypes.func.isRequired,
  onUncheck: propTypes.func.isRequired,
  defaultValue: propTypes.instanceOf(Set)
};

export default CategorySelector;
