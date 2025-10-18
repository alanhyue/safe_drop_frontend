"use client";
import React, { useState, useEffect, } from 'react';
import './HomePage.css';
import logoImg from './images/icons/logo.png';
import { Modal, Button, Input, Checkbox } from 'antd';
import { LoginModalContent } from './login';

export default function HomePage() {
  const [hasToken, setHasToken] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setHasToken(!!token);
  }, []);
  // 登录弹窗开
  const showModal = () => {
    setIsModalOpen(true);
  };
  // 登录弹窗关
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="home-container">
      {/* 顶部导航栏 */}
      <header className="header">
        <div className="header-logo">
          <img src={logoImg} alt="SafeDrop Logo" className="logo-img" />
        </div>
        <nav className="header-nav">
          <a href="#" className="nav-link active">主页</a>
          <a href="#" className="nav-link">开始新传输</a>
          <a href="#" className="nav-link">接收文件</a>
          <a href="#" className="nav-link">传输记录</a>
        </nav>
        {hasToken ? (
          <div className="user-info">
            <img
              src={defaultAvatar}
              alt="用户头像"
              className="user-avatar"
            />
            <span className="user-name">{userName}</span>
          </div>
        ) : (
          <button onClick={showModal} className="header-btn">登录/注册/我的账号</button>
        )}
        <Modal
          open={isModalOpen}       // 控制弹窗显示/隐藏
          onCancel={handleCancel}  // 点击关闭按钮或遮罩层时关闭弹窗
          closable={true}          // 显示右上角关闭按钮
          maskClosable={true}      // 点击遮罩层可关闭弹窗
          title={null}             // 隐藏默认标题
          footer={null}            // 隐藏默认底部按钮
          width={400}              // 弹窗宽度，根据需求调整
        >
          {/* 引入登录弹窗内容 */}
          <LoginModalContent />
        </Modal>
      </header>

      {/* 步骤说明区域 */}
      <section className="steps-section">
        <h1 className="section-title"><span className="brand-name">SafeDrop</span><span className='section-title-text'>最安全私密的文件传输</span></h1>
        <div className="steps-container">
          <div className="steps-list">
            <p className='step-list-title'>步骤</p>
            <div className="step-item">
              <span className="step-num">①</span>
              <p>选择或拖拽用于存储文件的图片</p>
            </div>
            <img className='step-icon' src="#" alt="Step 1" />

            <div className="step-item">
              <span className="step-num">②</span>
              <p>在文件所在磁盘上运行Python脚本，将文件数据嵌入图片中</p>
            </div>
            <img className='strp-icon' src="#" alt="Step 2" />

            <div className="step-item">
              <span className="step-num">③</span>
              <p>传输图片，接收方文件</p>
            </div>
            <img className='step-icon' src="#" alt="Step 3" />
          </div>
          <div className="steps-preview">
            {/* 用灰色块替代预览图 */}
            <div className="color-block preview-block"></div>
          </div>
        </div>
      </section>

      {/* 开始新传输区域 */}
      {/* 开始新传输区域 */}
      <section className="transfer-section">
        <div className="transfer-header">
          {/* 用图片替代绿色块（需替换为实际纸飞机图标路径） */}
          <img src="./images/icons/paper-plane.png" alt="开始新传输图标" className="transfer-icon" />
          <h2 className="transfer-title">开始新传输</h2>
        </div>
        <div className="transfer-card">
          <p className="choose-img-text">选择图片 / 粘贴图片链接</p>
          <div className="file-list">
            {/* 轮播左右箭头（需替换为实际箭头图标路径） */}
            <img src="./images/icons/left-arrow.png" alt="左箭头" className="carousel-arrow left-arrow" />
            {/* 轮播项，这里用灰色块模拟，实际可根据需求替换 */}
            <div className="carousel-item"></div>
            <div className="carousel-item"></div>
            <div className="carousel-item"></div>
            <div className="carousel-item"></div>
            <div className="carousel-item"></div>
            <div className="carousel-item"></div>
            <img src="./images/icons/right-arrow.png" alt="右箭头" className="carousel-arrow right-arrow" />
          </div>
          <p className="choose-img-text">输入图片链接</p>
          <div className="img-link-input">
            <input type="text" placeholder="输入图片链接" />
            <button className="verify-btn">验证图片可用性</button>
          </div>
          <p className="python-package-text">在文件所在电脑上，安装python package</p>
          <div className="code-block">
            <p>在文件所在电脑上，运行：</p>
            <pre>pip install......</pre>
          </div>
          <p className="python-script-text">python 程序生成新图片，保存至新设备中，用于解压出传输文件</p>
        </div>
      </section>

      {/* 接收文件区域 */}
      <section className="receive-section">
        <div className="receive-header">
          {/* 用图片替代蓝色块（需替换为实际文件加号图标路径） */}
          <img src="./images/icons/file-plus.png" alt="接收文件图标" className="receive-icon" />
          <h2 className="receive-title">接收文件</h2>
        </div>
        <div className="receive-card">
          <div className="receive-left">
            <h3>输入python 生成的图片</h3>
            <div className="drop-area">
              <div className="upload-box">
                <span className="plus-icon">+</span>
                <p>从文件上传/拖拽图片至此</p>
              </div>
            </div>
          </div>
          <div className="receive-right">
            <h3>输入密钥</h3>
            <input type="text" placeholder="五位数密钥 如：E8900" />
            <button className="get-file-btn">获取文件</button>
          </div>
        </div>
      </section>
      {/* 传输记录区域 */}
      <section className="record-section">
        <div className="receive-header">
          {/* 用图片替代蓝色块（需替换为实际文件加号图标路径） */}
          <img src="./images/icons/file-plus.png" alt="传输记录图标" className="receive-icon" />
          <h2 className="receive-title">传输记录</h2>
        </div>
        {/* 筛选和排序区域 */}
        <div className="record-filter-sort">

          <div className="filter">
            <label>筛选：</label>
            <select>
              <option>未过期</option>
              <option>已过期</option>
            </select>
          </div>
          <div className="sort">
            <label>排序：</label>
            <select>
              <option>发送时间</option>
              <option>接收时间</option>
            </select>
          </div>
          <div className="storage">
            <img src="./images/icons/storage-icon.png" alt="存储图标" className="storage-icon" />
            <span>0% 已使用</span>
          </div>
          <button className="help-btn">?</button>
        </div>

        {/* 提示栏 */}
        <div className="record-tip">
          <span>登陆账号获取所有记录</span>
          <button className="close-tip">点击登陆</button>
        </div>

        {/* 空状态区域 */}
        <div className="empty-state">
          <img src="./images/icons/empty-files-icon.png" alt="空文件图标" className="empty-icon" />
          <p>{hasToken ? '空的，啥都没有...' : '暂未登录账号...'}</p>
        </div>
      </section>

      {/* 底部信息 */}
      <footer className="footer">
        <div className="footer-contact">
          {/* 联系我们图标和文字 */}
          <div className="contact-item">
            <img src="./images/icons/contact-icon.png" alt="联系我们图标" className="contact-icon" />
            <span>联系我们</span>
          </div>
          {/* 邮箱图标和文字 */}
          <div className="contact-item">
            <img src="./images/icons/email-icon.png" alt="邮箱图标" className="contact-icon" />
            <span>safedropcontact@outlook.com</span>
          </div>
          {/* 小红书图标和文字 */}
          <div className="contact-item">
            <img src="./images/icons/xiaohongshu-icon.png" alt="小红书图标" className="contact-icon" />
            <span>25545244</span>
          </div>
          {/* 公众号图标和文字 */}
          <div className="contact-item">
            <img src="./images/icons/wechat-icon.png" alt="公众号图标" className="contact-icon" />
            <span>公众号：safedrop</span>
          </div>
        </div>
      </footer>
    </div>
  );
}