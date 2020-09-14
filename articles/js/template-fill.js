 const getPostId = (sParam) => {
    let sPageURL = window.location.search.substring(1);
    let sURLVariables = sPageURL.split('&');
    let sParameterName;
    for (let i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
  };
  
  const selectPair = (curr,len) => {
    curr = Number(curr);
	let next;
	let first = 0;
	let last = len-1;
	if (curr == first) {
	    // console.log(curr,'First');
		prev = curr + 1;
		next = curr + 2;
	} else if (curr ==  last) {
	    // console.log(curr,'Last');
		prev = curr - 2;
		next = curr - 1;
	} else {
		prev = curr - 1;
		next = curr + 1;
	};
    return [prev,next]
  };
  
  const whoAmI = (articleID,teasers) => {
    //console.log('teasers',teasers);
    let index = -1;
    for (let t in teasers) {
	  //console.log(t);
	  index++;
	  if (teasers[t]["a"] == articleID+'.html') return [index,t];
	}
	return [index,'not found'];
  };
  
  const fillTeasers = (teaserNumber,teaser) => {
    //console.log(teaser);
    const teaserPath = `body > div > div.row.mb-2 > div:nth-child(${teaserNumber}) > div > div.col.p-4.d-flex.flex-column.position-static > `;
	const tags = ['strong','h3','div','p','img','a'];
	for (t=0;t<tags.length;t++) {
	    if (tags[t]=='a') {
		   $(teaserPath+`${tags[t]}`).html("Weiterlesen");
		}
	    else {
		   $(teaserPath+`${tags[t]}`).html(teaser[tags[t]]);
		};
		$(`body > div > div.row.mb-2 > div:nth-child(${teaserNumber}) > div > div.col-auto.d-none.d-lg-block > img`).attr("src",'images/'+teaser["img"]);
		$(`body > div > div.row.mb-2 > div:nth-child(${teaserNumber}) a`).each(function() {
		   $(this).attr("href",teaser["a"])
		})
	}
  }
  
  $("document").ready(function() {
	let blogPost = (typeof getPostId('blogpost') == "undefined") ? `00000000` : `blogpost-${getPostId('blogpost')}-1`;
    $.getJSON( "teasers2.json", function( data ) {
	   //console.log(data);
	   let teaserIds = Object.keys(data);
	   let thisPost = whoAmI(blogPost,data)[1];
	   let thisTeaserNr = whoAmI(blogPost,data)[0];
	   let pn = selectPair(thisTeaserNr,teaserIds.length);
	   //console.log('thisTeaserNr',thisTeaserNr,'pn',pn,thisPost,teaserIds[pn[1]],teaserIds[pn[0]]);
	   let teaserPair = [null,data[teaserIds[pn[1]]],data[teaserIds[pn[0]]]];
	   for (tn=1;tn<3;tn++) {
	     fillTeasers(tn,teaserPair[tn]);
	   }
    });
    $.getJSON( "articles.json", function( data ) {
	   if (typeof data[blogPost] == 'undefined') alert('Die Seite sollte mit dem Parameter blogpost=yyyymmdd aufgerufen werden');
	   $("head > title").html(data[blogPost]["article_title"]);
	   $("#meta_description").attr("content",data[blogPost]["article_description"]);
	   $("#page_specific_style").html("<!-- page specific style -->");
       $("main > div.row > div.blog-main ").append(data[blogPost]["blog-main"]);
	   $("body > div > header > div > div.col-4.text-center > a").html(data[blogPost]["article_category"])
	});
  });
