import { NavLink } from '@remix-run/react';

import './Navbar.css';

export default function NavBar() {
	
	const links = [
		{ name: 'Home' , href: '/' },
		{ name: 'Page 1', href: '/page1' },
		{ name: 'Page 2', href: '/page2' },
	]
	
	return (
		<div className='nav-bar'>
			<div className="inner-container">
				<div className='left'>
					{ links.map( (link) => 
						<MyNavItem text={link.name} href={link.href} key={link.name}/>
					)}
				</div>
				<div className="right">
					<MyNavItem text="Login" href="/login" />
				</div>
			</div>
			
			
		</div>
	)
}
function MyNavItem( { text , href } : { text:string , href:string } ){
	return(
		<NavLink 
			to={href} 
			className={({ isActive, isPending }) =>
				'nav-link' + (isActive ? ' active' : ' inactive')
			}
			>
			{text}
		</NavLink>	
	);
}