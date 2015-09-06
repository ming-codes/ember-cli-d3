
import FixtureAdapter from 'ember-data-fixture-adapter';

FixtureAdapter.reopen({
  findRecord(store, typeClass, id, snapshot) {
    return this.findExistingFixture(typeClass, snapshot);
  }
});

export default FixtureAdapter;
