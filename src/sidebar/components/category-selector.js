import { createElement } from 'preact';

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
 * @prop {boolean} [isCompact=true] - Should the display be comapct?
 */

/**
 * Displays category options.
 *
 * @param {CategorySelectorProps} props
 */
function CategorySelector({ onCheck, onUncheck, defaultValue=new Set(), isCompact=false}) {
  return (
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
    <ul className={`category-selector-grid ${isCompact ? "compact" : ""}`}>
      <li>
      <Category 
        name={Categories.ESSENTIAL}
        color="yellow" 
        onCheck={onCheck} 
        onUncheck={onUncheck} 
        defaultValue={defaultValue.has(Categories.ESSENTIAL)} />
      </li>        
      <li>
      <Category 
        name={Categories.POLICY_MAKERS} 
        color="green" 
        onCheck={onCheck} 
        onUncheck={onUncheck}
        defaultValue={defaultValue.has(Categories.POLICY_MAKERS)} />
      </li>        
      <li>
      <Category 
        name={Categories.EXPERTS} 
        color="purple" 
        onCheck={onCheck} 
        onUncheck={onUncheck}
        defaultValue={defaultValue.has(Categories.EXPERTS)} />
      </li>        
      <li>
      <Category 
        name={Categories.COMPARISONS} 
        color="red" 
        onCheck={onCheck} 
        onUncheck={onUncheck}
        defaultValue={defaultValue.has(Categories.COMPARISONS)} />
      </li>        
    </ul>
  );
}

CategorySelector.propTypes = {
  onCheck: propTypes.func.isRequired,
  onUncheck: propTypes.func.isRequired,
  defaultValue: propTypes.instanceOf(Set),
  isCompact: propTypes.bool,
};

export default CategorySelector;
