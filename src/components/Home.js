import React from 'react'
import fs from 'fs'
import Search from './Search'
import Note from './Note'
import { Context } from '../App'

function Home() {
    const contexts = React.useContext(Context)
    const [text, setText] = React.useState('')
    const [title, setTitle] = React.useState('')

    React.useEffect(() => {
        if (fs.existsSync('data.json')) {
            contexts.setNote(JSON.parse(fs.readFileSync('data.json')))
        } else {
            fs.writeFileSync('data.json', JSON.stringify(contexts.note))
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
            contexts.setNote([newText, ...contexts.note])
            setText('')
            setTitle('')
            fs.writeFileSync('data.json', JSON.stringify([newText, ...contexts.note]))
        }
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
                <Search/>
                <div className="row row-cols-lg-4 row-cols-md-2">
                    {
                        contexts.note?.map((t, i) => (
                            <Note t={t} key={i} i={i}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
