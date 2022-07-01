import { Link }  from 'react-router-dom'
import LogoIncommun from '../../assets/imgs/logotipoincommun.png'

export default function NavDeCimaComponent() {
    return (
        <nav style={{height: '80px', zIndex: 10000}} className='position-relative d-flex flex-row align-items-center justify-content-between bg-dark-secondary'>
            <Link to='/' className='navbar-brand position-absolute h-100 top-0 ps-5 text-light d-flex align-items-center'>
                <img src={LogoIncommun} alt='incommun' className='h-50' />
            </Link>
        </nav>
    )
}