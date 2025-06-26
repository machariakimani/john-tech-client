import { useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'
import { 
    Plus, 
    FileText, 
    Users, 
    LogOut, 
    Loader2,
    StickyNote
} from 'lucide-react'
import Logo from "../assets/logo.jpg"

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
    const { isManager, isAdmin } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/login')
    }, [isSuccess, navigate])

    const onNewNoteClicked = () => navigate('/dash/notes/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onNotesClicked = () => navigate('/dash/notes')
    const onUsersClicked = () => navigate('/dash/users')


    // Determine if we're on a main dashboard page for responsive sizing
    const isMainDashPage = DASH_REGEX.test(pathname) || NOTES_REGEX.test(pathname) || USERS_REGEX.test(pathname)

    let newNoteButton = null
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <button
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm"
                title="New Note"
                onClick={onNewNoteClicked}
            >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Note</span>
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium shadow-sm"
                title="New User"
                onClick={onNewUserClicked}
            >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New User</span>
            </button>
        )
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="inline-flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <Users className="w-5 h-5" />
                    <span className="hidden md:inline">Users</span>
                </button>
            )
        }
    }

    let notesButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notesButton = (
            <button
                className="inline-flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 font-medium"
                title="Notes"
                onClick={onNotesClicked}
            >
                <FileText className="w-5 h-5" />
                <span className="hidden md:inline">Notes</span>
            </button>
        )
    }

    const logoutButton = (
        <button
            className="inline-flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium"
            title="Logout"
            onClick={sendLogout}
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                <LogOut className="w-5 h-5" />
            )}
            <span className="hidden md:inline">
                {isLoading ? 'Logging out...' : 'Logout'}
            </span>
        </button>
    )

    let buttonContent
    if (isLoading) {
        buttonContent = (
            <div className="flex items-center gap-2 text-gray-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="hidden sm:inline">Logging Out...</span>
            </div>
        )
    } else {
        buttonContent = (
            <div className="flex items-center gap-2">
                {newNoteButton}
                {newUserButton}
                {notesButton}
                {userButton}
                {logoutButton}
            </div>
        )
    }

    const content = (
        <div className="w-full">
            {/* Error Message */}
            {isError && error?.data?.message && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 mx-4 mt-4">
                    <p className="text-sm font-medium">{error.data.message}</p>
                </div>
            )}

            {/* Header */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${
                    isMainDashPage ? 'max-w-7xl' : 'max-w-4xl'
                }`}>
                    <div className="flex justify-between items-center h-16">
                        {/* Logo/Title */}
                        <Link 
                            to="/dash"
                            className="flex items-center gap-2 group"
                        >
                            <div className="p-1  bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors duration-200">
                                <img className='h-10' src={Logo} />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                               John-Tech
                            </h1>
                        </Link>

                        {/* Navigation */}
                        <nav className="flex items-center">
                            {buttonContent}
                        </nav>
                    </div>
                </div>
            </header>
        </div>
    )

    return content
}

export default DashHeader