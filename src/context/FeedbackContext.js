import {v4 as uuidv4} from 'uuid'
import {createContext, useState} from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: "This item is feedback item 1",
            rating: 10,
        },
        {
            id: 2,
            text: "This item is feedback item 2",
            rating: 8,
        },
        {
            id: 3,
            text: "This item is feedback item 3",
            rating: 10,
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    // Add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    // Delete feedback
    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
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
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => item.id === id ? { ...item, ...updItem} : item))
        setFeedbackEdit({
            item: {},
            edit: false
        })
    }
    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext