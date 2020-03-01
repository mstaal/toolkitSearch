
let titles; 
let caseIDs;
let toolkitBaseURL;

try {
    titles = localStorage.titles.split(',');
    caseIDs = localStorage.caseIDs.split(',');
    toolkitBaseURL = localStorage.toolkitBaseURL;
    for (let index = 0; index < caseIDs.length; index++) {
        var ahref = document.createElement('a');
        // Set the title (for the link).
        var link = document.createTextNode(titles[index] + " (" + caseIDs[index] + ")");
        ahref.appendChild(link);
        // Set the title (for hovering).
        ahref.title = titles[index]  + " (" + caseIDs[index] + ")";
        // Set the href property.
        ahref.href = toolkitBaseURL + caseIDs[index];  
        var node = document.createElement("LI");
        node.appendChild(ahref);
        document.getElementById("entryList").appendChild(node);
    }
} catch (e) {
}
delete localStorage.titles;
delete localStorage.caseIDs;
delete localStorage.toolkitBaseURL;


var addEntryToList = function(entry) {
    var ul = document.getElementById("entryList");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(entry));
    ul.appendChild(li);
};