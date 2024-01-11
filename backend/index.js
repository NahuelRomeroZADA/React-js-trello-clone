const express = require('express');
const mongoose = require('mongoose');
const listRouter = require('./routes/lists');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/lists', listRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});