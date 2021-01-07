import { createElement } from 'preact';

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

  const onChange = (event) => {
    if(event.target.checked) {
      store.showCategories([name])
    } else {
      store.hideCategories([name])
    }
  }

  return (
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
    <div>
      <input type="checkbox" id={name} name={name} value={name} onChange={onChange} checked={store.isCategoryChecked(name)}/>
      <label for={name} className={`hypothesis-highlight hypothesis-highlight-${color}`}  style={{ cursor: "pointer" }}> {name} </label>
      <br />
    </div>
  );
}

Category.propTypes = {
  name: propTypes.string.isRequired,
  color: propTypes.string.isRequired,
};

export default withServices(Category);
