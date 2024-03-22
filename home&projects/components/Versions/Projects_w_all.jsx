import React from 'react'
import { useState, useEffect} from 'react'

function Projects() {
    const[projects, setContent] = useState([])

    const handleResponse = (response) => {
        if (response.status === 200) {
            return response.json()
        } else if (response.status === 204) {
            return []
        } else {
            throw new Error("invalid response: " + response.status);
        }
    }
    const handleJSON = (json) => {
        if (json.constructor === Array) {
            setContent(json)
        } else {
            setNoResults(false)
            throw new Error("invalid JSON: " + json)
        }
    }
    const fetchData = () => {
        fetch('https://w20016240.nuwebspace.co.uk/groupwork/testapi/projects')
        .then( response => handleResponse(response) )
        .then( json => { handleJSON(json) } )
        .catch( err => { console.log(err.message) })
    }

    const allProjects = projects.map((project, i) => (
        <section key={i}>
            <h2>Title: {project.title}</h2>
            <h2>Location: {project.location}</h2>
            <h2>End Date: {project.endDate}</h2>
            <h2>Positions: {project.positions}</h2>
        </section>
    ))

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
        {allProjects}
        </>
    );
}

export default Projects