var guidePage = 0;
var jsonPages = [];
var answers = [];
var answersSets = [];
var currentSet = '0';
var paths = [];
paths['0'] = [];

var usStates = [{data: "AK", label: "Alaska"},
{data: "AL", label: "Alabama"},
{data: "AR", label: "Arkansas"},
{data: "AZ", label: "Arizona"},
{data: "CA", label: "California"},
{data: "CO", label: "Colorado"},
{data: "CT", label: "Connecticut"},
{data: "DE", label: "Delaware"},
{data: "DC", label: "District of Columbia"},
{data: "FL", label: "Florida"},
{data: "GA", label: "Georgia"},
{data: "HI", label: "Hawaii"},
{data: "IA", label: "Iowa"},
{data: "ID", label: "Idaho"},
{data: "IL", label: "Illinois"},
{data: "IN", label: "Indiana"},
{data: "KS", label: "Kansas"},
{data: "KY", label: "Kentucky"},
{data: "LA", label: "Louisiana"},
{data: "MA", label: "Massachusetts"},
{data: "MD", label: "Maryland"},
{data: "ME", label: "Maine"},
{data: "MI", label: "Michigan"},
{data: "MN", label: "Minnesota"},
{data: "MS", label: "Mississippi"},
{data: "MO", label: "Missouri"},
{data: "MT", label: "Montana"},
{data: "NC", label: "North Carolina"},
{data: "ND", label: "North Dakota"},
{data: "NE", label: "Nebraska"},
{data: "NH", label: "New Hampshire"},
{data: "NJ", label: "New Jersey"},
{data: "NM", label: "New Mexico"},
{data: "NV", label: "Nevada"},
{data: "NY", label: "New York"},
{data: "OH", label: "Ohio"},
{data: "OK", label: "Oklahoma"},
{data: "OR", label: "Oregon"},
{data: "PA", label: "Pennsylvania"},
{data: "RI", label: "Rhode Island"},
{data: "SC", label: "South Carolina"},
{data: "SD", label: "South Dakota"},
{data: "TN", label: "Tennessee"},
{data: "TX", label: "Texas"},
{data: "UT", label: "Utah"},
{data: "VA", label: "Virginia"},
{data: "VT", label: "Vermont"},
{data: "WA", label: "Washington"},
{data: "WI", label: "Wisconsin"},
{data: "WV", label: "West Virginia"},
{data: "WY", label: "Wyoming"}];

// Reset page widths on resize
$( window ).resize(function() {
	setPageWidth();
	$(".guidePages").css( "width", totalWidth() );
	$(".guidePages").css( "marginLeft", currentLeftMargin());
});

var getPath = function (obj) {
	//obj = obj[guideSet];
	var tempPath = JSON.parse(JSON.stringify(paths[currentSet]));
	
	while (tempPath.length > 0 && (obj = obj[tempPath.shift()]));
	return obj;
}

