import { MapPin, Phone, User, ArrowRight, Camera } from 'lucide-react'
import {Link} from "react-router-dom"

const Public = () => {
    

    const content = (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Header */}
                    <header className="mb-8">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                            Welcome to{' '}
                            <span className="text-blue-600 block md:inline">
                                Dan D. Repairs!
                            </span>
                        </h1>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </header>

                    {/* Main Content */}
                    <main className="grid md:grid-cols-2 gap-8 items-center mb-12">
                        {/* Left Side - Content */}
                        <div className="space-y-6 text-left">
                            <p className="text-xl text-gray-700 leading-relaxed">
                                Located in Beautiful Downtown Foo City, Dan D. Repairs provides a trained staff ready to meet your tech repair needs.
                            </p>

                            {/* Contact Information */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                                
                                <address className="not-italic space-y-3">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <div className="text-gray-700">
                                            <p className="font-medium">Dan D. Repairs</p>
                                            <p>555 Foo Drive</p>
                                            <p>Foo City, CA 12345</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                        <a 
                                            href="tel:+15555555555" 
                                            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                        >
                                            (555) 555-5555
                                        </a>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <User className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                        <p className="text-gray-700">
                                            <span className="font-medium">Owner:</span> Dan Davidson
                                        </p>
                                    </div>
                                </address>
                            </div>
                        </div>

                        {/* Right Side - Photo Placeholder */}
                        <div className="order-first md:order-last">
                            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 h-80 flex flex-col items-center justify-center text-gray-400 hover:shadow-xl transition-shadow duration-300">
                                <Camera className="w-16 h-16 mb-4 text-gray-300" />
                                <p className="text-center text-gray-500">
                                    <span className="block font-medium mb-1">Photo Placeholder</span>
                                    <span className="text-sm">Replace with shop or team photo</span>
                                </p>
                                <div className="mt-4 text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                                    Recommended: 400x320px
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Call to Action */}
                    <footer className="text-center">
                        <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
                            <Link
    to="/login"
    className="group inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 font-medium"
>
    Employee Login
    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
</Link>
                            <p className="text-sm text-gray-600">
                                Staff members can access the repair management system
                            </p>
                        </div>
                    </footer>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-gray-200 py-8">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <p className="text-gray-600 text-sm">
                        © 2025 Dan D. Repairs. All rights reserved.
                    </p>
                </div>
            </div>
        </section>
    )
    
    return content
}

export default Public