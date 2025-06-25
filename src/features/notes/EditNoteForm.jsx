import { useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const EditNoteForm = ({ note, users }) => {
    const { isManager, isAdmin } = useAuth()

    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [completed, setCompleted] = useState(note.completed)
    const [userId, setUserId] = useState(note.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await updateNote({ id: note.id, user: userId, title, text, completed })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id })
    }

    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "text-red-600 bg-red-50 border border-red-200 rounded-md p-3 mb-4" : "sr-only"
    const validTitleClass = !title ? "border-red-300 focus:border-red-500 focus:ring-red-500" : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    const validTextClass = !text ? "border-red-300 focus:border-red-500 focus:ring-red-500" : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                title="Delete"
                onClick={onDeleteNoteClicked}
            >Delete
            </button>
        )
    }

    const content = (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
            <p className={errClass}>{errContent}</p>

            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Edit Note #{note.ticket}</h2>
                    <div className="flex space-x-3">
                        <button
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                                canSave 
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            title="Save"
                            onClick={onSaveNoteClicked}
                            disabled={!canSave}
                        >
                            Save
                        </button>
                        {deleteButton}
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="note-title">
                            Title:
                        </label>
                        <input
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${validTitleClass}`}
                            id="note-title"
                            name="title"
                            type="text"
                            autoComplete="off"
                            value={title}
                            onChange={onTitleChanged}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="note-text">
                            Text:
                        </label>
                        <textarea
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors resize-vertical min-h-32 ${validTextClass}`}
                            id="note-text"
                            name="text"
                            value={text}
                            onChange={onTextChanged}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <input
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    id="note-completed"
                                    name="completed"
                                    type="checkbox"
                                    checked={completed}
                                    onChange={onCompletedChanged}
                                />
                                <label className="text-sm font-medium text-gray-700" htmlFor="note-completed">
                                    WORK COMPLETE
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="note-username">
                                    ASSIGNED TO:
                                </label>
                                <select
                                    id="note-username"
                                    name="username"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    value={userId}
                                    onChange={onUserIdChanged}
                                >
                                    {options}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-md">
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Created:</span><br />
                                    <span className="text-gray-800">{created}</span>
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-md">
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Updated:</span><br />
                                    <span className="text-gray-800">{updated}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )

    return content
}

export default EditNoteForm