import React, { useContext, useRef , useState } from 'react'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';


import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = () => {
    let history = useHistory();
    const context = useContext(noteContext);
    const { notes, getNotes , editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            console.log(localStorage.getItem('token'));
            getNotes();
        }else{
            history.push("/login");
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)

    const[note , setNote] = useState({id:"", etitle:"", edescription:"", etag:""})

    const updateNote = (currentNote) => {
        ref.current.click()
        
        setNote({id:currentNote._id, etitle:currentNote.title , edescription: currentNote.description , etag: currentNote.tag})
    }

    

    
    const handleClick = (e) =>{
        editNote(note.id , note.etitle , note.edescription , note.etag )
        refClose.current.click();
    }

    const onChange = (e) =>{
        setNote({...note,[e.target.name]: e.target.value})
    }

    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="container my-3">
                                    <h2>Add a Note</h2>
                                    <form className="my-3">
                                        <div className="mb-3">
                                            <label htmlFor="etitle" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="edescription" className="form-label">Description</label>
                                            <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="etag" className="form-label">Tag</label>
                                            <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                        </div>

                                        
                                    </form>
                                </div>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <div className="container row my-3">
                    <h3>Your Notes</h3>
                    <p>{notes.length===0&&"Add a Note "}</p>
                    {notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
