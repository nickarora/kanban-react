import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions'

class NoteStore {
  constructor() {
    //map each action to a method by name
    this.bindActions(NoteActions);
    this.notes = [];

    // provided by Alt --> exposes public methods
    this.exportPublicMethods({
      get: this.get.bind(this)
    });
  }

  // accepts array of note ids and returns note objects
  get(ids) {
    return (ids || []).map(
      (id) => this.notes.filter((note) => note.id === id)
    ).filter((a) => a).map((a) => a[0]);
  }

  create(note) {

    const notes = this.notes;
    note.id = uuid.v4();
    this.setState({ // courtesy of alt
      notes: notes.concat(note)
    });

  }

  update({id, task}) {
    const notes = this.notes.map((note) => {
      if (note.id === id) {
        note.task = task;
      }
      return note;
    });

    this.setState({notes});
  }

  delete(id) {
    this.setState({
      notes: this.notes.filter((note) => note.id !== id)
    });
  }
}

// note: assigning a label to the store (NoteStore) isn't required
// but it is good practice
export default alt.createStore(NoteStore, 'NoteStore');