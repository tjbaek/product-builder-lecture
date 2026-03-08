class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .lotto-container {
                    background-color: var(--container-background, #2c2c2c);
                    padding: 40px;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px var(--shadow-color, rgba(0, 0, 0, 0.5));
                    text-align: center;
                }

                h1 {
                    color: var(--accent-color, #ffde59);
                    font-size: 3rem;
                    margin-bottom: 20px;
                    text-shadow: 0 0 15px var(--accent-color, #ffde59);
                }

                .numbers-display {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin: 30px 0;
                    min-height: 80px;
                }

                .number-ball {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background-color: var(--accent-color, #ffde59);
                    color: #1a1a1a;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 2rem;
                    font-weight: bold;
                    box-shadow: 0 5px 10px rgba(0,0,0,0.3);
                    animation: fadeIn 0.5s ease-in-out, slideUp 0.5s ease-in-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from { transform: translateY(20px); }
                    to { transform: translateY(0); }
                }

                button {
                    background-color: var(--button-background, #3a3a3a);
                    color: var(--text-color, #ffffff);
                    border: none;
                    padding: 15px 30px;
                    font-size: 1.2rem;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: background-color 0.3s, box-shadow 0.3s;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                }

                button:hover {
                    background-color: var(--button-hover-background, #4a4a4a);
                    box-shadow: 0 0 20px var(--accent-color, #ffde59);
                }
            </style>
            <div class="lotto-container">
                <h1>Lotto Numbers</h1>
                <div class="numbers-display"></div>
                <button id="generate-btn">Generate Numbers</button>
            </div>
        `;

        shadow.appendChild(template.content.cloneNode(true));

        this.shadowRoot.querySelector('#generate-btn').addEventListener('click', () => this.generateNumbers());
    }

    generateNumbers() {
        const numbersDisplay = this.shadowRoot.querySelector('.numbers-display');
        numbersDisplay.innerHTML = '';
        const numbers = new Set();

        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }

        Array.from(numbers).forEach((number, index) => {
            setTimeout(() => {
                const numberBall = document.createElement('div');
                numberBall.classList.add('number-ball');
                numberBall.textContent = number;
                numbersDisplay.appendChild(numberBall);
            }, index * 200); // Stagger the animation
        });
    }
}

customElements.define('lotto-generator', LottoGenerator);