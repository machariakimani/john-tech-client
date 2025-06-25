import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"

const NewNoteForm = ({ users }) => {
    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ user: userId, title, text })
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const errClass = isError ? "text-red-600 bg-red-50 border border-red-200 rounded-md p-3 mb-4" : "sr-only"
    const validTitleClass = !title ? "border-red-300 focus:border-red-500 focus:ring-red-500" : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    const validTextClass = !text ? "border-red-300 focus:border-red-500 focus:ring-red-500" : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'

    const content = (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
            <p className={errClass}>{error?.data?.message}</p>

            <form className="space-y-6" onSubmit={onSaveNoteClicked}>
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-bold text-gray-900">New Note</h2>
                    <div className="flex space-x-3">
                        <button
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                canSave 
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            title="Save"
                            disabled={!canSave}
                        >
                            Save
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="title">
                            Title:
                        </label>
                        <input
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${validTitleClass}`}
                            id="title"
                            name="title"
                            type="text"
                            autoComplete="off"
                            value={title}
                            onChange={onTitleChanged}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="text">
                            Text:
                        </label>
                        <textarea
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors resize-vertical min-h-32 ${validTextClass}`}
                            id="text"
                            name="text"
                            value={text}
                            onChange={onTextChanged}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username">
                            ASSIGNED TO:
                        </label>
                        <select
                            id="username"
                            name="username"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                    </div>
                </div>
            </form>
        </div>
    )

    return content
}

export default NewNoteForm