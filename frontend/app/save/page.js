import Image from "next/image";
import Banner from "@/components/banner";


export default function SavePage() {

    function image(src) {
        return <Image
            src={src}
            width={600}
            height={400}
            className="rounded-lg shadow my-4"
        />

    }
    return (
        <div className="flex flex-col w-full max-w-3xl mx-auto">
            <h1>无上传存放文件教程</h1>

            <p>很多受管控的环境不允许上传文件到外网，下面描述如何通过安装 Safedrop Python包，在本地进行文件安放。</p>

            <div className="my-6">
                <h3>概览</h3>
                <p>1. 准备一张你喜欢的 PNG 图片</p>
                <p>2. 创建一个文件夹，把你想要传输的所有文件放入该文件夹</p>
                <p>3. 使用官方 Python 包 <code>safedrop</code> 将文件存放到图片中</p>
                <p>4.将图片发送给自己</p>
            </div>

            <h3>1. 准备一张你喜欢的 PNG 图片</h3>
            {image("/tutorial/1-find-image.png")}
            <h3>2. 新建一个文件夹，把图片放进去</h3>
            {image("/tutorial/2-collect-files.png")}
            <h3>3. 在同一个文件夹下，创建一个名为“files”的子文件夹，把要传输的文件放进去</h3>
            {image("/tutorial/3 collect your files.png")}
            <h3>4. 在个示例中，我们将传输如四个文件。它们分别是Word，PPT，代码，和文本文件。</h3>
            {image("/tutorial/4 for example.png")}
            <h3>5. 运行Python并安装最新版本的 safedrop 。</h3>
            {image("/tutorial/5 install safedrop.png")}
            <h3>6. 调用 safedrop 完成存储。</h3>
            <pre>
                &gt;&gt; from safedrop import safedrop {'\n'}
                &gt;&gt; safedrop("你的用户名", r"C:\Users\safedrop\files", r"C:\Users\safedrop\image.png") {'\n'}
            </pre>
            <Banner variant="error">必须将命令中的“你的用户名”替换为你在 Safedrop 网站注册好的用户名，否则将无法提取文件。</Banner>

            <p>safedrop参数如下：</p>
            <ol>
                <li>用户名。务必正确输入你的用户名，否则无法提取文件；</li>
                <li>文件夹路径。包含所有要传输的文件；</li>
                <li>PNG 图片路径。</li>
            </ol>

            {image("/tutorial/7 python.png")}
            <h3>7. 处理完成后将在图片旁边生成 image_sd.png</h3>
            {image("/tutorial/8 generated sd image.png")}
            <h3>8. 把生成的 image_sd.png 通过邮件、微信等工具发送给自己。</h3>
            {image("/tutorial/9 send it.png")}
            <h3>9. 登陆Safedrop。</h3>
            {image("/tutorial/10 go to safedrop (1).png")}
            <h3>10. 选择你收到的 image_sd.png 图片，下载你的文件。</h3>
            {image("/tutorial/11 upload image to get files.png")}
        </div>
    )
}