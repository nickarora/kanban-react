import uuid from 'node-uuid';
import alt from '../libs/alt';
import LaneActions from '../actions/LaneActions';
import NoteStore from './NoteStore';
import update from 'react-addons-update';

class LaneStore {
  constructor() {
    this.bindActions(LaneActions);
    this.lanes = [];
  }

  create(lane) {
    const lanes = this.lanes;
    lane.id = uuid.v4();
    lane.notes = lane.notes || [];

    this.setState({
      lanes: lanes.concat(lane)
    });
  }

  move({sourceId, targetId}) {
    const lanes = this.lanes;

    const sourceLane = lanes.filter((lane) => {
      return lane.notes.indexOf(sourceId) >= 0;
    })[0];

    const targetLane = lanes.filter((lane) => {
      return lane.notes.indexOf(targetId) >= 0;
    })[0];

    const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
    const targetNoteIndex = targetLane.notes.indexOf(targetId);

    if (sourceLane == targetLane) {
      sourceLane.notes = update(sourceLane.notes, {
        $splice: [
          [sourceNoteIndex, 1],
          [targetNoteIndex, 0, sourceId]
        ]
      });
    }
    else {
      //get rid of the source
      sourceLane.notes.splice(sourceNoteIndex, 1);

      // and move it to the target
      targetLane.notes.splice(targetNoteIndex, 0, sourceId);
    }

    this.setState({lanes});
  }

  attachToLane({laneId, noteId}) {
    if (!noteId) {
      this.waitFor(NoteStore); // useful if working with a async db
      noteId = NoteStore.getState().notes.slice(-1)[0].id; //last note
    }

    const lanes = this.lanes.map((lane) => {
      if (lane.id === laneId) {
        // if note isn't in the lane
        if (lane.notes.indexOf(noteId) === -1) {
          lane.notes.push(noteId);
        } else {
          console.warn('Already attached to lane! ', lanes);
        }
      }

      return lane;
    });

    this.setState({lanes});
  }

  detachFromLane({laneId, noteId}) {
    const lanes = this.lanes.map((lane) => {
      if (lane.id === laneId) {
        lane.notes = lane.notes.filter((note) => note !== noteId)
      }
      return lane;
    });

    this.setState({lanes});
  }

  update({id, name}) {
    const lanes = this.lanes.map((lane) => {
      if (lane.id === id) {
        lane.name = name;
      }
      return lane;
    });

    this.setState({lanes});
  }

  delete(id) {
    this.setState({
      lanes: this.lanes.filter((lane) => lane.id !== id)
    });
  }
}

export default alt.createStore(LaneStore, 'LaneStore');