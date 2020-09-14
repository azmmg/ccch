   const fillTeasers = (teaserRow,teaserNumber,teaser) => {
    //console.log(teaserRow,teaserNumber,teaser);
    const teaserPath = `#teaserrow${teaserRow} > div:nth-child(${teaserNumber}) > div > div.col.p-4.d-flex.flex-column.position-static > `;
	const tags = ['strong','h3','div','p','img','a'];
	for (t=0;t<tags.length;t++) {
	    if (tags[t]=='a') {
		   $(teaserPath+`${tags[t]}`).html("Weiterlesen");
		}
	    else {
		   $(teaserPath+`${tags[t]}`).html(teaser[tags[t]]);
		};
		$(`#teaserrow${teaserRow} > div:nth-child(${teaserNumber}) > div > div.col-auto.d-none.d-lg-block > img`).attr("src",'images/'+teaser["img"]);
		$(`#teaserrow${teaserRow} > div:nth-child(${teaserNumber}) > div > div.col.p-4.d-flex.flex-column.position-static > a`).each(function() {
		   $(this).attr("href",teaser["a"])
		})
	}
  }
  
  $("document").ready(function() {
    $.getJSON( "teasers2.json", function( data ) {
       $("#meta_description").attr("content","Content for Description");
       $("#page_title").attr("content","Page Title");
	   let teaserList = [data["R4-T2"],data["R4-T1"],data["R3-T1"],data["R3-T2"]];
	   //let teaserPair = [null,teaserList[2],teaserList[0]]
	   for (tr=0;tr<2;tr++){
		for (tn=1;tn<3;tn++) {
		    console.log(2*tr+tn);
			fillTeasers(tr+1,tn,teaserList[2*tr+tn-1]);
		}
	   }
    });
  });