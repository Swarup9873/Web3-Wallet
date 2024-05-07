document.addEventListener("DOMContentLoaded", function(){
    // In that we are going to target the element

    document.getElementById("accountList").addEventListener("click", changeAccount);

    document.getElementById("userAddress").addEventListener("click", copyAddress);

    document.getElementById("transferFund").addEventListener("click", handler);
    document.getElementById("header_network").addEventListener("click", getOpenNetwork);
    document.getElementById("network_item").addEventListener("click", getSelectedNetwork);
    document.getElementById("add_network").addEventListener("click", setNetwork);
    document.getElementById("loginAccount").addEventListener("click", loginUser);
    document.getElementById("accountCreate").addEventListener("click", createUser);
    document.getElementById("openCreate").addEventListener("click", openCreate);
    document.getElementById("sign_up").addEventListener("click", singUp);
    document.getElementById("login_up").addEventListener("click", login);
    document.getElementById("logout").addEventListener("click", logout);
    // document.getElementById("transfer_form").addEventListener("click", openTransfer);
    document.getElementById("open_Transfer").addEventListener("click", openTransfer);
    document.getElementById("goBack").addEventListener("click", goBack);
    document.getElementById("open_Import").addEventListener("click", openImport);
    document.getElementById("goBack_import").addEventListener("click", importGoBack);
    document.getElementById("open_assets").addEventListener("click", openAssets);
    document.getElementById("open_activity").addEventListener("click", openActivity);
    document.getElementById("goHomePage").addEventListener("click", goHomePage);
    document.getElementById("openAccountImport").addEventListener("click", openImportModel);
    document.getElementById("close_import_account").addEventListener("click", closeImportModel);
    document.getElementById("add_new_token").addEventListener("click", addToken);
    document.getElementById("add_New_Account").addEventListener("click", addAccount);
});

//STATE VARIABLES
// let providerURL = "https://polygon-mumbai.g.alchemy.com/v2/3csm1wTEXhtv_u0u4kx9wpKgNnV1D-n6";

let providerURL = "https://polygon-amoy.infura.io/v3/52ff9a515558441381f60dbbf37126b6";

let provider;
let privateKey;
let address;

// FUNCTION

function handler(){
    document.getElementById("transfer_center").style.display = "flex";

    const amount = document.getElementById("amount").value;
    const address = document.getElementById("address").value;

    const private_key = "f41e951b8f989ceafed799b9e9fbde749f740c54d4450423130d8c156f687427";
    const testAccount = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

    //PROVIDER
    const provider = new ethers.providers.JsonRpcProvider(providerURL);

    let wallet = new ethers.wallet(privateKey,provider); //here the privateKey is taken from global object and not from the one defined in this block function.

    //transaction object
    const tx = {
        to: address,
        value: ethers.utils.parseEther(amount),
    };

    let a = document.getElementById("link");
    a.href = "something URL";

    wallet.sendTransaction(tx).then((txObj) =>{
        console.log("txHash:", txObj.hash);

        document.getElementById("transfer_center").style.display = "none";

        const a = document.getElementById("link");

        a.href = `https://mumbai.polygonscan.com/tx/${txObj.hash}`;

        document.getElementById("link").style.display = "block";
    });
};

function checkBalance(address){
      const provider = new ethers.providers.JsonRpcProvider(providerURL);

      provider.getBalance(address).then((balance) => {
        const balanceInEth = ethers.utils.formatEther(balance);

        document.getElementById("accountBalance").innerHTML = `${balanceInEth.slice(0,15)} ETH`;
      })
};

//this will allow us to open the network component
function getOpenNetwork(){
    document.getElementById("network").style.display = "block"
};

