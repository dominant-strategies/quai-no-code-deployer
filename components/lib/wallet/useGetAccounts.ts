'use client';

import { useEffect, useContext } from 'react';
import { quais } from 'quais';

import { DispatchContext } from '@/store';
import { dispatchAccount } from '@/components/lib/utils';

// ---- get accounts ---- //
// called in background on page load, gets user accounts and provider if pelagus is connected
// sets up accountsChanged listener to handle account changes

const useGetAccounts = () => {
	const dispatch = useContext(DispatchContext);
	useEffect(() => {
		const getAccounts = async (provider: any, accounts?: Array<string> | undefined) => {
			let account;
			await provider
				.send('quai_accounts')
				.then((accounts: Array<string>) => {
					account = dispatchAccount(accounts, dispatch);
				})
				.catch((err: Error) => {
					console.log('Error getting accounts.', err);
				});
			return account;
		};

		if (!window.ethereum) {
			dispatch({ type: 'SET_WEB3_PROVIDER', payload: undefined });
			return;
		} else {
			let provider = window.ethereum;
			if (window.ethereum.providers?.length) {
				// set provider once found rather than returning
				window.ethereum.providers.find(async (p: any) => {
					if (p.isPelagus) provider = p;
				});
			}
			if (provider?.isPelagus) {
				const web3provider = new quais.providers.Web3Provider(provider);
				dispatch({ type: 'SET_WEB3_PROVIDER', payload: web3provider });
				getAccounts(web3provider);
				provider.on('accountsChanged', (accounts: Array<string> | undefined) => dispatchAccount(accounts, dispatch));
			} else {
				dispatch({ type: 'SET_WEB3_PROVIDER', payload: undefined });
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export default useGetAccounts;
