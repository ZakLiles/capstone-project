const path = require('path')

module.exports = {
    getHTML: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    }, 
    getStyles: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/styles.css'))
    },
    getScript: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/main.js'))
    }
}