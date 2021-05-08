const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) => res.send('Hello World'));
app.get('/', (req, res) => res.json({ msg: 'Welcome to the ContactKeeper API' }));

//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
