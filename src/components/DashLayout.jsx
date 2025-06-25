import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

const DashLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-200 text-gray-800">
            <DashHeader />
            <main className="flex-1 container mx-auto px-6 py-8">
                <Outlet />
            </main>
            <DashFooter />
        </div>
    )
}

export default DashLayout
