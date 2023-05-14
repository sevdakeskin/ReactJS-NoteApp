import React from "react";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import "./styles/style.css";
import { nanoid } from 'nanoid'
import Split from 'react-split'


function App() {
  const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem("notes")) || []);

  const [currentNoteId, setCurrentNoteId] = React.useState((notes[0]?.id));

  React.useEffect(() => {
    console.log("Notelar degisti, useeffect cagrildi.");
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes])


  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your Note",
    }
    setNotes((prevNotes) => [newNote, ...prevNotes]);

    // newNote + önceki Notlar
  }

  function deleteNote(event,noteId){
    event.preventDefault();
    console.log("Delete button clicked",noteId);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
    
    /*
    notes =  [1,2,3,4,5,6]
    const filteredNotes = notes.filter(note => note != noteId);
    // filteredNotes -> [1,3,4,5,6]
    
    // filter fonksiyon
    const array = [ 23, 45, 45, 89, 12 ];
    const tasks = [
      {
        taskId : 1,
        taskName : 'Clean the bathroom',
        taskStatus: 'Complete'
      },
      {
        taskId : 2,
        taskName : 'Learn filtering data in React',
        taskStatus: 'To do'
      },
      {
        taskId : 3,
        taskName : 'Fix the bug on React project',
        taskStatus: 'To do'
      },
      {
        taskId : 4,
        taskName : 'Fix the car',
        taskStatus: 'Complete'
      }
    ]
    const filteredArray = array.filter(num =>  num === 45);
    const filteredTasks = tasks.filter(task => task.taskStatus === "Complete") // taskStatus u To do ya esit olanlari getir ve filtrele
    console.log("filteredTasks",filteredTasks);
    */
  }

  function updateNote(noteBody){
    // noteBody -> React js todo app
    console.log("Note body",noteBody);
    //console.log("Update note fonksiyonu");

    const noteIndex = notes.findIndex((note) => note.id === currentNoteId);

    if(noteIndex === -1){
      console.log("Note bulunamadi.");
      return;
    }

    const updatedNote = {
      id: currentNoteId,
      body: noteBody
    };
    
    const updatedNotes = [...notes]; // copy of the current notes in the state
    updatedNotes[noteIndex] = updatedNote; 

    setNotes(updatedNotes);
    /* 
     setNotes((prevNotes) => {
        const updatedNotes = [...prevNotes]; // copy of the current notes in the state
        updatedNotes[noteIndex] = updatedNote; 
        return updatedNotes;
     });
    */
  }

  function getCurrentNote(){
    
    return(
      notes.find((note) => {
       return note.id === currentNoteId
      })
    )
    
    
    /*const ages = [3, 10, 19, 20];
    // filter -> kosula uygun tüm durumlari getirir. Array return eder.
    // find -> kosula uygun ilk buldugu durumu getirir. Array return eder.
    const res = ages.find(age => age > 18);
    console.log("find result",res);
    */
  }

  console.log("getCurrentNote",getCurrentNote());

  // Arrow Function Examples
  /*
  // Arrow Function Examples
  function counterFunc(counter) {
    if (counter > 100) {
      counter = 0;
    }else {
      counter++;
    }
    
    return counter;
  }
  // Arrow function olarak yazin ve degiskene atayin.
  // (paramaters) => {logic}
  const counterFunc = (counter) => {
    if (counter > 100) {
      counter = 0;
    }else {
      counter++;
    }
    
    return counter;
  }
  const counterFunc = (counter) => {counter > 100 ? 0 : counter++}
  function nameAge(name, age) {
    console.log("Hello " + name);
    console.log("You are " + age + " years old");
  }
  const nameAge = (name,age) => {
    console.log("Hello " + name);
    console.log("You are " + age + " years old");
  }
  */

  

  return (
    <main>
      {notes.length  > 0 ? (
        <div>
          <Split
            sizes={[25, 75]}
            direction="horizontal"
            className="split"
          >

            <Sidebar 
              notes={notes} 
              newNote={createNewNote} 
              deleteNote={deleteNote}
              currentNote={getCurrentNote}
              setCurrentNoteId={setCurrentNoteId}
            />
            <Editor currentNote={getCurrentNote} updateNote={updateNote} />
          </Split>

        </div>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>Create one now</button>
        </div>
      )
      }
    </main>
  );
}

export default App;
