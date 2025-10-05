// DeepSeek API Demo Module
import { config } from './config.js';

export class DeepSeekDemo {
    constructor() {
        this.apiKey = config.apiKey;
        this.isLoading = false;
    }

    setApiKey(key) {
        this.apiKey = key;
    }

    async callDeepSeek(userInput) {
        if (!this.apiKey) {
            throw new Error('请先设置 API Key');
        }

        if (this.isLoading) {
            return;
        }

        this.isLoading = true;

        try {
            const response = await fetch(config.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: config.model,
                    messages: [
                        {
                            role: 'system',
                            content: '你是一个友好的 AI 助手，专门帮助中国高中生理解复杂概念。请用简单、生动的语言回答问题，字数控制在 100 字以内。'
                        },
                        {
                            role: 'user',
                            content: userInput
                        }
                    ],
                    max_tokens: 200,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || '请求失败');
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('DeepSeek API Error:', error);
            throw error;
        } finally {
            this.isLoading = false;
        }
    }

    // 预设示例
    getExamples() {
        return [
            '用初三水平解释牛顿第一定律',
            '把"光合作用"变成 5 道选择题',
            '用 rap 的方式总结辛亥革命',
            '帮我制定一个期末复习计划'
        ];
    }
}

// Initialize demo functionality
export function initDemo() {
    const demo = new DeepSeekDemo();
    let apiKeySet = false;

    // Setup API Key input
    const apiKeyInput = document.getElementById('api-key-input');
    const setKeyBtn = document.getElementById('set-api-key-btn');
    const keyStatus = document.getElementById('key-status');

    if (setKeyBtn) {
        setKeyBtn.addEventListener('click', () => {
            const key = apiKeyInput.value.trim();
            if (key) {
                demo.setApiKey(key);
                apiKeySet = true;
                keyStatus.textContent = '✅ API Key 已设置';
                keyStatus.className = 'key-status success';
                apiKeyInput.value = '';
                apiKeyInput.placeholder = '已设置';
            } else {
                keyStatus.textContent = '❌ 请输入有效的 API Key';
                keyStatus.className = 'key-status error';
            }
        });
    }

    // Setup demo button
    const demoBtn = document.getElementById('demo-btn');
    const userInput = document.getElementById('user-input');
    const output = document.getElementById('demo-output');
    const examplesContainer = document.getElementById('demo-examples');

    if (demoBtn) {
        demoBtn.addEventListener('click', async () => {
            if (!apiKeySet) {
                output.innerHTML = '<p class="error">⚠️ 请先在上方设置你的 DeepSeek API Key</p>';
                return;
            }

            const inputText = userInput.value.trim();
            if (!inputText) {
                output.innerHTML = '<p class="error">请输入问题</p>';
                return;
            }

            // Show loading
            output.innerHTML = '<p class="loading">🤖 AI 正在思考中...</p>';
            demoBtn.disabled = true;

            try {
                const result = await demo.callDeepSeek(inputText);
                output.innerHTML = `<div class="ai-response"><strong>AI 回答：</strong><p>${result}</p></div>`;
            } catch (error) {
                output.innerHTML = `<p class="error">❌ 错误: ${error.message}</p>`;
            } finally {
                demoBtn.disabled = false;
            }
        });
    }

    // Setup example buttons
    if (examplesContainer) {
        const examples = demo.getExamples();
        examples.forEach(example => {
            const btn = document.createElement('button');
            btn.className = 'example-btn';
            btn.textContent = example;
            btn.addEventListener('click', () => {
                userInput.value = example;
            });
            examplesContainer.appendChild(btn);
        });
    }

    // Allow Enter key to submit
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                demoBtn.click();
            }
        });
    }
}