//this will allow us to select the network which we want to connect
function getSelectedNetwork(e){
    const element = document.getElementById("selected_network");
    element.innerHTML = e.target.innerHTML;

    if(e.target.innerHTML === "Etherium Mainnet") {
        providerURL = "https://rpc.ankr.com/eth";
        document.getElementById("network").style.display = "none";
    }
    else if(e.target.innerHTML === "Polygon Mainnet") {
        providerURL = "https://rpc.ankr.com/polygon";
        document.getElementById("network").style.display = "none";
    }
    else if(e.target.innerHTML === "Polygon Mumbai") {
        providerURL = "https://rpc.ankr.com/polygon_mumbai";
        document.getElementById("network").style.display = "none";
    }
    else if(e.target.innerHTML === "Goerli test network ") {
        providerURL = "https://eth-goerli.g.alchemy.com/v2/demo";
        document.getElementById("network").style.display = "none";
    }
    else if(e.target.innerHTML === "Sapolia test network") {
        providerURL = "https://rpc.ankr.com/eth_sepolia";
        document.getElementById("network").style.display = "none";
    }

    console.log(providerURL);
};

function setNetwork(){
    document.getElementById("network").style.display = "none"
};


function loginUser(){
    document.getElementById("createAccount").style.display = "none"
    document.getElementById("loginUser").style.display = "block"
};

//changes made - LoginUser was earlier loginUser
function createUser(){
    document.getElementById("createAccount").style.display = "block";
    document.getElementById("loginUser").style.display = "none";
};

function openCreate(){
    document.getElementById("createAccount").style.display = "none"
    document.getElementById("create_popUp").style.display = "block"
};

function singUp(){
    const name = document.getElementById("sign_up_name").value;
    const email = document.getElementById("sign_up_email").value;
    const password = document.getElementById("sign_up_password").value;
    const passwordConfirm = document.getElementById("sign_up_passwordConfirm").value;

    document.getElementById("field").style.display = 'none';
    document.getElementById("center").style.display = 'block';

    const wallet = ethers.Wallet.createRandom(); // This will cerate a random etehrium account

    if(wallet.address){
        console.log(wallet);

        //API CALL
        const url = 'http://localhost:3000/api/v1/user/signup'; //endpoint for creating user in metamask
        const data = {
            name: name,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm,
            address: wallet.address,
            private_key: wallet.privateKey,
            mnemonic: wallet.mnemonic.phrase
        }

        //implementing the API CALL
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => response.json()).then((result) =>{
            document.getElementById("createdAddress").innerHTML = wallet.address;
            document.getElementById("createdPrivateKey").innerHTML = wallet.privateKey;
            document.getElementById("createdMnemonic").innerHTML = wallet.mnemonic.phrase;
            document.getElementById("center").style.display = "none";
            document.getElementById("accountData").style.display = "block";
            document.getElementById("sign_up").style.display = "none";

            //This data we are getting we need to store it in our loaclhost so as to easily verify and fetch the information and show it in metamask
            const userWallet = {
                address: wallet.address,
                private_key: wallet.privateKey,
                mnemonic: wallet.mnemonic.phrase
            };

            const jsonObj = JSON.stringify(userWallet);
            localStorage.setItem("userWallet", jsonObj);

            document.getElementById("goHomePage").style.display = "block";
            window.location.reload();
        }).catch((error)=>{
            console.log("ERROR:", error);
        });
    }
};

