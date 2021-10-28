// ==UserScript==
// @name         extended-epic-panel-jira
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  try to take over the world!
// @author       You
// @match        https://jira.*.com/browse/*
// @icon         https://www.google.com/s2/favicons?domain=*.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    AJS.$(document).ready(function() {
        AJS.$('#ghx-issues-in-epic-table tr').each(function(){
            var row = this;
            var issueKey = AJS.$(this).attr("data-issuekey");
            AJS.$.getJSON(AJS.contextPath() + '/rest/api/latest/issue/' + issueKey, function(data){
                var value = data.fields.priority.iconUrl;
                var prio = data.fields.priority.name;
                var due = data.fields.duedate;
                if (!due) {
                    due = "";
                } else {
                    var d1 = new Date();
                    var d2 = new Date(due);
                    if (d1 < d2) { //Green
                        due = '<span class=" jira-issue-status-lozenge aui-lozenge jira-issue-status-lozenge-green jira-issue-status-lozenge-done aui-lozenge-subtle jira-issue-status-lozenge-max-width-medium" data-tooltip="<span class=&quot;jira-issue-status-tooltip-title&quot;>'+due+'</span>" original-title="">'+due+'</span>';
                    } else { //Red with Status Colors PRO plugin
                        due = '<span class=" jira-issue-status-lozenge aui-lozenge jira-issue-status-lozenge-green jira-issue-status-lozenge-done aui-lozenge-subtle jira-issue-status-lozenge-max-width-medium" data-tooltip="<span class=&quot;jira-issue-status-tooltip-title&quot;>(red) '+due+'</span>" original-title="">'+due+'</span>';
                    }
                }
                var actions = AJS.$(row).find('td.issue_actions');
                AJS.$(actions).before('<td class="nav"><img src="'+ value + '" title="'+prio+'" alt="'+prio+'"></td>');
                AJS.$(actions).before('<td class="nav">'+ due + '</td>');
            });
        });
    });

})();