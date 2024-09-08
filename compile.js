const fs = require('fs');
const path = require('path');

// Define the template for line1
const line1Template = "<#3fb78d><bold>E<#57c28a>a<#6fcd85>r<#88d880>t<#a3e27a>h<#beeb75>P<#dcf371>o<#fafa6e>l<reset>";

// Path to the motd.txt file and the output file
const motdFilePath = path.join(__dirname, 'motd.txt');
const outputFilePath = path.join(__dirname, 'minimotd', 'main.conf');

// Read the file asynchronously
fs.readFile(motdFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Split the content by line breaks to get each line as an array
    let lines = data.split(/\r?\n/).filter(Boolean); // Filter out any empty lines
	
	// Remove any single or double quotes from the lines
    lines = lines.map(line => line.replace(/['"]/g, "'"));

    // Create the custom formatted string for the minimotd config file
    let output = `icon-enabled=true\n`;
    output += `motd-enabled=true\n`;
    output += `motds=[\n`;

    // Loop through each line and format it accordingly
    lines.forEach((line, index) => {
        output += `    {\n`;
        output += `        icon=server-icon\n`;
        output += `        line1="${line1Template}"\n`;
        output += `        line2="${line}"\n`;
        output += `    }${index < lines.length - 1 ? ',' : ''}\n`; // Add comma only between objects
    });

    output += `]\n\n\n`;

    // Add the remaining player count settings
    output += `player-count-settings {\n`;
    output += `    allow-exceeding-maximum=false\n`;
    output += `    disable-player-list-hover=false\n`;
    output += `    fake-players {\n`;
    output += `        fake-players="0"\n`;
    output += `        fake-players-enabled=false\n`;
    output += `    }\n`;
    output += `    hide-player-count=false\n`;
    output += `    just-x-more-settings {\n`;
    output += `        just-x-more-enabled=false\n`;
    output += `        x-value=0\n`;
    output += `    }\n`;
    output += `    max-players=0\n`;
    output += `    max-players-enabled=false\n`;
    output += `    servers=[]\n`;
    output += `}\n`;

    // Write the output to the minimotd/main.conf file
    fs.writeFile(outputFilePath, output, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log(`Configuration successfully written to ${outputFilePath}`);
    });
});