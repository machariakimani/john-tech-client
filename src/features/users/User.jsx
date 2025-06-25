import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'

const User = ({ userId }) => {

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })
    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)
        const userRolesString = user.roles.toString().replaceAll(',', ', ')
        const cellStatus = user.active ? '' : 'opacity-50'

        return (
            <tr className={`hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 ${!user.active ? 'bg-gray-50' : ''}`}>
                <td className={`px-6 py-4 whitespace-nowrap ${cellStatus}`}>
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${user.active ? 'bg-blue-400' : 'bg-gray-400'}`}>
                            <span className="text-white text-sm font-bold">
                                {user.username.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-gray-900">
                                {user.username}
                            </div>
                            <div className={`text-xs ${user.active ? 'text-green-600' : 'text-red-600'} font-medium`}>
                                {user.active ? 'Active' : 'Inactive'}
                            </div>
                        </div>
                    </div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${cellStatus}`}>
                    <div className="flex flex-wrap gap-1">
                        {user.roles.map((role, index) => (
                            <span 
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                            >
                                {role}
                            </span>
                        ))}
                    </div>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${cellStatus}`}>
                    <button
                        className="inline-flex items-center px-4 py-2 border border-blue-400 text-sm font-medium rounded-md text-blue-400 bg-white hover:bg-blue-50 hover:text-blue-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleEdit}
                        disabled={!user.active}
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

const memoizedUser = memo(User)

export default memoizedUser