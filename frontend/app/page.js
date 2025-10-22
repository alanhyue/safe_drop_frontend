"use client"
import Image from "next/image"
import "./page.css"
import Button from "@/components/button";

export default function HomePage() {
    return (
        <div className="home-container min-h-screen bg-gray-50">
            {/*- 山景背景 */}
            <section className="banner relative bg-gradient-to-br from-blue-400 via-cyan-400 to-blue-500 text-white overflow-hidden">
                <div className="banner-bg absolute inset-0 opacity-30">
                    <Image src="/image/BKGimage.jpg" alt="Mountain background" fill className="banner-bg-image" priority />
                </div>

                <div className="banner-content relative max-w-6xl mx-auto px-6 py-16 text-center">
                    <div className="banner-buttons flex justify-center gap-4 mb-8">
                        <Button size="large" className="btn-guide">
                            查看步骤说明
                        </Button>
                    </div>

                    <h1 className="banner-title text-5xl md:text-6xl font-bold mb-4 text-balance">无痕传输 就用安放</h1>

                    <p className="banner-description text-lg md:text-xl opacity-95 max-w-3xl mx-auto">
                        最安全可靠的文件传输方式，支持所有文件格式，pdf, excel, text, word, script......
                    </p>
                </div>
            </section>

            {/* 功能1: 隐秘文件传输 */}
            <section className="feature-section max-w-6xl mx-auto px-6 py-16">
                <div className="feature-card feature-card-1 shadow-lg" >
                    <div className="feature-content-1">
                        <div className="feature-text-1">
                            <div className="feature-header">
                                <h3 className="feature-title">隐秘文件传输</h3>
                                <Image src="/image/plane.png" width={60} height={60} alt="传输图标" className="feature-icon" />
                            </div>
                            <p className="feature-description">
                                不想让人知道自己发送了文件？使用安放，只需给自己发送一张宠物图片或者哲理图片，如此平凡的举动没有人会注意，只有你知道其中存放了文件。
                            </p>
                        </div>

                        <div className="feature-image-container-1">
                            <Image src="/image/dog.png" width={1200} height={500} alt="隐秘传输示例" className="feature-image-1" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 功能2: 加密 & 阅后即焚 */}
            <section className="feature-section max-w-6xl mx-auto px-6 py-8">
                <div className="feature-card feature-card-2 shadow-lg" bordered={false}>
                    <div className="feature-content-2">
                        {/* 左侧功能: RSA+AES加密 */}
                        <div className="feature-item-2">
                            <div className="feature-image-box-2">
                                <Image src="/image/account.png" width={250} height={250} alt="加密示例" className="feature-image-2" />
                            </div>
                            <div className="feature-text-2">
                                <h3 className="feature-title-2">RSA + AES混合加密</h3>
                                <p className="feature-description-2">
                                    所有数据采用<span className="highlight-text">RSA</span>和<span className="highlight-text">AES</span>
                                    双重加密，无权限的用户只能看到图片，只有你能看到其中的文件。
                                </p>
                            </div>
                        </div>

                        {/* 垂直分隔线 */}
                        <div className="feature-divider"></div>

                        {/* 右侧功能: 阅后即焚 */}
                        <div className="feature-item-2">
                            <div className="feature-text-2">
                                <h3 className="feature-title-2">阅后即焚，为安全加码</h3>
                                <p className="feature-description-2">
                                    对于敏感数据，文件提取后可设置阅后即焚，你的数据从不保存服务器中。
                                </p>
                            </div>
                            <div className="feature-image-box-2">
                                <Image src="/image/cloud.png" width={250} height={250} alt="阅后即焚示例" className="feature-image-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 功能3: 离线处理 */}
            <section className="feature-section max-w-6xl mx-auto px-6 py-16 pb-24">
                <div className="feature-card feature-card-3 shadow-lg" bordered={false}>
                    <div className="feature-content-3">
                        <div className="feature-text-3">
                            <h3 className="feature-title-3">离线处理，无需上传</h3>
                            <p className="feature-description-3">
                                在受监控的环境中，用我们的<span className="python-text">Python</span>
                                包在本地进行文件存储，无需任何网络交互。
                            </p>
                        </div>

                        <div className="feature-image-container-3">
                            <Image src="/image/scan.png" width={1000} height={600} alt="离线处理示例" className="feature-image-3" />
                            <Image src="/image/safe.png" width={150} height={150} alt="安全图标" className="feature-icon-3" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}