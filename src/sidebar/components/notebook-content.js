import { createElement } from 'preact';
import { useEffect } from 'preact/hooks';
import propTypes from 'prop-types';

//import * as searchFilter from '../util/search-filter';
import { withServices } from '../util/service-context';
import useRootThread from './hooks/use-root-thread';
import useStore from '../store/use-store';

import Menu from './menu';
import MenuItem from './menu-item';
import SvgIcon from '../../shared/components/svg-icon';
import ThreadList from './thread-list';
//import loadAnnotationsService from '../services/load-annotations';

/**
 * @typedef NotebookContentProps
 * @prop {Object} [loadAnnotationsService] - Injected service
 */

/**
 * The main content of the "notebook" route (https://hypothes.is/notebook)
 *
 * @param {NotebookContentProps} props
 */
function NotebookContent({ loadAnnotationsService }) {
  const focusedGroup = useStore(store => store.focusedGroup());

  useEffect(() => {
    if (focusedGroup) {
      loadAnnotationsService.load({ groupId: focusedGroup.id });
    }
  }, [loadAnnotationsService, focusedGroup]);

  const rootThread = useRootThread();
  const annotationsUsers = useStore(store => store.annotationsUsers());
  const groupName = focusedGroup ? focusedGroup.name : 'Group';

  const menuLabel = (
    <span className="notebook__menu-label">
      <SvgIcon name="profile" className="notebook__menu-icon" /> Everybody
    </span>
  );

  return (
    <div className="notebook">
      <header className="notebook__subheading">
        <h1>{groupName}</h1>
      </header>
      <div className="notebook__filters">
        <Menu label={menuLabel} title="Filter by User">
          {annotationsUsers.map(annUser => (
            <MenuItem
              onClick={() => alert('selected')}
              key={annUser.userId}
              label={annUser.displayName}
            />
          ))}
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
  loadAnnotationsService: propTypes.object,
};

NotebookContent.injectedProps = ['loadAnnotationsService'];

export default withServices(NotebookContent);
