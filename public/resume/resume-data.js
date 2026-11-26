/* ============================================================================
   ★ 简历内容配置（修改文本请直接编辑本文件）★
   ----------------------------------------------------------------------------
   1. zh = 中文版（默认），en = English 版，结构完全一致；
   2. links = 中英文共用外链；
   3. 邮箱与手机号以 XOR + Base64 密文存储（emailCipher / phoneCipher），
      仅在点击「联系我」或打印导出 PDF 时于浏览器端解密，源码中无明文。
   ============================================================================ */

window.RESUME_DATA = {
  "links": {
    "github": "https://github.com/eJayYoung",
    "autoTranslateConverter": "https://github.com/eJayYoung/auto-translate-converter",
    "dshSight": "https://github.com/ericfetch/dsh-sight",
    "vux": "https://github.com/airyland/vux",
    "uxcore": "https://github.com/uxcore/uxcore",
    "saltUi": "https://github.com/salt-ui/saltui"
  },
  "contactKey": [
    101,
    74,
    97,
    121,
    82,
    101,
    115,
    117,
    109,
    101,
    50,
    48,
    50,
    54,
    33
  ],
  "emailCipher": "ACAAAA0cHAADAnIBBAUPBiUM",
  "phoneCipher": "TnJXWWNSQFhdVQsIHwcWVnk=",
  "zh": {
    "htmlLang": "zh-CN",
    "title": "杨逸杰 · 资深全栈开发工程师 · 个人简历",
    "metaDesc": "杨逸杰的个人简历：10 年开发经验的资深全栈开发工程师（前端 / AI 应用方向），具备多端应用、Node.js BFF、Python AI 服务与 Java 后端全栈交付能力。",
    "ui": {
      "langSwitch": "EN",
      "githubBtn": "GitHub",
      "contactBtn": "联系我",
      "contactTitle": "联系我",
      "modalHint": "为防止联系方式被爬虫抓取，点击眼睛图标可随时解密查看或重新隐藏：",
      "emailLabel": "电子邮箱",
      "phoneLabel": "联系电话",
      "showContact": "点击解密显示",
      "hideContact": "点击加密隐藏",
      "copyBtn": "复制",
      "mailBtn": "发邮件",
      "callBtn": "拨打",
      "copiedEmail": "邮箱已复制到剪贴板",
      "copiedPhone": "手机号已复制到剪贴板",
      "printBtn": "导出 PDF",
      "featuredBadge": "代表项目"
    },
    "header": {
      "name": "杨逸杰",
      "role": "资深全栈开发工程师 · 前端 / AI 应用方向",
      "tagline": "以业务约束划清系统边界，用全栈工程交付可靠 AI 应用。",
      "summary": "10 年互联网研发经验，前端出身，具备多端应用（Web / 小程序 / Flutter）、Node.js BFF 到 Python AI 服务与 Java 业务后端的全栈交付能力。擅长结合业务约束设计系统边界，划清模型生成、业务规则与人工审核的职责。保障复杂流程的可靠性、状态一致性与成本可控。善于从复杂业务与交互场景中提炼架构抽象、沉淀通用能力；重视工程质量与线上稳定性，能结合工程规范与 AI 辅助研发持续优化交付流程，兼顾迭代效率与长期可维护性。",
      "meta": [
        "10 年开发经验",
        "杭州",
        "Web / 小程序 / Flutter / AI 全栈"
      ]
    },
    "about": {
      "title": "核心优势",
      "cards": [
        {
          "icon": "layers",
          "title": "多端与全栈闭环交付",
          "desc": "前端出身，贯通 Web / 小程序 / Flutter、Node.js BFF、Python AI 服务与 Java 业务后端，能独立推进复杂系统落地。"
        },
        {
          "icon": "cpu",
          "title": "AI 系统边界与防幻觉",
          "desc": "明确模型生成、业务规则与人工审核职责，在医疗问诊与 AIGC 创作中落地受控词表、RAG 提取、断点恢复与计费保护。"
        },
        {
          "icon": "zap",
          "title": "高可靠架构与稳定性",
          "desc": "落地 5+ BFF 减少前端请求 60%、首屏耗时降 30%；搭建 10+ 应用 E2E 体系使 P1 故障率同比降 50%，重构上线零故障。"
        },
        {
          "icon": "lightbulb",
          "title": "AI 研发提效与工程规范",
          "desc": "将部署、打包、DDD 基线沉淀为跨仓复用 Agent Skill，结合 Spec-Driven / OpenSpec 规格与自动化测试约束 AI 产出。"
        }
      ]
    },
    "skills": {
      "title": "技术能力",
      "groups": [
        {
          "name": "前端与多端",
          "items": [
            "TypeScript",
            "React / Vue 3",
            "微信小程序",
            "Flutter",
            "具备通用组件库与复杂交互工作台研发经验"
          ]
        },
        {
          "name": "AI 应用工程",
          "items": [
            "Agent 运行时 / Tool Calling",
            "RAG 案例选案",
            "结构化输出约束（Pydantic）",
            "多模态接入（VLM / ASR）",
            "MCP 协议与插件开发"
          ]
        },
        {
          "name": "后端与数据",
          "items": [
            "Node.js / NestJS / Koa（BFF 与全栈主力）",
            "Python / FastAPI（AI 服务）",
            "Java / Spring Boot / MyBatis（业务后端）",
            "MySQL / PostgreSQL / Redis"
          ]
        },
        {
          "name": "工程化与 AI 研发提效",
          "items": [
            "Coding Agent 与 Skill 扩展",
            "规格驱动开发（Spec-Driven / OpenSpec）",
            "E2E（CodeceptJS / BDD）/ CI/CD",
            "Docker",
            "Prometheus / Grafana"
          ]
        }
      ]
    },
    "projects": {
      "title": "重点项目",
      "items": [
        {
          "name": "AI 问诊｜中医智能问诊平台",
          "period": "2026.01 - 至今",
          "role": "核心全栈开发 · 合偶平方",
          "featured": true,
          "desc": "负责患者端、医生端、运营后台及 Java / Python 服务核心研发，打通信息采集、智能问诊、三步望诊、AI 处方草稿与医生审核发布链路。",
          "bullets": [
            "医疗输出约束：针对模型编造药方，病名/证型采用词表提示词与 Pydantic 结构化输出；处方经 RAG 检索案例后由代码提取药味剂量，无匹配或解析失败转医生，避免模型直接生成药方。",
            "统一问诊 Loop Harness：四种模式共用同一套工具调用循环，根据会话状态动态开放工具并校验流程出口；支付、就诊人归属由 Java 裁决，处方经医生审核后发布。",
            "AI 服务分层：会话 Agent 与导诊 / 语音转写 / 图像理解拆为两个 FastAPI 服务，各端统一经 Java API 接入，解耦业务状态与模型推理。"
          ],
          "tags": [
            "微信小程序",
            "Flutter",
            "Java / Spring Boot",
            "Python / FastAPI",
            "Agent Runtime",
            "RAG",
            "VLM / ASR"
          ]
        },
        {
          "name": "framecore｜AIGC 影视创作平台",
          "period": "2026.06 - 至今",
          "role": "全栈研发 · 合偶平方",
          "featured": false,
          "desc": "参与 React / React Flow 画布、Agent 创作工作台及 NestJS 后端研发，覆盖文、图、音、视节点生成、生成结果版本恢复与实时状态推送。",
          "bullets": [
            "Agent 编排与统一模型接入：针对创作链路长、供应商接口分散，自研多轮任务循环，任务规划与执行规范按需加载，业务工具绑定生成模型；文图音视共用统一模型接入层与分层能力校验。",
            "会话恢复与并发互斥：针对长会话中断与并发写乱状态，用 PostgreSQL 持久化会话、事件、工具调用与审批，支持暂停恢复和规划模型热切换；Redis 租约锁自动续期，失锁即中止长任务，保障会话互斥。",
            "视频任务防重：针对 Agent 视频生成中断重试，持久化 NewAPI 供应商任务 ID，恢复后继续轮询原任务；配合执行前审批与按工具调用的幂等扣费，降低重复生成与扣费风险。"
          ],
          "tags": [
            "React",
            "React Flow",
            "NestJS",
            "PostgreSQL",
            "Redis",
            "Agent Harness",
            "AIGC"
          ]
        },
        {
          "name": "dsh-sight｜Figma MCP 开源插件",
          "period": "2026.08 - 至今",
          "role": "核心开发 · 合偶平方",
          "featured": false,
          "desc": "基于 TypeScript 与 MCP SDK 开发 DSH Figma 插件，通过 Desktop 本地桥接提供设计稿转代码读取与 AI 写画布能力，不依赖 Figma REST API Token。",
          "bullets": [
            "读写双入口：针对读稿时误改画布，将 figma-read / figma-ui 拆为独立 MCP 服务，读入口白名单限制画布写操作，隔离出码与改稿职责。",
            "双引擎热切换：针对本地代码仓复用，在 figma-ui-mcp 外集成 Figwright 补齐组件、设计变量与图标映射；通过 MCP 工具列表变更通知，无重启刷新工具集。",
            "多文件写路由：针对多标签页跨文件误写，以插件与代理补丁透传文件会话标识，文件锁定工具（figma_files）锁定目标；多文件未锁定、目标失联或重名时拒绝写入。"
          ],
          "tags": [
            "TypeScript",
            "MCP SDK",
            "Figma Desktop",
            "Figwright",
            "D2C"
          ]
        }
      ]
    },
    "experience": {
      "title": "工作经历",
      "items": [
        {
          "period": "2026.01 - 至今",
          "company": "合偶平方（北京）科技有限公司",
          "role": "AI 应用全栈开发工程师",
          "bullets": [
            "全栈研发与架构设计：负责 AI 中医智能问诊、framecore 及 dsh-sight 的需求拆解、架构设计与全栈研发，明确多端客户端、业务后端与 AI 服务的职责边界，推进系统集成与核心功能研发。",
            "AI Coding 规范与工程自动化：将部署、打包、数据库同步与 DDD 开发基线沉淀为跨仓复用的 Agent Skill，结合规格驱动文档（Spec-Driven / OpenSpec）与自动化测试约束 AI 编码产出。"
          ],
          "highlights": []
        },
        {
          "period": "2021.04 - 2025.11",
          "company": "杭州友电科技有限公司",
          "role": "资深前端 / 全栈工程师",
          "bullets": [
            "BFF 与性能优化：以 Koa + TypeScript 落地 5+ BFF 应用，收敛微服务接口聚合与通用中间件，前端请求量减少 60%，首屏加载时间降低约 30%。",
            "测试与稳定性建设：搭建 CodeceptJS + BDD + GitLab CI 的 E2E 体系，覆盖 10+ 应用，P1 故障率同比降低 50%；建设 Prometheus / Grafana 监控，实现线上问题 5 分钟内响应。",
            "业务交付：负责共享储物柜项目小程序、H5 与管理后台的全栈开发与交付，稳定支撑线下商业化运营与交易闭环；主导中台合同域系统重构，梳理 100+ 核心业务流程，实现重构上线零故障。"
          ],
          "highlights": [
            "前端请求量 -60% · 首屏耗时 -30%",
            "P1 故障率同比 -50% · 5 分钟响应",
            "100+ 核心流程重构上线零故障"
          ]
        },
        {
          "period": "2018.06 - 2021.03",
          "company": "杭州铭师堂教育科技有限公司",
          "role": "前端开发工程师",
          "bullets": [
            "负责公司 OA 系统 PC 端与移动 H5 端的前端开发及功能迭代。",
            "开发表单与上传通用组件并参与 vux 开源维护，组件被多个项目复用，开发效率提升约 30%。"
          ],
          "highlights": [
            "通用组件多项目复用 · 开发效率 +30%"
          ]
        },
        {
          "period": "2016.11 - 2018.06",
          "company": "文思海辉技术有限公司",
          "role": "前端开发工程师",
          "bullets": [
            "参与阿里巴巴招聘、OD、CB 平台及 uxcore / salt-ui 组件库开发。",
            "开发国际化转换工具，将相关工作量从 15 人日缩减至 5 人日。"
          ],
          "highlights": [
            "国际化转换工具提效：15 → 5 人日"
          ]
        },
        {
          "period": "2016.06 - 2016.11",
          "company": "北京极欧科技有限公司",
          "role": "Web 前端工程师",
          "bullets": [
            "负责极盟自媒体广告平台前端开发与维护。"
          ],
          "highlights": []
        }
      ]
    },
    "education": {
      "title": "教育背景",
      "items": [
        {
          "period": "2008 - 2012",
          "school": "华东交通大学理工学院",
          "degree": "本科 · 电气工程及其自动化"
        }
      ]
    },
    "openSource": {
      "title": "开源与社区参与",
      "items": [
        {
          "name": "auto-translate-converter",
          "desc": "前端国际化自动转换 CLI 工具（GitHub 19 Stars）",
          "urlKey": "autoTranslateConverter"
        },
        {
          "name": "dsh-sight",
          "desc": "Figma Desktop 免 Token 读写桥接 MCP 开源插件",
          "urlKey": "dshSight"
        },
        {
          "links": [
            {
              "name": "vux",
              "urlKey": "vux"
            },
            {
              "name": "uxcore",
              "urlKey": "uxcore"
            },
            {
              "name": "salt-ui",
              "urlKey": "saltUi"
            }
          ],
          "desc": "参与开源及企业级前端组件库维护与开发"
        }
      ]
    }
  },
  "en": {
    "htmlLang": "en",
    "title": "Yijie Yang (eJay) · Senior Full-Stack Engineer · Resume",
    "metaDesc": "Resume of Yijie Yang (eJay): Senior Full-Stack Engineer with 10 years of experience in Frontend, Multi-Platform Apps, Node.js BFF, Python AI Services, and Java Backends.",
    "ui": {
      "langSwitch": "中文",
      "githubBtn": "GitHub",
      "contactBtn": "Contact",
      "contactTitle": "Contact",
      "modalHint": "To protect against scrapers, toggle the eye icon to decrypt or hide:",
      "emailLabel": "Email",
      "phoneLabel": "Phone",
      "showContact": "Decrypt & show",
      "hideContact": "Encrypt & hide",
      "copyBtn": "Copy",
      "mailBtn": "Email",
      "callBtn": "Call",
      "copiedEmail": "Email copied to clipboard",
      "copiedPhone": "Phone copied to clipboard",
      "printBtn": "Export PDF",
      "featuredBadge": "Featured"
    },
    "header": {
      "name": "Yijie Yang",
      "role": "Senior Full-Stack Engineer · Frontend & AI Applications",
      "tagline": "Defining clear system boundaries to ship reliable, full-stack AI applications.",
      "summary": "10 years of software engineering experience rooted in frontend, spanning multi-platform apps (Web / WeChat Mini Program / Flutter), Node.js BFF, Python AI services, and Java backends. Currently focused on full-stack AI engineering—delineating model generation, business rules, and human review to ensure workflow reliability, state consistency, and cost control while driving delivery efficiency with engineering standards and AI-assisted development.",
      "meta": [
        "10 Years Experience",
        "Hangzhou, China",
        "Web / Mini Program / Flutter / AI Full-Stack"
      ]
    },
    "about": {
      "title": "Core Strengths",
      "cards": [
        {
          "icon": "layers",
          "title": "End-to-End Full-Stack Delivery",
          "desc": "Frontend-grounded full-stack delivery across Web, Mini Programs, Flutter, Node.js BFF, Python AI services, and Java backends."
        },
        {
          "icon": "cpu",
          "title": "AI Boundaries & Guardrails",
          "desc": "Separates model output, deterministic rules, and human review—shipping controlled vocabularies, RAG extraction, session recovery, and billing protection."
        },
        {
          "icon": "zap",
          "title": "Performance & Reliability",
          "desc": "Built 5+ BFFs cutting client requests by 60% and FCP by 30%; established 10+ app E2E suites reducing P1 incidents by 50% YoY."
        },
        {
          "icon": "lightbulb",
          "title": "AI Engineering Automation",
          "desc": "Codified deployment, packaging, and DDD baselines into reusable Agent Skills paired with Spec-Driven / OpenSpec workflows and automated tests."
        }
      ]
    },
    "skills": {
      "title": "Technical Skills",
      "groups": [
        {
          "name": "Frontend & Multi-Platform",
          "items": [
            "TypeScript",
            "React",
            "Vue 3",
            "React Flow",
            "WeChat Mini Program",
            "Flutter",
            "UI Component Libraries",
            "Canvas Workbenches"
          ]
        },
        {
          "name": "AI Application Engineering",
          "items": [
            "Agent Runtime / Tool Calling",
            "RAG & Anti-Hallucination",
            "Pydantic Structured Output",
            "VLM / ASR Multimodal",
            "MCP Protocol & Plugins"
          ]
        },
        {
          "name": "Backend & Data",
          "items": [
            "Node.js",
            "NestJS",
            "Koa (BFF)",
            "Python / FastAPI",
            "Java / Spring Boot",
            "MyBatis",
            "MySQL",
            "PostgreSQL",
            "Redis"
          ]
        },
        {
          "name": "DevOps & AI Tooling",
          "items": [
            "Coding Agent / Skills",
            "Spec-Driven / OpenSpec",
            "CodeceptJS / BDD",
            "GitLab CI/CD",
            "Docker",
            "Prometheus / Grafana"
          ]
        }
      ]
    },
    "projects": {
      "title": "Featured Projects",
      "items": [
        {
          "name": "AI TCM Consultation Platform",
          "period": "Jan 2026 - Present",
          "role": "Full-Stack Lead · Heou Pingfang",
          "featured": true,
          "desc": "Led full-stack development across the patient Mini Program, doctor Flutter App, ops console, Java backend, and Python AI services, connecting intake, AI consultation, tongue/face inspection, prescription drafting, and doctor review.",
          "bullets": [
            "Medical anti-hallucination guardrails: Restricted diagnosis and syndrome differentiation to controlled vocabularies with schema validation; matched clinical cases via RAG where the LLM only selects cases while code extracts herbs and dosages verbatim—falling back to physicians on no match.",
            "Multi-mode Agent orchestration: Unified four consultation modes into a model-driven Agent runtime that dynamically exposes tools by session state; enforced identity/payment checks on the backend and delegated prescription signing to licensed doctors.",
            "Decoupled multi-client AI services: Encapsulated triage recommendations, ASR transcription, and VLM inspection image checks in standalone FastAPI services orchestrated by the Java backend, eliminating duplicated client integrations."
          ],
          "tags": [
            "Mini Program",
            "Flutter",
            "Java / Spring Boot",
            "Python / FastAPI",
            "Agent Runtime",
            "RAG",
            "VLM / ASR"
          ]
        },
        {
          "name": "framecore｜AIGC Video Creation Platform",
          "period": "Jan 2026 - Present",
          "role": "Full-Stack Engineer · Heou Pingfang",
          "featured": false,
          "desc": "Built the React / React Flow infinite canvas, Agent creation workbench, and NestJS backend covering ideation, scripting, storyboarding, and audio/video generation with real-time collaboration, workflow publishing, and asset versioning.",
          "bullets": [
            "Agent orchestration & unified model layer: Loaded Roadmap Skills on demand via a Harness loop and bound Task Skills and models to business tools; unified text/image/audio/video generation and capability validation for both canvas and Agent.",
            "Session recovery & concurrency control: Persisted messages and tool outputs in PostgreSQL for checkpoint reconstruction and mid-session model switching; guarded sessions with Redis locks and lease renewal, aborting on lock loss.",
            "Long-running job & billing protection: Persisted vendor video job IDs to resume polling after failures; paired high-cost approvals with idempotent per-tool billing to prevent duplicate generation and charges on retries."
          ],
          "tags": [
            "React",
            "React Flow",
            "NestJS",
            "PostgreSQL",
            "Redis",
            "Agent Harness",
            "AIGC"
          ]
        },
        {
          "name": "dsh-sight｜Open-Source Figma MCP Plugin",
          "period": "Jan 2026 - Present",
          "role": "Core Developer · Heou Pingfang",
          "featured": false,
          "desc": "Bridged Coding Agents (DeepSeek Harness and compatible MCP clients) with Figma Desktop using TypeScript and the MCP SDK for token-free canvas reading and writing in D2C and AI-driven design workflows.",
          "bullets": [
            "Token-free bridge & read/write isolation: Connected directly to Figma Desktop via a local plugin bridge, bypassing REST API tokens and rate limits; split read and write into separate MCP proxy endpoints with a strict read-only allowlist.",
            "Dual-engine selection & hot reload: Used figma-ui-mcp for AI canvas writes and integrated Figwright to map local repo components and design tokens for D2C codegen, supporting live updates via tools/list_changed.",
            "Deterministic multi-file routing: Patched plugin-side file-level sessionId reporting and proxy pass-through to prevent cross-file overwrites on shared queues; supported target file locking and fail-fast rejection on disconnects or ambiguity."
          ],
          "tags": [
            "TypeScript",
            "MCP SDK",
            "Figma Desktop",
            "Figwright",
            "D2C"
          ]
        }
      ]
    },
    "experience": {
      "title": "Work Experience",
      "items": [
        {
          "period": "Jan 2026 - Present",
          "company": "Heou Pingfang (Beijing) Technology Co., Ltd.",
          "role": "AI Application Full-Stack Engineer",
          "bullets": [
            "Full-stack architecture & delivery: Owned requirement breakdown, architecture, and implementation for AI TCM Consultation, framecore, and dsh-sight, defining clear boundaries across clients, business backends, and AI services.",
            "AI Coding standards & automation: Captured deployment, packaging, DB sync, and DDD baselines as cross-repo Agent Skills paired with Spec-Driven / OpenSpec docs and automated tests to constrain AI code generation."
          ],
          "highlights": []
        },
        {
          "period": "Apr 2021 - Nov 2025",
          "company": "Hangzhou Youdian Technology Co., Ltd.",
          "role": "Senior Frontend / Full-Stack Engineer",
          "bullets": [
            "BFF & performance optimization: Delivered 5+ Koa + TypeScript BFF services unifying microservice aggregation and middleware, cutting frontend requests by 60% and first-screen load time by ~30%.",
            "Testing & reliability: Built a CodeceptJS + BDD + GitLab CI E2E suite covering 10+ apps, reducing P1 incident rate by 50% YoY; deployed Prometheus / Grafana monitoring for <5-minute incident response.",
            "Business delivery: Delivered the shared smart-locker Mini Program, H5, and admin console end-to-end; led the contract-domain platform refactor covering 100+ core workflows with zero launch incidents."
          ],
          "highlights": [
            "Client Requests -60% · FCP -30%",
            "P1 Incidents -50% YoY · <5m Response",
            "100+ Core Workflows Refactored · 0 Incidents"
          ]
        },
        {
          "period": "Jun 2018 - Mar 2021",
          "company": "Hangzhou Mingshitang Education Technology Co., Ltd.",
          "role": "Frontend Engineer",
          "bullets": [
            "Developed and iterated on the company OA system across desktop web and mobile H5.",
            "Built reusable form and upload components and contributed to open-source vux maintenance, boosting team delivery efficiency by ~30%."
          ],
          "highlights": [
            "Shared Components · Dev Efficiency +30%"
          ]
        },
        {
          "period": "Nov 2016 - Jun 2018",
          "company": "Pactera Technology International Ltd.",
          "role": "Frontend Engineer",
          "bullets": [
            "Contributed to Alibaba Recruitment, OD, and CB platforms as well as uxcore / salt-ui component libraries.",
            "Built an i18n conversion CLI tool that cut manual localization effort from 15 to 5 person-days."
          ],
          "highlights": [
            "i18n Tooling: 15 → 5 Person-Days"
          ]
        },
        {
          "period": "Jun 2016 - Nov 2016",
          "company": "Beijing Jiou Technology Co., Ltd.",
          "role": "Web Frontend Engineer",
          "bullets": [
            "Developed and maintained the Jimeng self-media advertising platform frontend."
          ],
          "highlights": []
        }
      ]
    },
    "education": {
      "title": "Education",
      "items": [
        {
          "period": "2008 - 2012",
          "school": "Institute of Technology, East China Jiaotong University",
          "degree": "BEng in Electrical Engineering & Automation"
        }
      ]
    },
    "openSource": {
      "title": "Open Source & Community",
      "items": [
        {
          "name": "auto-translate-converter",
          "desc": "CLI tool for frontend i18n conversion (19 Stars on GitHub)",
          "urlKey": "autoTranslateConverter"
        },
        {
          "name": "dsh-sight",
          "desc": "Token-free Figma Desktop read/write MCP bridge plugin",
          "urlKey": "dshSight"
        },
        {
          "links": [
            {
              "name": "vux",
              "urlKey": "vux"
            },
            {
              "name": "uxcore",
              "urlKey": "uxcore"
            },
            {
              "name": "salt-ui",
              "urlKey": "saltUi"
            }
          ],
          "desc": "Contributed to open-source and enterprise UI component libraries"
        }
      ]
    }
  }
};
