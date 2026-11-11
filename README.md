# DSH 直播工作室

**虚拟主播与 Live2D / Virtual Streamer and Live2D**

A DeepSeek Harness (DSH) plugin for Bilibili live chat, text-to-speech replies, agent-controlled Live2D expressions and motions, and browser-source streaming.

**适用：** 直播弹幕、语音回复和 Live2D 表演。**边界：** 模型与 Cubism Core 自备；不自动点击开播。

[Agent 快速接入 / Agent quickstart](docs/agent-guide.md) · [文档索引 / llms.txt](llms.txt) · [发行版本 / Releases](https://github.com/XiaoZheBrother/dsh-live-studio/releases)

## 什么时候选这个插件？ / Choose a plugin

| 你的任务 / Task | 选择的插件 / Plugin |
| --- | --- |
| 运营 B 站账号、管理互动和创作 | [dsh-bilibili-dafeiyu](https://github.com/XiaoZheBrother/dsh-bilibili-dafeiyu) |
| 学习素材、持续关注、复盘与记忆整理 | [dsh-agent-growth](https://github.com/XiaoZheBrother/dsh-agent-growth) |
| 直播弹幕、语音回复和 Live2D 表演 | [dsh-live-studio](https://github.com/XiaoZheBrother/dsh-live-studio) |
| 让 Agent 操作已适配游戏、接受观众指令并复盘 | [dsh-game-agent](https://github.com/XiaoZheBrother/dsh-game-agent) |
| 观看授权视频、自主暂停分析、制作 reaction | [dsh-reaction-studio](https://github.com/XiaoZheBrother/dsh-reaction-studio) |

当前仓库是 **dsh-live-studio**。上表按职责选型，不表示安装一个插件就包含其他插件的能力。

## Agent 快速接入 / Quickstart

1. 阅读 [安装、兼容版本与最小配置](docs/agent-guide.md)，保持原有角色数据目录。
2. 按指南查询工具目录或只读状态，再按当前接口执行最小操作。
3. 按返回状态核实完成；任务已启动、动作已排队或凭据存在，都不等于最终成功。

指南提供真实工具名或控制入口、JSON 参数、返回示例、依赖与副作用。下文保留功能说明、截图和完整配置。

> 这个插件，大肥鱼本鱼也亲自参与制作啦！大家尽管拿去用、改成自己喜欢的样子。要是帮上忙了，给本鱼点个星星 ⭐ 呗？求求啦～ —— 大肥鱼

让你的大肥鱼 / Agent 成为能接弹幕、开口回应和控制 Live2D 表演的虚拟主播。

这是一个独立的 DSH 虚拟主播插件：接收 B 站直播弹幕、合并同一观众的问题、生成语音、内置 Live2D 舞台、输出浏览器直播画面，并记录模型消耗与礼物金额。

当前为 **0.2.0-alpha.3 开发预览**，源码已公开，尚未完成全新 DSH 启动和真实直播验收。不会替你点击开播，不包含模型素材。默认关闭。

## 直播效果

以下是此前直播搭建时保留的画面，布局可能与当前版本有所不同。Live2D 模型需要自行准备，不随插件分发。

**纯聊天场景：Live2D、海底房间与口粮账本。**

![大肥鱼纯聊天直播场景：Live2D 角色、海底背景、模型支出与礼物收入账本](docs/screenshots/chat-scene.jpg)

**直播姬中的开播前预览：接收弹幕后显示回复字幕与累计消耗。**

![直播姬开播前预览：大肥鱼回复弹幕，画面显示字幕和花费账本](docs/screenshots/bilibili-live-preview.png)

## 本地安装与配置

需要 Node.js 22.19+、Python 3.11+。在包目录创建虚拟环境：

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

真实弹幕还需要 `blivedm`，请按其上游安装说明安装到同一个环境。当前语音使用 Edge TTS，模型调用使用 DeepSeek Flash；需要联网。配置 `DEEPSEEK_API_KEY` 环境变量，或沿用自己的 DSH home 凭据文件，勿提交密钥。

在 DSH 插件配置中填写：

| 字段 | 含义 |
|---|---|
| enabled | 默认 false，准备好后手动开启 |
| home | 自己的 DSH 数据目录 |
| persona | 自己的人设 Markdown 文件绝对路径 |
| python | 上述虚拟环境的 python.exe 绝对路径 |
| port | 默认 3088，绑定本机回环地址 |
| model | 自己的 Live2D 目录，包含一个 model3.json 及其引用素材 |
| cubismCore | 本地 live2dcubismcore.min.js 的绝对路径，需自行取得许可 |
| jingyuUrl / pet | 原外部舞台配置，仅在未配置 cubismCore 时使用 |
| room | 直播间 ID；0 表示只做本地预览 |
| credential | 可选独立直播账号凭据文件，不能误用投稿账号 |
| ledger | 独立账本 SQLite 路径 |

开启后访问 `http://127.0.0.1:3088/`；直播软件浏览器素材使用 `http://127.0.0.1:3088/?view=stream&audio=direct`。画布设置 1920×1080。只保留一份播出端，避免重复语音。

## 数据与进程

配置原来的 home、persona、ledger 可保留数据，不复制或清空旧记录。由 DSH 插件进程托管，关闭 Codex 不影响独立运行的 DSH；关闭 DSH 则停止本插件。卸载/停用后，宿主关闭输入管道，子服务退出。不得同时开启原实验启动器。相同 home 与直播间有进程锁，游戏控制还有频道锁。

平台的「直播与游戏」入口读取 home/plugin-services 中的无密钥状态文件，并核对服务身份。它不会替插件启动后台任务。

## 验证边界

单元测试覆盖配置拒绝、停用行为、聊天和媒体逻辑；尚不能据此声称直播流音画质量、长时间运行和新机安装已验证。账本显示 API 用量估算和礼物标价，不等于平台结算到账。


## 安装本地开发包

在源码目录执行 `npm pack`，然后在目标 DSH 数据目录下安装生成的 tgz：

```powershell
$env:DSH_HOME = 'D:\my-agent-data'
dsh plugin --profile web add '<生成的 tgz 绝对路径>'
```

使用游戏插件时，需先把其依赖声明匹配的直播插件 tgz 安装到同一 profile。安装不会自动启用；填写插件配置后再打开 enabled。开发包不得覆盖正在运行的旧任务，请先停旧实例。开发版可从 [GitHub 源码](https://github.com/XiaoZheBrother/dsh-live-studio) 克隆后执行 `npm pack` 安装；开发预览发行包见 [Releases](https://github.com/XiaoZheBrother/dsh-live-studio/releases)。

## v0.2.0-alpha.1：共享表演组件与统一前缀

人设、只读记忆和工作台推理前缀由公共加载器读取；陪看场景与直播/写稿场景分别构建上下文，不用写稿要求强迫角色陪看时发言。

`backend/live_performance.py` 提供已支持表情/动作目录、提示信息与命令校验，允许 `keep` / `none`。`backend/live-performance.mjs` 提供 `createPerformanceController`，消费模型选出的表演计划；头部动作和手势可同时运行，手势结束执行退出动作，不按剧情或情绪自动映射表情。

这次发布的是可供渲染器复用的组件，**不自动给每一条直播弹幕添加表情，也未把所有鲸语模型统一成同一种命名**。当前神宫凉子鲸鱼娘适配由陪看渲染器实际使用；别的模型需要匹配动作与参数。组件使用自身画面时钟，不能把原片时间与导出时间混用。

离线陪看已拆为 [dsh-reaction-studio](https://github.com/XiaoZheBrother/dsh-reaction-studio)：持续观察、自主开口、暂停/回看、时间戳听觉证据与视频制作。直播用户不必安装识别模型和媒体制作依赖。两个插件都默认关闭，不迁移或清空现有记忆。

## 内置 Live2D 舞台

配置 `model` 和 `cubismCore` 即可由本插件加载模型，不需要安装或启动鲸语。模型与 Cubism Core **都不随包分发**；请从模型作者和 Live2D 官方渠道取得并遵守各自许可。配置现有文件路径即可，不要把它们复制进源码仓库。

- `/avatar` 是透明角色页面，适合浏览器素材捕捉；完整直播页自动嵌入它，并传递语音音量驱动口型。
- 主对话工具 `live2d_catalog` 列出当前模型真实存在的表情与动作；`live2d_perform` 按名称执行，`live2d_status` 查播放回执。模型未打开时只是排队，30 秒未消费则过期。
- `keep` 保持表情、`neutral` 恢复、`none` 不新启动作、`stop` 停止动作。没有按台词关键词自动切换情绪的规则。
- 只读加载 model3 引用及 Exp3、Animation 目录中的配置；HTTP 只公开这些素材，不公开目录中的其他文件。写接口保留回环地址、同源与令牌校验。
- 内置的是网页渲染、动作/表情混合、口型和捕捉能力；没有复制鲸语的桌宠、VTube Studio 客户端或整套独立工作台。

复用了 [鲸语](https://github.com/InariNGT-Ofiicial/jingyu-live2d-agent) 的 MIT 组件与渲染修正，保留上游来源与许可，详见 [NOTICE](NOTICE.md)。在现有鲸鱼娘上验证了渲染、动作回执和两秒离线导出；其他模型及长时间直播仍需实测。陪看的既有手势适配仍针对当前鲸鱼娘，不等于所有模型共享动作名称。

0.2.0-alpha.3 修复真实 DSH 宿主的 webServer 依赖声明；内置舞台请使用此版或更新版。
