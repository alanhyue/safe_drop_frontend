"use client"; 
import React from 'react';
import { Input, Button, Checkbox } from 'antd';
import './login.css'; 

export const LoginModalContent = () => {
  return (
    <div className="login-modal-content">
      {/* 标题区域 */}
      <div className="login-header">
        <h2 className="login-title">邮箱登录/注册</h2>
      </div>

      {/* 表单内容 */}
      <div className="email-login-form">
        <Input 
          placeholder="请输入邮箱" 
          className="login-input"
          prefix={<span className="input-icon">✉️</span>}
        />
        <Input.Password 
          placeholder="请输入邮箱密码（6-20位）" 
          className="login-input"
          prefix={<span className="input-icon">🔒</span>}
        />
        <Button type="primary" block className="login-btn">
          注册并登录
        </Button>
      </div>

      <div className="login-agreement">
        <Checkbox defaultChecked>
          同意《用户服务协议》和《隐私政策》
        </Checkbox>
      </div>

      {/* 分割线 */}
      <div className="divider">
        <span className="divider-text">其他登录方式</span>
      </div>

      {/* 第三方登录（仅保留微信和QQ） */}
      <div className="third-party-login">
        <Button className="social-btn wechat-btn">
          <img
            src="https://res.wx.qq.com/mpres/zh_CN/htmledition/images/icon_wx_timeline.png"
            alt="微信登录"
            className="social-icon"
          />
          微信登录
        </Button>
        <Button className="social-btn qq-btn">
          <img
            src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/QQ互联图标.png"
            alt="QQ登录"
            className="social-icon"
          />
          QQ登录
        </Button>
      </div>
    </div>
  );
};