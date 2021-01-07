import { createElement } from 'preact';

import propTypes from 'prop-types';
import { useStoreProxy } from '../store/use-store';
import { withServices } from '../util/service-context';

import Category from './category';

/**
 * @typedef {import('../../types/config').MergedConfig} MergedConfig
 */

/**
 * @typedef CategorySelectorProps
 * @prop {Object} frameSync - Injected service
 */

/**
 * A "top-level" `Thread`, rendered as a "card" in the sidebar. A `Thread`
 * renders its own child `Thread`s within itself.
 *
 * @param {CategorySelectorProps} props
 */
function CategorySelector({ frameSync }) {
  const store = useStoreProxy();

  return (
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
    <div
      className='card'
    >
      <Category name="essential" color="yellow" />
      <Category name="policy makers" color="green" />      
      <Category name="experts" color="purple" />            
      <Category name="comparisons" color="red" />                  
    </div>
  );
}

CategorySelector.propTypes = {
  frameSync: propTypes.object.isRequired,
};

CategorySelector.injectedProps = ['frameSync'];

export default withServices(CategorySelector);
