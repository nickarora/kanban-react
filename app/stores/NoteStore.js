import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions'

class NoteStore {
  constructor() {
    //map each action to a method by name
    this.bindActions(NoteActions);
    this.notes = [];
  }

  create(note) {

  }

  update({id, task}) {

  }

  delete(id) {

  }
}

// note: assigning a label to the store (NoteStore) isn't required
// but it is good practice
export default alt.createStore(NoteStore, 'NoteStore');