AJS.$(document).ready(function() {
AJS.$('#ghx-issues-in-epic-table tr').each(function(){
var row = this;
var issueKey = AJS.$(this).attr("data-issuekey");
AJS.$.getJSON(AJS.contextPath() + '/rest/api/latest/issue/' + issueKey, function(data){
var value = data.fields.priority.iconUrl;
var actions = AJS.$(row).find('td.issue_actions');
AJS.$(actions).before('<td class="nav"><img src="'+ value + '"></td>');
 });
});
});
