const router = require('express').Router();
const notes = require('../db/db.json');
const fs = require('fs');
const path = require('path');
const { readFromFile } = require('../../../Bootcamp/uw-sea-fsf-pt-04-2021-u-c/11-express/01-Activities/Day-03/28-Stu_Mini-Project/Main/helpers/fsUtils');


router.get('/notes', (req, res) => {
    // return all notes
    res.json(notes);
});
// create post route 
router.post('/notes', (req, res) => {
  
    notes.push(req.body);
    fs.writeFileSync(path.join(__dirname,"../db/db.json"),JSON.stringify(notes));
    res.json(notes);
    
});
// create delete route
router.delete('/notes/:title', (req, res) => {
    const routerTitle = req.params.title;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            
            
            const result = json.filter((notes) => notes.title !== routerTitle);
            fs.writeFileSync(path.join(__dirname,"../db/db.json"),JSON.stringify(result));
            
            res.json(`Item ${routerTitle} has been deleted 🗑️`);
        });
});
module.exports = router;