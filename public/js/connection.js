import { ethers } from './ethers-5.1.esm.min.js'

const provider = await new ethers.providers.Web3Provider(window.ethereum, 'any')
const signer = provider.getSigner()

// check if metamask is installed
var isMetamaskInstalled = () => ethereum.isMetamaskInstalled

// check if metamask is connected
var isMetamaskConnected = () => ethereum.isConnected()

// enable metamask if its disconnected
const enableMetamask = async () => {
    await ethereum.on('connect', (chainId) => {
        console.log({ chainId })
        console.log('Metamask Connected:', ethereum.isConnected())
    })
}

// get metamask chainID
const getChainId = async () => {
    return await ethereum.request({method: 'eth_chainId'})
}

// get metamask networkId
const getNetworkId = async () => {
    return await ethereum.request({method: 'net_version'})
}

// get metamask account connected with dapp
const getAccount = async () => {
    try {
        let account = await ethereum.request({method: 'eth_accounts'})
        return account
    } catch (error) {
        console.log('Error getting account:\n', error)
        return error
    }
}

// request metamask to connect with account
const connectToAccount = async () => {
    try {
        let account = await ethereum.request({method: 'eth_requestAccounts'})
        return account
    } catch (error) {
        console.log('Error connecting to metamask account:\n',error)
        return error
    }
}

const getBalance = async () => {
    try {
        let account = await getAccount()
        if (account.length === 0) {
            return 'Connect to account first!'
        }
    
        let balance = await signer.getBalance()
        return ethers.utils.formatEther(balance) + ' ETH'
    } catch (error) {
        console.log('Error getting balance:\n',error)
        return error
    }
}

export default {
    signer,
    isMetamaskInstalled,
    isMetamaskConnected,
    enableMetamask,
    getChainId,
    getNetworkId,
    getAccount,
    connectToAccount,
    getBalance
}