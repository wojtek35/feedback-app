import {createContext, useState, useEffect} from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdating, setIsUpdating] = useState('')
    const [feedback, setFeedback] = useState([])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    useEffect(() => {
        fetchFeedback()
    }, [])

    // Fetch feedback

    const fetchFeedback = async () => {
        const response = await fetch('http://localhost:5000/feedback?_sort=id&_order=desc')
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)
    }

    // Add feedback
    const addFeedback = async (newFeedback) => {
        const response = await fetch('http://localhost:5000/feedback', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newFeedback)
        })

        
        const data = await response.json()
        setFeedback([data, ...feedback])
    }

    // Delete feedback
    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            await fetch(`http://localhost:5000/feedback/${id}` ,{
                method: 'DELETE'
            })
            setFeedback(feedback.filter((item) => item.id !== id ))
        }
        
    }
    // Edit feedback
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true,
        })
    }

    // Update feedback item
    const updateFeedback = async (id, updItem) => {
        setIsUpdating(id)
        const response = await fetch(`http://localhost:5000/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updItem)
        })

        
        const data = await response.json()
        setIsUpdating('')
        

        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...data} : item))
        setFeedbackEdit({
            item: {},
            edit: false
        })
    }
    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        isLoading,
        isUpdating,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext