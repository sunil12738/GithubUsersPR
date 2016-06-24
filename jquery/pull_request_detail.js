$(document).ready(function(){
	$api = $.getUrlVar('url');

	// Make API call to show the details of the pull request
	$.getJSON($api,function($jsonbody){
		print_details($jsonbody, "detail");
	});
});

// Function to print the details of the particular PR
function print_details($jsonbody, $div_id){
	print_pr_details($jsonbody,"pr_detail");
	print_pr_stats($jsonbody,"pr_stats");
	print_repo_details($jsonbody,"repository_detail");
	print_merger_details($jsonbody,"merge_detail");
}

// Function to print some details related to the PR
function print_pr_details($jsonbody, $div_id){
	var array = [];
	array.push('<div>'+$jsonbody["merged"]+'</div>');
	array.push('<div>'+$jsonbody["state"]+'</div>');
	array.push('<div>'+$jsonbody["created_at"]+'</div>');
	array.push('<div>'+$jsonbody["updated_at"]+'</div>');
	array.push('<div>'+$jsonbody["closed_at"]+'</div>');
	array.push('<div>'+$jsonbody["merged_at"]+'</div>');
	array.push('<div>'+$jsonbody["commits_url"]+'</div>');
	array.push('<div>'+$jsonbody["comments_url"]+'</div>');
	$("#"+$div_id).append(array.join(''));

}

// Function to print repo details related to the PR
function print_repo_details($jsonbody, $div_id){
	var array = [];		
	array.push('<div>'+$jsonbody["head"]["repo"]["name"]+'</div>');
	array.push('<div>'+$jsonbody["base"]["repo"]["html_url"]+'</div>');
	array.push('<div>'+$jsonbody["html_url"]+'</div>');
	array.push('<div>'+$jsonbody["issue_url"]+'</div>');
	$("#"+$div_id).append(array.join(''));

}

// Function to print the user who merged the PR
function print_merger_details($jsonbody, $div_id){
	var array = [];
	array.push('<div>'+$jsonbody["merged_by"]["login"]+'</div>');
	$("#"+$div_id).append(array.join(''));

}

// Function to print some stats related to the PR
function print_pr_stats($jsonbody,$div_id){
	var array = [];
	array.push('<div>'+$jsonbody["commits"]+'</div>');
	array.push('<div>'+$jsonbody["additions"]+'</div>');
	array.push('<div>'+$jsonbody["deletions"]+'</div>');
	array.push('<div>'+$jsonbody["changed_files"]+'</div>');
	$("#"+$div_id).append(array.join(''));
}

// Function copied from http://jquery-howto.blogspot.in/2009/09/get-url-parameters-values-with-jquery.html for url parameters
$.extend({
getUrlVars: function(){
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++){
  		hash = hashes[i].split('=');
  		vars.push(hash[0]);
  		vars[hash[0]] = hash[1];
	}
	return vars;
	},
	getUrlVar: function(name){
	return $.getUrlVars()[name];
	}
});
