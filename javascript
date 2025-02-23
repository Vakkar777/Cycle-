const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:']
        }
    }
}));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

// Routes
app.get('/api/solution-ui', (req, res) => {
    res.send(`
        <div class="solution-interface">
            <textarea id="problem-input"></textarea>
            <button onclick="analyzeProblem()">Solve</button>
            <div id="solution-output"></div>
        </div>
    `);
});

app.get('/privacy', (req, res) => {
    res.sendFile(__dirname + '/privacy-policy.html');
});

// Secure static files
app.use(express.static('public', {
    setHeaders: (res) => {
        res.set('X-Content-Type-Options', 'nosniff');
    }
}));

app.listen(3000, () => {
    console.log('Secure server running on port 3000');
});
