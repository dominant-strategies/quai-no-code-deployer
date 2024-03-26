import BaseLayout from '@/components/layouts/BaseLayout';
import HomeContent from './home/content';
import { Center, Text } from '@chakra-ui/react';

export default function Home() {
	return (
		<BaseLayout>
			<Center
				pt={{ base: 2, md: 20 }}
				textAlign='center'
			>
				<Text variant='display'>Quai NoCode Deployer</Text>
			</Center>
			<HomeContent />
		</BaseLayout>
	);
}