function buildPageWithPath()
{
	var obj = getPath(jsonPages[currentSet]);
	
	var htmlPage = '<div class=\"page\"><div class=\"content\">';
	
	if (obj.type.indexOf("GOTOSET:") !=-1)
	{
		var path = obj.type.substring(8);
	
		paths[path] = [];
		currentSet = path;
		
		obj = getPath(jsonPages[currentSet]);
	}
	
	if(obj.percentage)
	{
		updateProgess(obj.percentage);
	}
	
	if(obj.type=='results')
	{
		updateProgess(100);
	
		htmlPage+= '<div class="results">';
		htmlPage+= '<h3>'+obj.title+'</h3>';
		htmlPage+= '<p>'+obj.description+'</p>';
		htmlPage+= '<a class="button has-right darkBlue" href="'+obj.link+'"><span class="button-right"><span class="inner"><i class="icon button-icon arrow-large"></i></span></span><span class="button-center">'+obj.button+'</span></a>';
		htmlPage+= '</div>';
		
	}
	else if(obj.type=='fullresults')
	{
		updateProgess(100);
	
		/*htmlPage+= '<div class="results">';
		htmlPage+= '<h3>'+obj.title+'</h3>';
		htmlPage+= '<p>'+obj.description+'</p>';
		htmlPage+= '<a class="button has-right darkBlue" href="'+obj.link+'"><span class="button-right"><span class="inner"><i class="icon button-icon arrow-large"></i></span></span><span class="button-center">'+obj.button+'</span></a>';
		htmlPage+= '</div>';*/
		
		htmlPage+= '<div class="resultHeader">Thank you! We’ve calculated your results based on your answers.</div>';
		htmlPage+= '<div class="resultContent">';
		htmlPage+= '<h3>Many new businesses in the Wholesale field choose to form a <span class="productName">Limited Liability Company (LLC)</span> in California.</h3><br /><br />';
		htmlPage+= 'The LLC is a popular choice due to its combination of benefits and flexibility. Like other formal business structures, LLCs offer liability protection and tax savings, but unlike corporations, they are relatively easy to maintain.';
		htmlPage+= '<br><br>';
		htmlPage+= '<a class="button has-right darkBlue" href="product.html"><span class="button-right"><span class="inner"><i class="icon button-icon arrow-large"></i></span></span><span class="button-center">Limited Liability Company</span></a>';
		htmlPage+= '</div>';
		htmlPage+= '<div class="resultsPhone">';
		htmlPage+= 'Get personalized assistance from a member of our Business Starter Team<br>';
		htmlPage+= '<div class="phoneNumber">(888) 409-8589</div>';
		htmlPage+= '<span class="phoneTimes">M–F  8am–5pm PT &nbsp;&nbsp;&nbsp; SAT  7am–4pm PT</span>';			
		htmlPage+= '</div>';
		
	}
	else if(obj.type=='select_state')
	{
		var question = obj.question;
		
		for (var i=0;i<answers.length;i++)
		{
			question = question.replace("@ANSWER_"+answersSets[i]+"_"+i+"@",answers[i]);
		}
		
		htmlPage+= '<div class="results">';
		htmlPage+= '<h3>'+question+'</h3>';
	
		htmlPage+= buildStateSelectBox();
		htmlPage+= '</div>';
	}
	else if(obj.type=='select_state_multi')
	{
		var question = obj.question;
		
		for (var i=0;i<answers.length;i++)
		{
			question = question.replace("@ANSWER_"+answersSets[i]+"_"+i+"@",answers[i]);
		}
		
		htmlPage+= '<div class="results">';
		htmlPage+= '<h3>'+question+'</h3>';
		htmlPage+= '<div id="multistate">';
	
		htmlPage+= buildMultiStateSelectBox();
		
		htmlPage+= '</div>';
		
		htmlPage+= '<div style="background-color:white;"><div class="shadow-strip"></div><br></div>';
		
		htmlPage+= '<div class="continueButton"><a class="button flex has-right darkBlue" href="javascript:selectOption(0);"><span class="button-right"><span class="inner"><i class="icon button-icon arrow-large"></i></span></span><span class="button-center">Continue</span></a></div>';
			
		htmlPage+= '</div>';
	}
	else
	{
		var question = obj.question;
		
		for (var i=0;i<answers.length;i++)
		{
			question = question.replace("@ANSWER_"+answersSets[i]+"_"+i+"@",answers[i]);
		}
	
		htmlPage+= '<h3>'+question+'</h3>';
		
		if(obj.type == 'multioptions')
		{
			htmlPage+= '<div class="selectAll">SELECT ALL THAT APPLY</div><br>';
		}
		
		htmlPage+= '<ul>';
		
		jQuery.each( obj.options, function( i, val ) {
		
			var optionVal = val.value;
			
			for (var b=0;b<answers.length;b++)
			{
				optionVal = optionVal.replace("@ANSWER_"+answersSets[b]+"_"+b+"@",answers[b]);
			}
		
			if(obj.type == 'multioptions')
			{
				htmlPage+= '<li class="multi" onclick="selectCheckBox('+i+');"><span><input id="option'+i+'" name="option'+i+'" type="checkbox" value="1" /><label for="option'+i+'">'+optionVal+'</label></span><span class="chevron">»</span></li>';
			}
			else
			{
				if(val.icon)
				{
					htmlPage+= '<li onClick="selectOption('+i+');"><div class="icon"><img src="images/icons/'+val.icon+'.png" /></div><span class="option">'+optionVal+'</span><span class="chevron">»</span></li>';
				}
				else
				{
					htmlPage+= '<li onClick="selectOption('+i+');"><span class="option">'+optionVal+'</span><span class="chevron">»</span></li>';
				}
			}
		});
		
		htmlPage+= '</ul>';
		
		htmlPage+= '<div style="background-color:white;"><div class="shadow-strip"></div><br></div>';
		
		if(obj.type == 'multioptions')
		{
			htmlPage+= '<div class="continueButton"><a class="button has-right flex darkBlue" href="javascript:selectOption(0);"><span class="button-right"><span class="inner"><i class="icon button-icon arrow-large"></i></span></span><span class="button-center">Continue</span></a></div>';
		}
	}
		
	htmlPage+= '</div></div>';
		
	addPageWithHTML(htmlPage);
}

