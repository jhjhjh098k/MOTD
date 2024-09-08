const fs = require('fs');
const path = require('path');

// Define the template for line1
const line1Template = "<#3fb78d><bold>E<#57c28a>a<#6fcd85>r<#88d880>t<#a3e27a>h<#beeb75>P<#dcf371>o<#fafa6e>l<reset>";

// Path to the motd.txt file
const filePath = path.join(__dirname, 'motd.txt');

// Read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Split the content by line breaks to get each line as an array
    const lines = data.split(/\r?\n/).filter(Boolean); // Filter out any empty lines

    // Create the array of objects with each line as line2
    const motds = lines.map((line) => ({
        icon: 'server-icon',
        line1: line1Template,
        line2: line
    }));

    // Convert the array of objects to JSON and display or save it
    console.log(JSON.stringify({ motds }, null, 4));
});
