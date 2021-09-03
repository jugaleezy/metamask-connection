// import connection.js file for metamask connection
import metamaskConfig from './connection.js'

const network = document.getElementById('networkId')
const chainId = document.getElementById('chainId')
const account = document.getElementById('accountId')
const balance = document.getElementById('balance')

const connect = document.getElementById('connectToWallet')

// check if metamask is installed in browser
if (metamaskConfig.isMetamaskInstalled) {
    console.log('Metamask is installed!')
}
else {
    alert('Install Metamask extension to connect with DApp!')
}

// check if metamask is connected with dapp 
if (metamaskConfig.isMetamaskConnected) {
    ethereum.autoRefreshOnNetworkChange = false
    network.innerHTML = await metamaskConfig.getNetworkId()
    chainId.innerHTML = await metamaskConfig.getChainId()
    await metamaskConfig.connectToAccount()
    console.log('Metamask connected:', await metamaskConfig.isMetamaskConnected())
} else {
    metamaskConfig.enableMetamask()
}

ethereum.on('accountsChanged', async (accounts) => {
    console.log('Account changed from', account)
    account.innerHTML = await metamaskConfig.getAccount()
    balance.innerHTML = await metamaskConfig.getBalance()
})

connect.addEventListener('click', async (e) => {
    e.preventDefault()

    let getAccount = await metamaskConfig.getAccount()
    if (getAccount.length < 1) {
        getAccount = await metamaskConfig.connectToAccount()
        account.innerHTML = getAccount
        balance.innerHTML = await metamaskConfig.getBalance()
    } else {
        account.innerHTML = getAccount
        balance.innerHTML = await metamaskConfig.getBalance()
    }
    console.log(getAccount)
})