function selectCheckBox(id)
{
	if(document.getElementById("option"+id))
	{
		document.getElementById("option"+id).checked = !document.getElementById("option"+id).checked;
	}
}

function buildStateSelectBox()
{
	var htmlSelect = '<div class="form-fields select"><div class="select-field fullMobile"><div class="select-arrow-container"><div class="select-arrow"></div></div><select id="param_interest" name="interest" onChange="completedStateSelection(this.options[this.selectedIndex].value)"><optgroup>';
	htmlSelect+= '<option value="">Select state</option>';

	for (var i=0;i<usStates.length;i++)
	{
		htmlSelect+= '<option>'+usStates[i].label+'</option>';
	}
	
	htmlSelect+= '</optgroup></select></div></div>';
	
	return htmlSelect;
}

function selectedMultiState()
{
	$("#multistate").append( buildMultiStateSelectBox() );
}

function buildMultiStateSelectBox()
{
	var htmlSelect = '<div class="form-fields select"><div class="select-field fullMobile"><div class="select-arrow-container"><div class="select-arrow"></div></div><select id="param_interest" name="interest" onChange="selectedMultiState()"><optgroup>';
	htmlSelect+= '<option value="">Select state</option>';

	for (var i=0;i<usStates.length;i++)
	{
		htmlSelect+= '<option>'+usStates[i].label+'</option>';
	}
	
	htmlSelect+= '</optgroup></select></div></div><br>';
	
	return htmlSelect;
}

function buildPagesWithJSON(json)
{
	jsonPages = jQuery.parseJSON(json);
	
	buildPageWithPath();
}

// Get width of all pages side-by-side
function totalWidth() {
	return guidePage*pageWidth();
}

// Get page size by measuring the most outer part of slider
function pageWidth()
{
	return $(".guideContainer").width();
}

function setPageWidth()
{
	$(".page").css( "width", pageWidth());
}

// Get the page offset
function currentLeftMargin() {
	var width = $(".guideContainer").width();

    return -((guidePage-1)*width);
}

// Add page
function addPageWithHTML(htmlContent)
{
	guidePage++;
	
	$(".guidePages").css( "width", totalWidth() );
	$(".guidePages").append( htmlContent );
	
	setPageWidth();
	
	$(".guidePages").animate({ marginLeft: currentLeftMargin() }, 300, function () {
	});
}

// Remove page
function back()
{
	if(guidePage<=1){
		window.history.back();
		return;
	}

	if(paths[currentSet].length==0)
	{
		paths.pop();
		currentSet = paths.slice(-1).toString();
		currentSet = '0';
	}
	
	
	paths[currentSet].pop();
	paths[currentSet].pop();

	answers.pop();
	answersSets.pop();

	guidePage--;
	
	var obj = getPath(jsonPages[currentSet]);
	
	if(obj.percentage){
		updateProgess(obj.percentage);
	}
	
	$(".guidePages").stop( true, true ).animate({ marginLeft: currentLeftMargin() }, 300, function () {
		$(".guidePages").children("div[class=page]:last").remove();
		$(".guidePages").css( "width", totalWidth());
	});
}

function selectOption(option)
{
	answers.push(option);
	answersSets.push(currentSet);
	paths[currentSet].push('options');
	paths[currentSet].push(option);
	
	window.scrollTo(0, 0);
	buildPageWithPath();
}

function completedStateSelection(answer)
{
	paths[currentSet].push('options');
	paths[currentSet].push(0);
	answers.push(answer);
	answersSets.push(currentSet);
	
	window.scrollTo(0, 0);
	buildPageWithPath();
}

function updateProgess(progress)
{
	$("#guideProgressBar").animate({ width: progress+'%' }, 300, function () {});
	
	if(progress==100){
		$("#guideProgressBar").removeClass("hasEnd");
	} else {
		$("#guideProgressBar").addClass("hasEnd");
	}
}