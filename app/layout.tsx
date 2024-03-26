import type { Metadata } from 'next'
import { Providers } from './providers'
import { fonts } from './fonts'
import { Nav, Footer } from '@/components/common'

export const metadata: Metadata = {
	title: 'Quai Token Deployer',
	description: 'A simple interface built to deploy NFT and Tokens on Quai Network.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			className={`${fonts.robotoMono.variable} ${fonts.rubik.variable}`}
		>
			<body>
				<Providers>
					<Nav />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
