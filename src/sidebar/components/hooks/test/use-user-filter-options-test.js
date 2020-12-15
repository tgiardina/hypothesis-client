import { mount } from 'enzyme';
import { createElement } from 'preact';

import useUserFilterOptions from '../use-user-filter-options';
import { $imports } from '../use-user-filter-options';

describe('sidebar/components/hooks/use-user-filter-options', () => {
  let fakeStore;
  let lastUserOptions;

  // Mount a dummy component to be able to use the hook
  function DummyComponent() {
    lastUserOptions = useUserFilterOptions();
  }

  function annotationFixtures() {
    return [
      {
        user: 'acct:dingbat@localhost',
        user_info: { display_name: 'Ding Bat' },
      },
      { user: 'abalone', user_info: { display_name: 'Aba Lone' } },
      { user: 'bananagram', user_info: { display_name: 'Zerk' } },
      {
        user: 'acct:dingbat@localhost',
        user_info: { display_name: 'Ding Bat' },
      },
    ];
  }

  beforeEach(() => {
    fakeStore = {
      allAnnotations: sinon.stub().returns([]),
      getFocusFilters: sinon.stub().returns({}),
      isFeatureEnabled: sinon.stub().returns(false),
    };

    $imports.$mock({
      '../../store/use-store': { useStoreProxy: () => fakeStore },
    });

    //mount(<DummyComponent />);
  });

  afterEach(() => {
    $imports.$restore();
  });

  it('should return a user filter option for each user who has authored an annotation', () => {
    fakeStore.allAnnotations.returns(annotationFixtures());

    mount(<DummyComponent />);

    const values = lastUserOptions.map(option => option.value);
    const displays = lastUserOptions.map(option => option.display);

    assert.deepEqual(values, [
      'abalone',
      'bananagram',
      'acct:dingbat@localhost',
    ]);
    assert.deepEqual(displays, ['abalone', 'bananagram', 'dingbat']);
  });

  it('should use display names if feature flag enabled', () => {
    fakeStore.allAnnotations.returns(annotationFixtures());
    fakeStore.isFeatureEnabled.withArgs('client_display_names').returns(true);

    mount(<DummyComponent />);

    const values = lastUserOptions.map(option => option.value);
    const displays = lastUserOptions.map(option => option.display);

    assert.deepEqual(values, [
      'abalone',
      'acct:dingbat@localhost',
      'bananagram',
    ]);
    assert.deepEqual(displays, ['Aba Lone', 'Ding Bat', 'Zerk']);
  });

  it('should add focused-user filter information if configured', () => {
    fakeStore.allAnnotations.returns(annotationFixtures());
    fakeStore.isFeatureEnabled.withArgs('client_display_names').returns(true);
    fakeStore.getFocusFilters.returns({
      user: { value: 'carrotNumberOne', display: 'Number One Carrot' },
    });

    mount(<DummyComponent />);

    const values = lastUserOptions.map(option => option.value);
    const displays = lastUserOptions.map(option => option.display);

    assert.deepEqual(values, [
      'abalone',
      'acct:dingbat@localhost',
      'carrotNumberOne',
      'bananagram',
    ]);
    assert.deepEqual(displays, [
      'Aba Lone',
      'Ding Bat',
      'Number One Carrot',
      'Zerk',
    ]);
  });

  it('always uses display name for focused user', () => {
    fakeStore.allAnnotations.returns(annotationFixtures());
    fakeStore.isFeatureEnabled.withArgs('client_display_names').returns(false);
    fakeStore.getFocusFilters.returns({
      user: { value: 'carrotNumberOne', display: 'Numero Uno Zanahoria' },
    });

    mount(<DummyComponent />);

    const values = lastUserOptions.map(option => option.value);
    const displays = lastUserOptions.map(option => option.display);

    assert.deepEqual(values, [
      'abalone',
      'bananagram',
      'acct:dingbat@localhost',
      'carrotNumberOne',
    ]);
    assert.deepEqual(displays, [
      'abalone',
      'bananagram',
      'dingbat',
      'Numero Uno Zanahoria',
    ]);
  });

  it('overrides user filter option with user-focus filter option if there is a conflict', () => {
    fakeStore.allAnnotations.returns(annotationFixtures());
    fakeStore.isFeatureEnabled.withArgs('client_display_names').returns(false);
    fakeStore.getFocusFilters.returns({
      user: { value: 'dingbat', display: 'Ding-bat' },
    });

    mount(<DummyComponent />);

    const values = lastUserOptions.map(option => option.value);
    const displays = lastUserOptions.map(option => option.display);

    assert.deepEqual(values, ['abalone', 'bananagram', 'dingbat']);
    assert.deepEqual(displays, ['abalone', 'bananagram', 'Ding-bat']);
  });
});
