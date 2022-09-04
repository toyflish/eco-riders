import Head from 'next/head'

const Meta = () => (
	<Head>
		<title>Eco Riders</title>
		<meta charSet='utf-8' />
		<meta name='mobile-web-app-capable' content='yes' />
		<meta name='apple-mobile-web-app-capable' content='yes' />
		<meta
			name='apple-mobile-web-app-status-bar-style'
			content='black-translucent'
		/>
		<meta name='apple-mobile-web-app-title' content='Eco Riders' />
		<meta name='application-name' content='Eco Riders' />
		<meta name='description' content='drink your own gas' />
		<meta
			name='theme-color'
			content='#f4f4f5'
			media='(prefers-color-scheme: light)'
		/>
		<meta
			name='theme-color'
			content='#EF6D62'
			media='(prefers-color-scheme: dark)'
		/>
		<meta
			name='viewport'
			content='width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover'
		/>
		<link rel='apple-touch-icon' href='/images/icon-maskable-512.png' />
		<link rel='icon' type='image/png' href='/images/icons/icon-96x96.png' />
		<link rel='manifest' href='/manifest.json' />
	</Head>
)

export default Meta
