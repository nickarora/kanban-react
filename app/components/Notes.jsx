import React from 'react';
import Note from './Note';

export default class Notes extends React.Component {
  render() {
    const notes = this.props.items;

    return <ul>{notes.map(this.renderNote)}</ul>;
  }

  // note onEdit's second argument is bound to note.id
  renderNote = (note) => {
    return (
      <li key={note.id}>
        <Note
          task={note.task}
          onEdit={this.props.onEdit.bind(null, note.id)} />
      </li>
    );
  }
}