import { MapPin, Phone, User, ArrowRight, Camera } from 'lucide-react'
import {Link} from "react-router-dom"
import Tech from "../assets/tech.jpg"
import Logo from "../assets/logo.jpg"

const Public = () => {
    

    const content = (
        <section className="min-h-screen bg-gradient-to-br from-blue-100  to-gray-100">
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Header */}
                    <header className="mb-6 flex md:flex-row flex-col items-center justify-center gap-3 md:gap-20">
                <div className="p-1  bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors duration-200">
                    <img className='md:h-12 h-8' src={Logo} />
                </div>
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                            Welcome to{' '}
                            <span className="text-blue-600 block md:inline">
                                John-Tech Repairs!
                            </span>
                        </h1>
                        <div className="w-48 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </div>
                        
                    </header>

                    {/* Main Content */}
                    <main className="grid md:grid-cols-2 md:gap-20 gap-4 items-center mb-12">
                        {/* Left Side - Content */}
                        <div className="space-y-6 text-left">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Located in Juja Kenya near Jkuat Main Gate, John-Tech Repairs provides a trained staff ready to meet your tech repair needs.Dealing with Laptops, phones, desktop ,TV and all house aplliances.
                            </p>

                            {/* Contact Information */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                                
                                <address className="not-italic space-y-3">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <div className="text-gray-700">
                                            <p className="font-medium">John-Tech Repairs</p>
                                            <p>Juja, Kenya</p>
                                            <p>Opposite Jkuat Main Gate</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                        <a 
                                            href="" 
                                            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                                        >
                                            0742310701
                                        </a>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <User className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                        <p className="text-gray-700">
                                            <span className="font-medium">Owner : Jonte </span> 
                                        </p>
                                    </div>
                                </address>
                            </div>
                        </div>

                        {/* Right Side - Photo Placeholder */}
                        <div className="order-first md:order-last p-3 md:p-7 rounded-lg bg-gradient-to-br from-blue-300 via-green-300 to-yellow-200   ">
                            <img className='rounded-lg' src={Tech} />
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
                       {new Date().getFullYear()}&copy; John-Tech Repairs. All rights reserved.
                    </p>
                </div>
            </div>
        </section>
    )
    
    return content
}

export default Public