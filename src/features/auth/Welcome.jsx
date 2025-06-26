import { useState, useEffect } from 'react'
import { FileText, Plus, Users, UserPlus, Clock, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';

const Welcome = () => {
    useTitle("Welcome: John-Tech-Repairs")
     const { username, isManager, isAdmin } = useAuth()
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const today = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
        timeStyle: 'long',
    }).format(currentTime)

    const content = (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-50 to-purple-50">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] bg-[length:24px_24px]" />
            
            <div className="relative min-h-screen flex flex-col items-center justify-center px-2 py-12">
                {/* Welcome Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/20 mb-6">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <p className="text-sm text-gray-600 font-medium">{today}</p>
                    </div>
                    
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Welcome!
                        </h1>
                    </div>
                    
                    <p className="text-gray-600 text-lg max-w-md mx-auto">
                        Manage your technical notes and user settings with ease
                    </p>
                </div>

                {/* Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                    {/* TechNotes Section */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Technical Notes</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <Link
                                to="/dash/notes"
                                className="flex items-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
                            >
                                <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">View TechNotes</span>
                            </Link>
                            
                            <Link
                                to="/dash/notes/new"
                                className="flex items-center gap-3 w-full bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-4 rounded-xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-200 group"
                            >
                                <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">Add New TechNote</span>
                            </Link>
                        </div>
                    </div>

                    {/* Users Section */}
                    { (isManager || isAdmin) && <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all  duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                                <Users className="w-5 h-5 text-gray-600" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <Link
                                to="/dash/users"
                                className="flex items-center gap-3 w-full bg-gray-700 hover:bg-gray-800 text-white px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group"
                            >
                                <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">View User Settings</span>
                            </Link>
                            
                            <Link
                                to="/dash/users/new"
                                className="flex items-center gap-3 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 group"
                            >
                                <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">Add New User</span>
                            </Link>
                        </div>
                    </div>}
                    
                </div>

                {/* Quick Stats or Additional Info */}
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                        <FileText className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700">Notes</p>
                        <p className="text-xs text-gray-500">Manage</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                        <Users className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700">Users</p>
                        <p className="text-xs text-gray-500">Control</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                        <Plus className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700">Create</p>
                        <p className="text-xs text-gray-500">Add New</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                        <Sparkles className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700">Dashboard</p>
                        <p className="text-xs text-gray-500">Overview</p>
                    </div>
                </div>
            </div>
        </div>
    )

    return content
}

export default Welcome