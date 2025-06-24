const ping = require('ping');

async function pingRock(address) {
    try {
        const res = await ping.promise.probe(address);
        return res;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = { pingRock };
