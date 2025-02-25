import React, { useEffect, useState } from 'react'
import ProjectListItem from './ProjectListItem'

const ProjectList = () => {
    const [projects, setProjects] = useState([])

    const getProjects = async () => {
        const res = await fetch('https://localhost:7164/api/projects')
        const data = await res.json()

        setProjects(data)
    }


    useEffect(() => {
        getProjects()
    }, [])


  return (
    <section id='project-list'>
        <div className='container'>

        <div className='projects'>
        {
            projects.map(project => (<ProjectListItem key={project.id} project={project}/>))
        }
        </div>

        </div>
    </section>
  )
}

export default ProjectList