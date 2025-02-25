import React, { useEffect, useState } from 'react'

const CreateProjectForm = () => {
    const [customers, setCustomers] = useState([])

    const [projectName, setProjectName] = useState('')
    const [description, setDescription] = useState('')
    const [customerId, setCustomerId] = useState(0)

    const getCustomers = async () => {
        const res = await fetch('https://localhost:7164/api/customers')
        const data = await res.json()

        setCustomers(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            projectName: projectName,
            description: description,
            customerId: parseInt(customerId)
        }
        const res = await fetch('https://localhost:7164/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        console.log(res)

    }

    useEffect(() => {
        getCustomers()
    },[])

    return (
    <section>
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor="projectName">Projekt Beskrivning</label>
                <input type='text' id='projectName' value={projectName} onChange={(e) => setProjectName(e.target.value)}/>
            </div>

            <div className="form-group">
                <label htmlFor="description">Beskrivning</label>
                <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="customers">Kunder</label>
                <select name='customers' id='customers' defaultValue={customerId} onChange={(e) => setCustomerId(e.target.value)}>
                    <option disabled hidden value='0' >Välj kund</option>
                    {
                        customers.map(customer => (<option key={customer.id} value={customer.id}>{customer.customerName} </option>))
                    }
                </select>
            </div>

            <button type='submit'>Skapa</button>
        </form>
    </div>

    </section>

  )
}

export default CreateProjectForm