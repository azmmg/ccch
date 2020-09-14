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
  
  const makeRow = (rw,tw) => {
	const fillTeaser = (t_id,tsr,teaser_content) => {
	    if (typeof teaser_content != "undefined") { // Wenn kein teaser_content definiert ist, wird der Input einfach zurückgegeben
		   tsr.find('a').html('Weiterlesen');
		   tsr.find('a').attr("href",teaser_content["a"]);
		   tsr.find('img').attr("src",'images/'+teaser_content["img"]);
		   tsr.find('strong.text-primary').html(t_id+' '+teaser_content["strong"]);
		   tsr.find('h3').html(teaser_content["h3"]);
		   tsr.find('div.text-muted').html(teaser_content["div"]);
		   tsr.find('p').html(teaser_content["p"]);
		}
		return tsr;
    }
    let row = $('<div class="row mb-2" class="t_row"></div>');
	row.attr("id","teaserrow_"+rw)
	const teaser_inner_html = '<div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"><div class="col p-4 d-flex flex-column position-static"><strong class="d-inline-block mb-2 text-primary">Kategorie (1)</strong><h3 class="mb-0">Überschrift (1)</h3><div class="mb-1 text-muted">Datum (1)</div><p class="card-text mb-auto">Lead (1)</p><a href="href-1" class="stretched-link">Linktext (1)</a></div><div class="col-auto d-none d-lg-block"><img src="images/placeholder_200x250.png" alt="teaser image 1"></div></div>';
    for (let t=0;t<2;t++) {
	    const tId = `R${rw}-T${t+1}`;
	    console.log('tw[t]',tId);
	    teaser = $(`<div class="col-md-6 teaser" id="${tId}" data-tsid="${tId}"></div>`);
		teaser.append($(teaser_inner_html));
		teaser = fillTeaser(`<span style="color:#777">${tId}</span>`,teaser,tw[t]);
	    row.append(teaser);
	}
	return row;
  };
  
  const makeTableRow = (scl,arr) => {
    return `<tr><td class="cell c_curr">${scl}</td><td class="cell prnx c_prev">${arr[0]}</td><td class="cell prnx c_next">${arr[1]}</td></tr>`;
  }
  
  $("document").ready(function() {
    $.getJSON( "teasers2.json", function( data ) {
	  let teaser_arr = Object.keys(data).sort();
	  // Zum Testen: teaser_arr.push('Dummy1'); 
	  let twins = [];
      for (let i=0;i<teaser_arr.length;i+=2) {
	    twins[i/2] = [data[teaser_arr[i]],data[teaser_arr[i+1]]];
	  };
	  for (let r=0;r<twins.length;r++) {
	    $("#teaser_container").append(makeRow(r+1,twins[r]));
	  };
	  let myJson = {};
	  for (x in teaser_arr) {
	    pn = selectPair(x,teaser_arr.length)
		myJson[teaser_arr[x]] = {"previous" : teaser_arr[pn[0]], "next" : teaser_arr[pn[1]]};
	    $("#tbldiv > table > tbody").append(makeTableRow(teaser_arr[x],[teaser_arr[pn[0]],teaser_arr[pn[1]]]));
	  }
	  $("#jsondiv").html('<strong>JSON:</strong><br>'+JSON.stringify(myJson));
    });
	$("#deleteme").remove();
  });
