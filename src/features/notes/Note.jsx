import { useGetNotesQuery } from './notesApiSlice'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

const Note = ({ noteId }) => {

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        }),
    })
    const navigate = useNavigate()

    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
        
        const handleEdit = () => navigate(`/dash/notes/${noteId}`)
        
        return (
            <tr className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                    {note.completed
                        ? <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Completed
                          </span>
                        : <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Open
                          </span>
                    }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium hidden md:table-cell">
                    {created}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium hidden lg:table-cell">
                    {updated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900 truncate max-w-xs">
                        {note.title}
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium hidden sm:table-cell">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mr-2">
                            <span className="text-white text-xs font-bold">
                                {note.username.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        {note.username}
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                        className="inline-flex items-center px-4 py-2 border border-blue-400 text-sm font-medium rounded-md text-blue-400 bg-white hover:bg-blue-50 hover:text-blue-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                        onClick={handleEdit}
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </button>
                </td>
            </tr>
        )
    } else return null
}

const memoizedNote = memo(Note)

export default memoizedNote