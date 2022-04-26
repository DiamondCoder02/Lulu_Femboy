const fs = require('fs'), readline = require('readline'), filename = "./config.json"
const wait = require('node:timers/promises').setTimeout;
let languages = [], languageFiles = fs.readdirSync('./languages').filter(file => file.endsWith('.json'))
var a = -1

for (const file of languageFiles) {
    a+=1
    const fileName = file.split('.')[0]
    languages.push(a+" "+fileName)
}
languages.shift()
console.log("Please choose a language: \n"+languages.join('\n'))

const ask = (question, callback) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question("Number: ", (answer) => {
        rl.close();
        callback(answer);
    });
};
ask("Choose", (answer) => {
    let lan = []
    for (const file of languageFiles) {
        const fileName = file.split('.')[0]
        lan.push(fileName)
    }
    var file_content = fs.readFileSync(filename);
    var content = JSON.parse(file_content);
    if (answer > 0 && answer < lan.length) { l = lan[answer] } else { return console.log("no") }
    content.language = l
    fs.writeFileSync(filename, JSON.stringify(content, null, 2))
    console.log("Language changed to "+l)
    return wait(3000)
});