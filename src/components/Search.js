import React from 'react'
import { Context } from '../App';
import NoteSearch from './NoteSearch';

function Search() {
    const [searchValues, setSearchValues] = React.useState([])
    const contexts = React.useContext(Context)

    const handleSearch = (e) => {
        if (e.target.value.length > 0) {
            setSearchValues(contexts.note.filter(n => n.title === e.target.value || n.text.includes(e.target.value) || n.time === e.target.value))
        } else {
            setSearchValues([])
        }
    }

    return (
        <>
            <input placeholder='Search anything' type="search" className="form-control" onChange={handleSearch} />
            <div className="row row-cols-lg-4 row-cols-md-2">
                {
                    searchValues.map((t, i) => (
                        <NoteSearch t={t} key={i} i={i} />
                    ))
                }
            </div>
            <hr />
        </>
    )
}

export default Search
