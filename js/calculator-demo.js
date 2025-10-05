// Calculator REST API Demo
// Simulates a REST API call with JSON request/response

export class CalculatorAPI {
    constructor() {
        this.apiUrl = '/api/calculate'; // Simulated endpoint
    }

    // Simulate REST API call
    async calculate(operation, a, b) {
        // Build request JSON
        const request = {
            operation: operation,
            a: parseFloat(a),
            b: parseFloat(b)
        };

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Process calculation (simulating backend)
        let result;
        let success = true;
        let error = null;

        try {
            switch (operation) {
                case 'add':
                    result = request.a + request.b;
                    break;
                case 'subtract':
                    result = request.a - request.b;
                    break;
                case 'multiply':
                    result = request.a * request.b;
                    break;
                case 'divide':
                    if (request.b === 0) {
                        throw new Error('除数不能为零');
                    }
                    result = request.a / request.b;
                    break;
                default:
                    throw new Error('不支持的运算');
            }
        } catch (e) {
            success = false;
            error = e.message;
        }

        // Build response JSON
        const response = success ? {
            result: result,
            success: true
        } : {
            error: error,
            success: false
        };

        return { request, response };
    }

    getOperationSymbol(operation) {
        const symbols = {
            'add': '+',
            'subtract': '-',
            'multiply': '×',
            'divide': '÷'
        };
        return symbols[operation] || '?';
    }

    getOperationName(operation) {
        const names = {
            'add': '加法',
            'subtract': '减法',
            'multiply': '乘法',
            'divide': '除法'
        };
        return names[operation] || operation;
    }
}

// Initialize calculator demo
export function initCalculatorDemo() {
    const calcAPI = new CalculatorAPI();

    const numA = document.getElementById('calc-num-a');
    const numB = document.getElementById('calc-num-b');
    const operation = document.getElementById('calc-operation');
    const calculateBtn = document.getElementById('calc-btn');
    const calcDisplay = document.getElementById('calc-display');
    const calcResult = document.getElementById('calc-result');
    const requestJson = document.getElementById('request-json');
    const responseJson = document.getElementById('response-json');

    if (!calculateBtn) return;

    calculateBtn.addEventListener('click', async () => {
        const a = numA.value;
        const b = numB.value;
        const op = operation.value;

        if (!a || !b) {
            calcResult.textContent = '请输入数字';
            calcResult.style.color = '#f44336';
            return;
        }

        // Update display
        const symbol = calcAPI.getOperationSymbol(op);
        calcDisplay.textContent = `${a} ${symbol} ${b} =`;
        calcResult.textContent = '计算中...';
        calcResult.style.color = '#aaa';

        // Show loading in JSON
        requestJson.textContent = '发送请求中...';
        responseJson.textContent = '等待响应...';

        calculateBtn.disabled = true;

        try {
            const { request, response } = await calcAPI.calculate(op, a, b);

            // Display request JSON
            requestJson.textContent = JSON.stringify(request, null, 2);

            // Display response JSON
            responseJson.textContent = JSON.stringify(response, null, 2);

            // Update result display
            if (response.success) {
                calcResult.textContent = response.result;
                calcResult.style.color = 'var(--primary-color)';
            } else {
                calcResult.textContent = response.error;
                calcResult.style.color = '#f44336';
            }
        } catch (error) {
            calcResult.textContent = '错误';
            calcResult.style.color = '#f44336';
            responseJson.textContent = JSON.stringify({ error: error.message }, null, 2);
        } finally {
            calculateBtn.disabled = false;
        }
    });

    // Allow Enter key
    [numA, numB].forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculateBtn.click();
            }
        });
    });

    // Set default values
    numA.value = 125;
    numB.value = 75;
    operation.value = 'add';
}
