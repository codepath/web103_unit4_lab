import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import '../css/EditGift.css'

const EditGift = ({data}) => {

    const { id } = useParams()
    const [gift, setGift] = useState({
        id: 0,
        name: '',
        pricePoint: '',
        audience: '',
        image: '',
        description: '',
        submittedBy: '', 
        submittedOn: ''
    })

    useEffect(() => {
        const fetchGiftById = async () => {
            const response = await fetch(`/gifts/${id}`)
            const data = await response.json()
            setGift(data)
        }

        fetchGiftById()
    }, [data, id])

    const handleChange = (event) => {
        const { name, value } = event.target

        setGift((prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }
    
    const updateGift = (event) => {
        event.preventDefault()

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gift)
        }
        
        fetch(`/gifts/${id}`, options)
        window.location = '/'
    }

    const deleteGift = (event) => {
        event.preventDefault()

        const options = {
            method: 'DELETE',
        }
        
        fetch(`/gifts/${id}`, options)
        window.location = '/'
    }

    return (
        <div className='EditGift'>
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

                <label>Audience </label><br />
                <input type="text" id="audience" name="audience" value={gift.audience} onChange={handleChange}/><br />
                <br/>

                <label>Submitted By</label><br />
                <input type='text' id='submittedBy' name='submittedBy' value={gift.submittedBy} onChange={handleChange} /><br />
                <br/>

                <input className='submitButton' type='submit' value='Submit' onClick={updateGift} />
                <button className='deleteButton' onClick={deleteGift}>Delete</button>
            </form>
        </div>
    )
}

export default EditGift
