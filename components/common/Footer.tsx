import { Flex, HStack } from '@chakra-ui/react';
import { Button } from '@/components/ui';

const FooterContent = [
	{
		title: 'Documentation',
		link: 'https://qu.ai/docs/',
	},
	{
		title: 'Github',
		link: 'https://github.com',
	},
];

const Footer = () => {
	return (
		<Flex
			w='100%'
			p='15px'
			maxW='100%'
			position='fixed'
			left='0'
			bottom='0'
			maxH='60px'
			bg='#F2F2F2'
			justifyContent='center'
			borderTop='1px solid black'
		>
			<HStack gap='40px'>
				{FooterContent.map((item, key) => (
					<Button
						key={key}
						variant='link'
						size='md'
						href={item.link}
						newTab={true}
					>
						{item.title}
					</Button>
				))}
			</HStack>
		</Flex>
	);
};

export default Footer;
