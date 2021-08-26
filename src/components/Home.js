import React from 'react'
import fs from 'fs'
import UpdateNote from './UpdateNote'

function Home() {
    const [note, setNote] = React.useState([])
    const [text, setText] = React.useState('')
    const [title, setTitle] = React.useState('')

    React.useEffect(() => {
        if (fs.existsSync('data.json')) {
            setNote(JSON.parse(fs.readFileSync('data.json')))
        } else {
            fs.writeFileSync('data.json', JSON.stringify([]))
        }
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        if (text.length > 0) {
            const myDate = new Date();
            const date = myDate.toLocaleString().split(' ');
            const newDate = date[1] + ' - ' + date[0];
            const newText = {
                time: newDate,
                title: title,
                text: text
            }
            setNote([newText, ...note])
            setText('')
            setTitle('')
            fs.writeFileSync('data.json', JSON.stringify([newText, ...note]))
        }
    }

    const handleDelete = i => {
        setNote(note.filter(t => t !== note[i]))
        fs.writeFileSync('data.json', JSON.stringify(note.filter(t => t !== note[i])))
    }

    const handleEdit = i => {

    }

    return (
        <div className='bg-dark text-light vh-100 vw-100 overflow-auto'>
            <div className="container">
                <h1 className="display-1 text-center">Note</h1>
                <form className="d-flex my-4" onSubmit={handleSubmit}>
                    <input placeholder='Title' type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                    <input placeholder='Text' type="text" className="form-control ms-2" value={text} onChange={e => setText(e.target.value)} />
                    <button className="btn btn-primary ms-2">Add</button>
                </form>
                <div className="row row-cols-lg-4 row-cols-md-2">
                    {
                        note.map((t, i) => (
                            <div className='my-3' key={i}>
                                <hr />
                                <h2 className="display-4 text-center">{t.title}</h2>
                                <p>{t.text}</p>
                                <div className="d-flex align-items-start justify-centant-between">
                                    <p>{t.time}</p>
                                    <div>
                                        <button type="button" className="btn btn-sm btn-warning ms-3" data-bs-toggle='modal' href={`#note-update-modal-${i}`}>Edit</button>
                                        <div class="modal fade" tabindex="-1" id={`note-update-modal-${i}`}>
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-body">
                                                        <input type="text" className="form-control" />
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => { handleEdit(i) }}>Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-sm btn-danger ms-3" onClick={() => { handleDelete(i) }}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
