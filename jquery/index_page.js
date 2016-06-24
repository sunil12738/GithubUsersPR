$initial_page=1; //The first page to be loaded is 1
$page_limit=10; // Specify the number of items per page
$page_limit_url="&per_page="+$page_limit+"&page="; // Append this string to the end of the api url to get the paginated results

$(document).ready(function(){

	// API call 1: get the user name on button click
	$("#search").click(function(){
		$search = $("#searchQuery").val();
		$api = "https://api.github.com/users/"+$search;
		$.getJSON($api, function($jsonbody) {

			$author = $jsonbody["login"];

			// API call 2: get the user pull requests
			$api = "https://api.github.com/search/issues?q=author:"+$jsonbody["login"]+"+type:pr"+$page_limit_url+$initial_page;
			$.getJSON($api, function($jsonbody,$status,$xhr){
				if($jsonbody["total_count"]==0){ // No PR found
					print_message("No pull requests found", "page_number", "data");
				}

				else{ // Print the PR details in loop
					$total_pages = parseInt($jsonbody["total_count"]/$page_limit) + 1;
					console.log("the total page: "+$total_pages);
					print_page_numbers($jsonbody,$author, "page_number");
					print_pr_details($jsonbody, "data");								
				}
			});					
		}).fail(function(){
			print_message("User not found", "page_number", "data");
		});
	});
});

// Print the PR list in the page if found
function print_pr_details($jsonbody, $div_id){
	$("#"+$div_id).text("");
	$.each($jsonbody.items, function(index, element){
		var array=[];
		$repo_name = get_repo_name(element.repository_url);

		array.push('<div class="row">');
		array.push('<div class="col-xs-8"><h3>Repository: '+$repo_name+'</h3></div>');
		array.push('<div class="col-xs-4 text-right">Current state: '+element.state+'</div>');
		array.push('</div>');

		array.push('<div class="row">');
		array.push('<div class="col-xs-4 col-sm-3 col-md-2 col-lg-2">Pull request url: </div>');		
		array.push('<div class="col-xs-8 col-sm-9 col-md-10 col-lg-10">'+element.pull_request.url+'</div>');		
		array.push('</div>');
		
		array.push('<div class="row">');
		array.push('<div class="col-xs-4 col-sm-3 col-md-2 col-lg-2">Url of repository: </div>');
		array.push('<div class="col-xs-8 col-sm-9 col-md-10 col-lg-10">'+element.repository_url+'</div>');
		array.push('</div>');
		
		array.push('<div class="row">');
		array.push('<div class="col-xs-4 col-sm-3 col-md-2 col-lg-2">Date of creation: </div>');
		array.push('<div class="col-xs-8 col-sm-9 col-md-10 col-lg-10">'+element.created_at+'</div>');
		array.push('</div>');
		
		array.push('<div class="row">');
		array.push('<div class="col-xs-4 col-sm-3 col-md-2 col-lg-2">Date of closing: </div>');
		array.push('<div class="col-xs-8 col-sm-9 col-md-10 col-lg-10">'+element.closed_at+'</div>');
		array.push('</div>');
		
		array.push('<div class="row">');
		array.push('<div class="text-right"><input type="button" value="Details" id="button'+index+'"></div>');
		array.push('</div>');
		
		array.push('<hr>');
		$("#"+$div_id).append(array.join(''));

		// Go to the specific PR details on button click
		$("#button"+index).click(function(){
			$url = "pull_request_detail.html?url="+element.pull_request.url;
			window.open($url,'_blank');
		});
	});
}

// Print the message in case of pr/user not found
function print_message($message,$div_id1,$div_id2){
	$("#"+$div_id1).text('');
	$("#"+$div_id2).text($message);
}

// Print the page numbers in the top
function print_page_numbers($jsonbody,$author,$div_id){
	$("#"+$div_id).text("");
	for($i = 1; $i<=$total_pages; ++$i){
		$("#"+$div_id).append('<span><input type="button" id="page_'+$i+'" value="'+$i+'" onclick="go_to_page('+$i+');"></span>');
	}
}

// API call on the page number button click
function go_to_page($i){
	$api = "https://api.github.com/search/issues?q=author:"+$author+"+type:pr"+$page_limit_url+$i;
	$.getJSON($api, function($jsonbody){
		print_pr_details($jsonbody, "data");
	});
}

// Get the repository name
function get_repo_name($url){
	$position = $url.lastIndexOf("/");
	$url_len = $url.length;
	$repo_name = $url.substr($position+1,$url_len);
	return $repo_name;
}
