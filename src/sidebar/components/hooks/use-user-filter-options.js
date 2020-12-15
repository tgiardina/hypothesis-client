import { useMemo } from 'preact/hooks';

import { useStoreProxy } from '../../store/use-store';
import { username } from '../../util/account-id';

/** @typedef {import('../../store/modules/filters').FilterOption} FilterOption */

/**
 * Generate a list of users for filtering annotations; update when set of
 * annotations or filter state changes meaningfully.
 *
 * @return {FilterOption[]}
 */
export default function useUserFilterOptions() {
  const store = useStoreProxy();
  const annotations = store.allAnnotations();
  const focusFilters = store.getFocusFilters();
  const showDisplayNames = store.isFeatureEnabled('client_display_names');

  return useMemo(() => {
    // Determine unique users (authors) in annotation collection
    const users = {};
    annotations.forEach(annotation => {
      // Display a username, not an account ID. If we're dealing with an
      // account ID, we need to username() it
      const _username = username(annotation.user)
        ? username(annotation.user)
        : annotation.user;
      const displayValue =
        showDisplayNames && annotation.user_info?.display_name
          ? annotation.user_info.display_name
          : _username;
      users[annotation.user] = displayValue;
    });

    // If user-focus is configured (even if not applied) add a filter
    // option for that user. Note that this always respects the display
    // value, even if `client_display_names` feature flags is not enabled:
    // this matches current implementation of focus mode.
    if (focusFilters.user) {
      // We need to see if the user indicated by the user-focus filter is
      // already contained in `users`. This is complicated by the fact that
      // the value of the user filter can be either an account ID or a username;
      // we can't be sure...
      const maybeUsername = focusFilters.user.value;
      const alreadyPresent = Object.keys(users).find(probablyAccountId => {
        return (
          probablyAccountId === maybeUsername ||
          username(probablyAccountId) === maybeUsername
        );
      });

      // Remove any pre-existing filter option corresponding to this user
      // before (re-)adding it. The value defined by the focused user config
      // needs to take precedence. This is so that if user focus is active,
      // a filter component will correctly recognize the focused user as selected.
      // Not doing this can result in two filter options for the same user:
      // one using a username and one using an account ID.
      if (alreadyPresent) {
        delete users[alreadyPresent];
      }

      users[maybeUsername] = focusFilters.user.display;
    }

    // Convert to `FilterOption` objects
    const userOptions = Object.keys(users).map(user => {
      return { display: users[user], value: user };
    });

    // TODO: Add current user as a filter option ("Me")

    userOptions.sort((a, b) =>
      a.display.toLowerCase() > b.display.toLowerCase() ? 1 : -1
    );

    return userOptions;
  }, [annotations, focusFilters, showDisplayNames]);
}
