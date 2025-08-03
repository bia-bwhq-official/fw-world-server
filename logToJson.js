const fs = require('fs');

function loadJsonToArray(filePath, processData = true) {
    try {
        // Read the file as a string
        const jsonString = fs.readFileSync(filePath, 'utf8');
        
        // Parse the JSON string
        const jsonData = JSON.parse(jsonString);
        
        // Find the table object that contains the message data
        const tableObject = jsonData.find(item => item.type === "table" && item.name === "message_logs");
        
        // If no table found, return empty array
        if (!tableObject || !tableObject.data) {
            return [];
        }
        
        // Return processed or raw data based on the processData parameter
        if (processData) {
            return tableObject.data.map(message => ({
                id: parseInt(message.id),
                timestamp: new Date(message.timestamp),
                username: message.username,
                message: message.message,
                guid: message.guid,
                censored: message.censored === "1"
            }));
        } else {
            return tableObject.data;
        }
        
    } catch (error) {
        console.error('Error loading JSON file:', error.message);
        return [];
    }
}

// Example usage:
// const messages = loadJsonToArray('./message_logs.json');
// console.log('Processed messages:', messages);

// Or get raw data:
// const rawMessages = loadJsonToArray('./message_logs.json', false);
// console.log('Raw messages:', rawMessages);

// Export the function
module.exports = loadJsonToArray;