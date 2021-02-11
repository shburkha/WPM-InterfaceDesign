const yaml = require('js-yaml');
const fs = require('fs');

//Get document or throw exception on error
try{
    const doc = yaml.load(fs.readFileSync("simple-switch_topology.yml"));
    console.log(doc);
} catch (e) {
    console.log(e);
}