function login(){
    // document.getElementById("login_form").style.display = "none";
    document.getElementById("loginUser").style.display = "none";
    document.getElementById("center").style.display = "block";
    document.getElementById("home").style.display = "block";
    document.getElementById("activity").style.display = "block";

    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;

    // Validate email and password
    if (!email || !password) {
        console.log("ERROR: Email and password are required.");
        // Handle the error, e.g., display an error message to the user
        return;
    }

    //API CALL
    const url = 'http://localhost:3000/api/v1/user/login'
    const data = {
        email: email,
        password: password
    }

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store"  // Add Cache-Control header
        },
        body: JSON.stringify(data)
    })
    .then((response)=> {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((result)=>{
        
        const userWallet = {
            address: result.data.user.address,
            private_key: result.data.user.privateKey,
            mnemonic: result.data.user.mnemonic,
        };

        const jsonObj = JSON.stringify(userWallet);
        localStorage.setItem("userWallet",jsonObj);

        const truncatedAddress = userWallet.address.substring(0, 10) + "...";
        // Update user address in the div
        document.getElementById("userAddress").textContent = truncatedAddress;

        // Check and display account balance
        checkBalance(userWallet.address);

        //for loading the tokens on the home page
        loadTokens();
        loadAccounts();


        // window.location.reload();
    }).catch((error)=>{
        console.log("ERROR:",error.message);
        alert("Login failed. Please check your email and password.");
    })
};

function logout(){
    localStorage.removeItem("userWallet");
    window.location.reload();
};

function openTransfer(){
    document.getElementById("transfer_form").style.display = "block";
    document.getElementById("home").style.display = "none";
};

function goBack(){
    document.getElementById("transfer_form").style.display = "none";
    document.getElementById("home").style.display = "block";
};

function openImport(){
    // document.getElementById("open_Import").style.display = "block";
    document.getElementById("import_token").style.display = "block";
    document.getElementById("home").style.display = "none";
};

function importGoBack(){
    document.getElementById("import_token").style.display = "none";
    document.getElementById("home").style.display = "block";
};

function openActivity(){
    document.getElementById("open_activity").style.display = "block";
    document.getElementById("assets").style.display = "none";
};

function openAssets(){
    document.getElementById("import_token").style.display = "none";
    document.getElementById("home").style.display = "block";
}; // Doubtfull, might be wrong

function goHomePage(){
    document.getElementById("create_popup").style.display = "none";
    document.getElementById("home").style.display = "block";
};

function openImportModel(){
    // document.getElementById("openAccountImport").style.display = "block";
    document.getElementById("import_account").style.display = "block";
    document.getElementById("accountList").style.display = "block";
    document.getElementById("home").style.display = "none";
};

function closeImportModel(){
    document.getElementById("import_account").style.display = "none";
    document.getElementById("home").style.display = "block";
};

function addToken(){
    const address = document.getElementById("token_address").value;
    const name = document.getElementById("token_name").value;
    const symbol = document.getElementById("token_symbol").value;

    //API CALL
    const url = 'http://localhost:3000/api/v1/tokens/createtoken';
    const data = {
        address: address,
        name: name,
        symbol: symbol,
    }

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((response)=> response.json())
    .then((result)=>{
        console.log(result);
        window.location.reload();

        // Clear input fields
        document.getElementById("token_address").value = "";
        document.getElementById("token_name").value = "";
        document.getElementById("token_symbol").value = "";
    })
    .catch((error)=>{
        console.log("ERROR:",error);
    });
};


// Load tokens from the database
function loadTokens() {
    // API CALL
    const url = `http://localhost:3000/api/v1/tokens/alltoken`;

    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((response) => response.json())
    .then((response) => {
        // Check if response contains data and tokens array
        if (response && response.data && response.data.tokens && Array.isArray(response.data.tokens)) {
            displayTokens(response.data.tokens);
        } else {
            console.log("ERROR: Tokens array not found in API response");
        }
    })
    .catch((error)=>{
        console.log("ERROR:", error);
    });
}

function displayTokens(tokens) {
    // Clear existing token items
    const activityDiv = document.getElementById("activity");
    activityDiv.innerHTML = "";

    // Create and append token items for each token
    tokens.forEach(token => {
        const newTokenItem = document.createElement("div");
        newTokenItem.className = "assests_item";

        const img = document.createElement("img");
        img.src = "./assets/theblockchaincoders.png";
        img.className = "assests_item_img";
        img.alt = "activity";
        newTokenItem.appendChild(img);

        const addressSpan = document.createElement("span");
        addressSpan.textContent = token.address ? token.address.substring(0, 15) + "..." : "Address not available";
        newTokenItem.appendChild(addressSpan);

        const symbolSpan = document.createElement("span");
        symbolSpan.textContent = `${token.symbol}`;
        newTokenItem.appendChild(symbolSpan);

        activityDiv.appendChild(newTokenItem);
    });
}


function addAccount(){ 
    const privateKey = document.getElementById("add_account_private_key").value;

    const provider = new ethers.providers.JsonRpcProvider(providerURL);

    let wallet = new ethers.Wallet(privateKey,provider);

    // console.log(wallet);

    // const url = 'http://localhost:3000/api/v1/account/createAccount';
    const url = 'http://localhost:3000/api/v1/account/createaccount';

    const data = {
        privateKey: privateKey,
        address: wallet.address,
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response)=> {
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("The requested endpoint was not found.");
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((result) =>{
        console.log(result);
        // Clear input fields
        document.getElementById("add_account_private_key").value = "";
        window.location.reload();

    }).catch((error)=>{
        console.log("ERROR:", error.message);
    })
};

function loadAccounts() {
    // API CALL
    const url = `http://localhost:3000/api/v1/account/allaccount`;

    fetch(url, {
        method: "GET",
    })
    .then((response) => response.json())
    .then((response) => {
        
        if (response && response.data && response.data.accounts && Array.isArray(response.data.accounts)) {
            displayAccounts(response.data.accounts);
        } else {
            console.log("ERROR: accounts array not found in API response");
            console.log("API Response:", response);
        }
    })
    .catch((error)=>{
        console.log("ERROR:", error);
    });
}

function displayAccounts(accounts) {
    // Clear existing account items
    const accountDiv = document.getElementById("accountList");
    accountDiv.innerHTML = "";

    // Create and append account items for each account
    accounts.forEach(account => {
        const newAccount = document.createElement("div");
        newAccount.className = "lists";

        const addressSpan = document.createElement("p");
        addressSpan.textContent = account.address ? account.address.substring(0, 15) + "..." : "Address not available";
        addressSpan.setAttribute("data-address", account.address);
        addressSpan.setAttribute("data-privateKey", account.privateKey);
        // Add click event listener to change account
        
        addressSpan.addEventListener("click", changeAccount);
        
        newAccount.appendChild(addressSpan);
        accountDiv.appendChild(newAccount);
    });
}

//This function will call when someone will open the extension and we have to fetch the information. We have to fetch the information for localhost, backend and all.
function myFunction(){
    const str = localStorage.getItem("userWallet");
    const parsedObj = JSON.parse(str);

    if(parsedObj?.address){
        document.getElementById("LoginUser").style.display = "none";
        document.getElementById("home").style.display = "block";

        privateKey = parsedObj.private_key;
        address = parsedObj.address;

        checkBalance(parsedObj.address);
    }

    loadTokens();
    loadAccounts();

};

function copyAddress(){
    navigator.clipboard.writeText(address);
};


// function changeAccount(){
//     const data = document.querySelector(".accountValue");
//     const address = data.getAttribute("data-address");
//     const privateKey = data.getAttribute("data-privateKey");

//     console.log(privateKey, address);

//     const userWallet = {
//         address: address,
//         private_key: privateKey,
//         mnemonic: "Changed",
//     };

//     const jsonObj = JSON.stringify(userWallet);
//     localStorage.setItem("userWallet",jsonObj);

//     window.location.reload();
// };

function changeAccount(event) {
    const address = event.target.getAttribute("data-address");
    const privateKey = event.target.getAttribute("data-privateKey");

    // console.log(privateKey, address);

    const userWallet = {
        address: address,
        private_key: privateKey,
        mnemonic: "Changed",
    };

    const jsonObj = JSON.stringify(userWallet);
    localStorage.setItem("userWallet", jsonObj);

    const truncatedAddress = userWallet.address.substring(0, 10) + "...";
    // Update user address in the div
    document.getElementById("userAddress").textContent = truncatedAddress;

    // Check and display account balance
    checkBalance(userWallet.address);

    //window.location.reload();
}



window.onload = myFunction;
 
