import { useState } from 'react'
import '../css/CreateGift.css'

const CreateGift = () => {

    const date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    let currentDate = year + '-' + month + '-' + day

    const [gift, setGift] = useState({
        id: 0, name: '',
        pricePoint: '',
        audience: '',
        image: '',
        description: '',
        submittedBy: '',
        submittedOn:
        currentDate
    })
    
    const handleChange = (event) => {
        const { name, value } = event.target

        setGift( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    
    const createGift = (event) => {
        event.preventDefault()

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gift),
        }
        
        fetch('/gifts',options)
        window.location = '/'
    }

    return (
        <div className='CreateGift'>
            <center><h2>Add a Gift</h2></center>
            <form>
                <label>Name</label> <br />
                <input type='text' id='name' name='name' value={gift.name} onChange={handleChange} /><br />
                <br/>

                <label>Description</label><br />
                <textarea rows='5' cols='50' id='description' name='description' value={gift.description} onChange={handleChange} ></textarea>
                <br/>

                <label>Image URL</label><br />
                <input type='text' id='image' name='image' value={gift.image} onChange={handleChange} /><br />
                <br/>

                <label>Price Point</label><br />
                <input type='text' id='pricePoint' name='pricePoint' value={gift.pricePoint} onChange={handleChange} /><br />
                <br/>

                <label>Audience</label><br />
                <input type='text' id='audience' name='audience' value={gift.audience} onChange={handleChange} /><br />
                <br/>

                <label>Submitted By</label><br />
                <input type='text' id='submittedBy' name='submittedBy' value={gift.submittedBy} onChange={handleChange} /><br />
                <br/>

                <input type='submit' value='Submit' onClick={createGift} />
            </form>
        </div>
    )
}

export default CreateGift
