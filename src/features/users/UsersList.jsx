import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
import useTitle from "../../hooks/useTitle"

const UsersList = () => {
    useTitle("Users:John-Tech-Repairs")
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } =  useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = (
        <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mr-3"></div>
            <p className="text-gray-600 font-medium">Loading...</p>
        </div>
    )

    if (isError) {
        content = (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
                <p className="text-red-700 font-medium">{error?.data?.message}</p>
            </div>
        )
    }

    if (isSuccess) {
        const { ids } = users
        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null

        content = (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden md:mx-4 my-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-400 to-blue-500 px-6 py-4">
                    <h2 className="text-xl font-bold text-white flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                        Users
                    </h2>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-200 border-b border-gray-300">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    Username
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    Roles
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tableContent}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    return content
}

export default UsersList