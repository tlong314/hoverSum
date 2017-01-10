/**
 * @file hoverSum.js
 * @description A tool for adding numbers on a webpage together, simply by hovering over them.
 * @author Tim S. Long
 * @modified Jan 9, 2017
 * @license MIT License
 * @example 
 *
 * var hs = hoverSum();
 *
 */
;var hoverSum = (function(){
	// Format number to standard US currency.
	var formatToCurrency = function(num, include$){
		if(!num) {
			return "0.00";
		}
		
		var neg = num < 0 ? true : false;
		num = Math.abs(num);
		
		var change = num.toFixed(2).split("."),
			dollars = change[0], cents = change[1],
			dollarsRev = dollars.split("").reverse();

		for(var i = 3; i < dollarsRev.length; i += 3) {
			dollarsRev.splice(i, 0, ",");
			i++;
		}

		return (include$ ? "$" : "") + dollarsRev.reverse().join("") + "." + cents;
	}; // End formatToCurrency()

	var runningSum = 0,
		span = document.createElement("SPAN");
	
	span.id = "hoverSumSpan";
	span.style = "position: absolute; height: 15px; font: 12px Times New Roman; z-index: 999; top: 0; left: 0; border: 1px solid blue; color: #333; background: white; padding: 4px; border-radius: 4px;";
	span.innerHTML = formatToCurrency(runningSum, true);
	span.onclick = function() {
		runningSum = 0;
		span.innerHTML = formatToCurrency(runningSum, true);
		var afflicted = document.getElementsByClassName("hoverCounted"),
			i = afflicted.length;
		
		while(i--) {
			afflicted[i].classList.remove("hoverCounted");
		}
	};

	document.body.append(span);
	
	var hoverSum = function() {
		window.addEventListener("mousemove", function(e) {
			var t = e.target,
				text = t.innerText.replace(/,|\$/g, ""),
				num = parseFloat(text);
				
			if(isNaN(num)) {
				return;
			}

			if(/[^0-9]/.test(text)) { // For instance, dates like 6/22/14
				return;
			}
			
			if(!t.classList.contains("hoverCounted")) {
				runningSum += num;
				t.classList.add("hoverCounted");
				span.style.left = e.clientX + 30 + "px";
				span.style.top = document.body.scrollTop + e.clientY - 40 + "px";
				span.innerHTML = formatToCurrency(runningSum, true);
				console.log(runningSum, e.clientX, e.clientY);
			}
		}, false);
	} // End hoverSum()
	
	return hoverSum;
}());