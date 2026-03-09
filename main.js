class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                .lotto-container {
                    background-color: var(--container-background);
                    padding: 40px;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px var(--shadow-color);
                    text-align: center;
                    transition: background-color 0.3s, box-shadow 0.3s;
                    max-width: 500px;
                    width: 90%;
                    margin: auto;
                }

                h1 {
                    color: var(--accent-color);
                    font-size: 3rem;
                    margin-top: 0;
                    margin-bottom: 20px;
                    text-shadow: 0 0 15px var(--accent-color);
                    transition: color 0.3s, text-shadow 0.3s;
                }

                .numbers-display {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 15px;
                    margin: 30px 0;
                    min-height: 80px;
                }

                .number-ball {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background-color: var(--accent-color);
                    color: #ffffff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 2rem;
                    font-weight: bold;
                    box-shadow: 0 5px 10px rgba(0,0,0,0.3);
                    animation: fadeIn 0.5s ease-in-out, slideUp 0.5s ease-in-out;
                    transition: background-color 0.3s;
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
                    background-color: var(--button-background);
                    color: var(--text-color);
                    border: none;
                    padding: 15px 30px;
                    font-size: 1.2rem;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: background-color 0.3s, box-shadow 0.3s, transform 0.2s;
                    box-shadow: 0 5px 15px var(--shadow-color);
                }

                button:hover {
                    background-color: var(--button-hover-background);
                    box-shadow: 0 0 20px var(--accent-color);
                    transform: translateY(-2px);
                }

                button:active {
                    transform: translateY(0);
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

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        sortedNumbers.forEach((number, index) => {
            setTimeout(() => {
                const numberBall = document.createElement('div');
                numberBall.classList.add('number-ball');
                numberBall.textContent = number;
                numbersDisplay.appendChild(numberBall);
            }, index * 200); 
        });
    }
}

customElements.define('lotto-generator', LottoGenerator);

class PartnershipForm extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin-top: 50px;
                }
                .form-container {
                    background-color: var(--container-background);
                    padding: 30px;
                    border-radius: 20px;
                    box-shadow: 0 10px 30px var(--shadow-color);
                    max-width: 500px;
                    width: 90%;
                    margin: auto;
                    transition: background-color 0.3s, box-shadow 0.3s;
                }
                h2 {
                    color: var(--accent-color);
                    margin-top: 0;
                    text-align: center;
                }
                .form-group {
                    margin-bottom: 15px;
                    text-align: left;
                }
                label {
                    display: block;
                    margin-bottom: 5px;
                    color: var(--text-color);
                    font-weight: bold;
                }
                input, textarea {
                    width: 100%;
                    padding: 10px;
                    border-radius: 8px;
                    border: 1px solid var(--button-background);
                    background-color: var(--background-color);
                    color: var(--text-color);
                    box-sizing: border-box;
                    font-family: inherit;
                    transition: border-color 0.3s;
                }
                input:focus, textarea:focus {
                    outline: none;
                    border-color: var(--accent-color);
                }
                button {
                    width: 100%;
                    background-color: var(--accent-color);
                    color: #1a1a1a;
                    border: none;
                    padding: 12px;
                    font-size: 1.1rem;
                    font-weight: bold;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: opacity 0.3s, transform 0.2s;
                    margin-top: 10px;
                }
                button:hover {
                    opacity: 0.9;
                    transform: translateY(-2px);
                }
                button:active {
                    transform: translateY(0);
                }
            </style>
            <div class="form-container">
                <h2>Partnership Inquiry</h2>
                <form action="https://formspree.io/f/maqpqqjb" method="POST">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required placeholder="Your Name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required placeholder="your@email.com">
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="4" required placeholder="Tell us about your project"></textarea>
                    </div>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        `;
        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('partnership-form', PartnershipForm);

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});
