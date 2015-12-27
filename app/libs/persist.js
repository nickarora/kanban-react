import makeFinalStore from 'alt-utils/lib/makeFinalStore'

export default function(alt, storage, storeName) {
  const finalStore = makeFinalStore(alt);

  try {
    // bootstrap == restore data
    alt.bootstrap(storage.get(storeName));
  }
  catch(e) {
    console.error('Failed to bootstrap data', e);
  }

  finalStore.listen(() => {
    if (!storage.get('debug')) {
      // snapshot == save data
      storage.set(storeName, alt.takeSnapshot());
    }
  });

}