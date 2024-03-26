'use client'

import NextLink from 'next/link'
import { Button as ChakraButton, forwardRef, Link, HTMLChakraProps, ThemingProps } from '@chakra-ui/react'

export interface CustomButtonProps extends HTMLChakraProps<'button'>, ThemingProps {
	href?: string
	newTab?: boolean
	isActive?: boolean
}

const Button = forwardRef<CustomButtonProps, 'button'>((props, ref) => {
	const { children, href, newTab, disabled, isActive, ...rest } = props
	if (href && !disabled) {
		return (
			<Link
				as={NextLink}
				href={href}
				isExternal={newTab}
				ref={ref}
			>
				<ChakraButton
					isActive={isActive}
					isDisabled={disabled}
					{...rest}
				>
					{children}
				</ChakraButton>
			</Link>
		)
	}
	return (
		<ChakraButton
			ref={ref}
			isDisabled={disabled}
			isActive={isActive}
			{...rest}
		>
			{children}
		</ChakraButton>
	)
})

export default Button
