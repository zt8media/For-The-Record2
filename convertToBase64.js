const fs = require('fs');
const path = require('path');

const imagePath = path.join(__dirname, 'public/records/sza-ctrl-record.webp');

fs.readFile(imagePath, (err, data) => {
  if (err) throw err;
  const base64Image = data.toString('base64');
  console.log(base64Image);
});


