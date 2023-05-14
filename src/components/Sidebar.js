import React from "react";

export default function Sidebar(props){

    console.log(props.notes);

    const noteElements = props.notes.map((note,index) => (
        <div className="title" onClick={() =>props.setCurrentNoteId(note.id)}>
            <h4 className="text-snippet">{note.body}</h4>
            <button className="delete-btn" onClick={(event) =>props.deleteNote(event,note.id)}>Delete</button>
        </div>
    ))
    return(
        <>
            <section className="pane sidebar">
                <div className="sidebar--header">
                    <h3>Notes</h3>
                    <button className="new-note" onClick={props.newNote}>
                        +
                    </button>
                </div>
                 {/*props.notes*/}
                {noteElements}
            </section>
        </>
    )
}