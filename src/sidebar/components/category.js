import { createElement } from 'preact';
import { useState } from 'preact/hooks';

import propTypes from 'prop-types';
import { useStoreProxy } from '../store/use-store';
import { withServices } from '../util/service-context';

/**
 * @typedef {import('../../types/config').MergedConfig} MergedConfig
 */

/**
 * @typedef CategoryProps
 * @prop {string} name - name of the category
 * @prop {string} color - color associated with the category
 */

/**
 * A "top-level" `Thread`, rendered as a "card" in the sidebar. A `Thread`
 * renders its own child `Thread`s within itself.
 *
 * @param {CategoryProps} props
 */
function Category({ name, color }) {
  const store = useStoreProxy();
  const [isChecked, setChecked] = useState(store.isCategoryChecked(name));  
  const toggle = () => {
    const isNowChecked = !isChecked;
    setChecked(isNowChecked)
    if(isNowChecked) {
      store.showCategories([name])
    } else {
      store.hideCategories([name])
    }
  }

  return (
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
    <div>
      <input 
        className="category-checkbox"
        style={{
          backgroundColor: isChecked ? color : "white"
        }}
        type="checkbox" 
        id={name} 
        name={name} 
        value={name} 
        onChange={toggle} 
        checked={isChecked}
      />
      <label 
        className={`category-label hypothesis-highlight hypothesis-highlight-${color}`}        
        for={name} 
      >
        {name}
      </label>
    </div>
  );
}

Category.propTypes = {
  name: propTypes.string.isRequired,
  color: propTypes.string.isRequired,
};

export default withServices(Category);
