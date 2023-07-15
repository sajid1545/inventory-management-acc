const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');

const app = require('./app');

// database connection
mongoose.connect(process.env.MONGO_URI).then(() => {
	console.log(`Database connected`.cyan.bold);
});

app.use('/api/v1/product', require('./routes/product.routes'));
app.use('/api/v1/brand', require('./routes/brand.routes'));


// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`App is running on port ${port}`.yellow.bold);
});
