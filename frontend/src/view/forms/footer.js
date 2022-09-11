import { Link } from 'react-router-dom'

export default function FooterComponent() {
    return (
        <div className='container-fluid bg-dark text-secondary'>
            <footer className=' d-flex flex-wrap justify-content-between align-items-center py-5'>
                <p className='col-md-3 mb-0 justify-content-center'>© 2022 incommun creative lab</p>

                <Link to='/' className='col-md-6 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none'>
                    
                </Link>

                <ul className='nav col-md-3 justify-content-around'>
                    <li className='nav-item'>Portfolio</li>
                    <li className='nav-item'>Serviços</li>
                    <li className='nav-item'>Packs</li>
                    <li className='nav-item'>Facebook</li>
                    <li className='nav-item'>Instagram</li>
                </ul>
            </footer>
        </div>
    )
}