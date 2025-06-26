import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-300 text-gray-900">
            <main className="flex-1 container mx-auto px-2 py-8">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
