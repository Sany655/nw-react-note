import React from 'react'
// import fs from 'fs'
import Modal from 'bootstrap/js/dist/modal'
import { Context } from '../App'


function Note({ t, i }) {
    const contexts = React.useContext(Context)
    const [edit, setEdit] = React.useState({})
    const handleDelete = i => {
        contexts.setNote(contexts.note.filter(t => t !== contexts.note[i]))
        localStorage.setItem('data',JSON.stringify(contexts.note.filter(t => t !== contexts.note[i])))
    }

    const handleEdit = (i) => {
        const modal = new Modal(document.getElementById(`note-update-modal-${i}`))
        setEdit({ title: contexts.note[i].title, text: contexts.note[i].text });
        modal.show()
    }

    const handleUpdate = i => {
        const modal = new Modal(document.getElementById(`note-update-modal-${i}`))
        const myDate = new Date();
        const date = myDate.toLocaleString().split(' ');
        const newDate = date[1] + ' - ' + date[0];
        contexts.note[i] = {
            title: edit.title,
            text: edit.text,
            time: newDate
        }
        contexts.setNote([...contexts.note])
        modal.hide()
    }
    return (
        <div className='my-3' key={i}>
            <hr />
            <h2 className="display-4 text-center">{t.title}</h2>
            <p>{t.text}</p>
            <div className="d-flex align-items-start justify-centant-between">
                <p>{t.time}</p>
                <div>
                    <button type="button" className="btn btn-sm btn-warning ms-3" onClick={() => { handleEdit(i) }}>Edit</button>
                    <div className="modal fade" tabIndex="-1" id={`note-update-modal-${i}`}>
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <input type="text" className="form-control my-3" placeholder='Title' onChange={(e) => (setEdit({ ...edit, title: e.target.value }))} value={edit.title} />
                                    <textarea className="form-control my-3" placeholder='Text' onChange={(e) => (setEdit({ ...edit, text: e.target.value }))} value={edit.text}></textarea>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary mx-3" data-bs-dismiss="modal" onClick={() => { handleUpdate(i) }}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-sm btn-danger ms-3" onClick={() => { handleDelete(i) }}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Note
