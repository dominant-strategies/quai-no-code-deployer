import { Drawer, DrawerOverlay, DrawerContent, DrawerBody, VStack } from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Button } from '@/components/ui';
import { usePage } from '@/components/lib/pageProvider';
import ConnectButton from './ConnectButton';

const NavDrawer = ({ isOpen, onOpen, onClose, NavButtonContent }: any) => {
	const { activePage } = usePage();

	return (
		<>
			<Button
				onClick={onOpen}
				display={{ base: 'flex', lg: 'none' }}
				size='xs'
				variant='iconLight'
			>
				<GiHamburgerMenu size={24} />
			</Button>
			<Drawer
				onClose={onClose}
				isOpen={isOpen}
			>
				<DrawerOverlay display={{ base: 'block', lg: 'none' }} />
				<DrawerContent
					display={{ base: 'block', lg: 'none' }}
					bg='white'
				>
					<DrawerBody h='100%'>
						<VStack
							spacing='20px'
							py={5}
						>
							<ConnectButton />
							<VStack gap='5px'>
								{NavButtonContent.map((item: any, key: any) => (
									<Button
										key={key}
										variant='phantom'
										size='md'
										href={item.link}
										newTab={false}
										isActive={activePage === item.link}
									>
										{item.name}
									</Button>
								))}
							</VStack>
						</VStack>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default NavDrawer;
