const fs = require('fs');

// Read file synchronously
try {
  const data = fs.readFileSync('C:\\Users\\lovep\\OneDrive\\Desktop\\Notes\\NodeJs\\01Intro\\practice\\data.txt');
  console.log('File content:\n');
  console.log(data);
  console.log('end');
} catch (error) {
  console.error('Error reading file:', error.message);
}
