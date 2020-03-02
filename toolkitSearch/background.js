// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
    function (text) {
        var contentType = "application/json";
        var root = "https://goto.netcompany.com/cases/";
        var options = JSON.parse(localStorage.rules); var toolkit; var process; var processURL;
        options.forEach(option => {
            if(option.enabled) {
                toolkit = option.path;
                process = option.process;
                processURL = option.processURL;
            }
        });
        if(!toolkit || !process) {
            alert("Toolkit or process type has not been set correctly");
        }
        var url = root.concat(toolkit,"_api/web/lists/getbytitle('", process, "')/items?$Filter=substringof('", text, "' + ,%20Title)&$select=Title,ID&$orderby=%20Created%20desc");
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': contentType
              }
        }).then(r => r.json()).then(result => {
            var dispForm = processURL.concat("DispForm.aspx?ID=");
            if(result.value.length === 0) {
                alert("No results found based on search");
            } else if(result.value.length === 1) {
                var id = result.value[0]?.Id
                chrome.tabs.create({ url: root + toolkit + dispForm + id });
            } else {
                localStorage.titles = ""; 
                localStorage.caseIDs = "";
                localStorage.toolkitBaseURL = root + toolkit + dispForm;
                result.value.forEach(element => {
                    localStorage.titles = localStorage.titles.concat(element?.Title + ",");
                    localStorage.caseIDs = localStorage.caseIDs.concat(element?.Id + ",");
                });
                if(localStorage.titles) { localStorage.titles = localStorage.titles.substring(0, localStorage.titles.length - 1) }
                if(localStorage.caseIDs) { localStorage.caseIDs = localStorage.caseIDs.substring(0, localStorage.caseIDs.length - 1) }
                chrome.tabs.create({ url: 'results.html' });
            }
        })
    });