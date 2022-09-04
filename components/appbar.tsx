import Link from 'next/link'
import { useRouter } from 'next/router'

const links = [{ label: 'Story', href: '/story' }]

const Appbar = () => {
	const router = useRouter()

	return (
		<div className='fixed top-0 left-0 z-20 w-full bg-zinc-900 pt-safe'>
			<header className='border-b bg-zinc-100 px-safe dark:border-zinc-800 dark:bg-zinc-900'>
				<div className='flex items-center justify-between h-20 max-w-screen-md px-6 mx-auto'>
					<Link href='/'>
						<a>
							<h1 className='font-medium'>Eco Riders</h1>
						</a>
					</Link>

					<nav className='flex items-center space-x-6'>
						<div className='hidden sm:block'>
							<div className='flex items-center space-x-6'>
								{links.map(({ label, href }) => (
									<Link key={label} href={href}>
										<a
											className={`text-sm ${
												router.pathname === href
													? 'text-indigo-500 dark:text-indigo-400'
													: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
											}`}
										>
											{label}
										</a>
									</Link>
								))}
							</div>
						</div>

						<div
							title='what a rider'
							className='w-10 h-10 bg-center bg-cover rounded-full shadow-inner bg-zinc-200 dark:bg-zinc-800'
							style={{
								backgroundImage:
									'url(https://api.toyflish.com/media/W1siZiIsIjIwMTcvMDMvMTQvN2cwMDl4enVobF9rYWlfYW1fY29tcHV0ZXIuanBnIl0sWyJwIiwidGh1bWIiLCI2MDB4Il0sWyJwIiwiZW5jb2RlIiwianBnIiwiLXF1YWxpdHkgNzAiXV0/kai-am-computer.jpg)',
							}}
						/>
					</nav>
				</div>
			</header>
		</div>
	)
}

export default Appbar
