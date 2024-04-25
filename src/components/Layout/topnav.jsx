import { useContext, useState } from "react"
import { TopNavProps } from "../interface/layout"
import LoginForm from "../../page/User/login"
import { AiOutlineUser } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { LoginFormContext } from ".";
import { MdDns } from "react-icons/md";
import { ethers } from "ethers";
import LoginContract from "../../assets/LoginContract.json"
import { Web3Provider } from '@ethersproject/providers';

const TopNav = ({ logged }) => {
    const { HideHandle } = useContext(LoginFormContext)

    // 请求用户授权并获取用户的账户地址
    async function getAccount() {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0];
    }

    async function loginUser() {
        const provider = new Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const account = await getAccount();


        // 创建一个要签名的消息
        const message = "message";

        // 请求用户签名
        const signature = await signer.signMessage(message);
        console.log(signature);

        // 创建合约实例
        const contract = new ethers.Contract('0xbbe56866A45573B9346bBFa6c8868a41f12EA5d6', LoginContract.abi, signer);
        console.log(account);

        try {
            const tx = await contract.loginUser(account, signature);
            await tx.wait();
            console.log('登录成功！');
        } catch (error) {
            console.log('登录失败：' + error.message);
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        loginUser()
    }

    return (
        <div className="TopNav">
            <a className="logo" href="/">
                <h3><MdDns></MdDns>E-DNS</h3>
            </a>
            <Button className="Btn-login">
                <a href="#" onClick={handleLogin}><AiOutlineUser /><strong>连接网站</strong></a>
            </Button>
        </div>
    )
}
export default TopNav