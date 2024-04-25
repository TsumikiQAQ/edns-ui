// 使用import语句导入ABI
import contractABI from '../Auth.abi.json';

// ethers.js库的引入
import { ethers } from 'ethers';

// MetaMask请求用户授权并调用合约函数的逻辑
async function init() {
  // 检查是否安装了MetaMask
  if (typeof window.ethereum !== 'undefined') {
    try {
      // 请求用户授权连接MetaMask
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // 使用MetaMask提供的provider创建ethers的Provider实例
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // 获取签名者（用户的MetaMask账户）
      const signer = provider.getSigner();
      
      // 创建合约实例
      const contractAddress = '0xBFA037A98535c4501C82FDFA2b7F3eF89baf3e78'; // 替换为你的合约地址
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      
      // 获取用户地址
      const address = await signer.getAddress();
      
      // 从合约获取当前nonce
      const nonce = await contract.nonces(address);
      console.log('Nonce:', nonce.toString());

      // 构造要签名的消息
      const message = ethers.utils.solidityKeccak256(["address", "uint256"], [address, nonce]);
      const ethSignedMessage = ethers.utils.arrayify(message);

      // 请求用户签名
      const signature = await signer.signMessage(ethSignedMessage);
      console.log('Signature:', signature);

      // 调用合约的login函数，传入nonce和签名
      const txResponse = await contract.login(nonce, signature);
      console.log('Transaction response:', txResponse);

      // 等待交易被挖矿确认
      const txReceipt = await txResponse.wait();
      console.log('Transaction receipt:', txReceipt);

      // 登录事件监听（可选）
      contract.on("Login", (sender, nonce) => {
        console.log(`Login event. Sender: ${sender}, Nonce: ${nonce}`);
      });

    } catch (error) {
      console.error('An error occurred:', error);
    }
  } else {
    console.log('MetaMask is not installed!');
  }
}

// 在页面加载完成后初始化
window.addEventListener('load', init);
