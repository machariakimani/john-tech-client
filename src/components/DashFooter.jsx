import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const DashFooter = () => {
    const {username, status} = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()
    
    const onGoHomeClicked = () => navigate('/dash')

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition duration-200"
                title="Home"
                onClick={onGoHomeClicked}
            >
                Home
            </button>
        )
    }

    return (
        <footer className="w-full bg-gray-300 border-t border-gray-300 py-4 px-6 flex justify-between items-center text-sm text-gray-700">
            {goHomeButton}
            <div className="flex flex-col items-end">
                <p className="font-medium">Current User: {username} </p>
                <p className="text-green-600">Status: {status} </p>
            </div>
        </footer>
    )
}

export default DashFooter
