import React from 'react';
import Note from './Editable';

export default class Notes extends React.Component {
  render() {
    const notes = this.props.notes;

    return <ul className="notes">{notes.map(this.renderNote)}</ul>;
  }

  // note onEdit's first argument is bound to note.id
  renderNote = (note) => {
    return (
      <li className="note" key={note.id}>
        <Editable
          value={note.task}
          onEdit={this.props.onEdit.bind(null, note.id)}
          onDelete={this.props.onDelete.bind(null, note.id)} />
      </li>
    );
  }
}