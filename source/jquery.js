var i = 0;
var IMAGES = ["beagle.jpeg", "pug.jpeg"];
var CATS = ["cat1.png", "cat2.png", "cat3.png", "cat4.png", "cat5.png"]
var clicked = 0;

$(document).ready(function () {

	$("div.out").on("mouseover", function() {
		$("div.out p:first").text("mouse over");
		$("div.out p:last").text(++i);
	})

	$("div.out").on("mouseout", function() {
		$("div.out p:first").text("mouse out");
	})

	$("#b1").on("click",
		{
			url: "https://www.google.com",
			winattributes: "resize=1, scrollbars=1, status=1"
		},
		max_open
	);
	
	$( "#bind" ).click(function() {
		$("body")
		.on("click", "#theone", flash)
		.find("#theone")
		.text( "Can Click!");

	});

	$( "#unbind" ).click(function() {
		//$("#theone").click(flash);
		//$("#theone").text( "Does nothing...");
		$("body")
		.off("click", "#theone", flash)
		.find("#theone")
		.text( "Does nothing...");

	});

	$(".main-menu").mouseover(function () {
		$(this).css({"font-size":"20px", "background-color":"green"});
		}
	);

	$(".main-menu").mouseout(function () {
		$(this).css({"font-size":"16px", "background":"none"});
		}
	);

	$("#trigger_test button:first").click(
		function () {
			update($("#trigger_test span:first"));
		}
	);

	$("#trigger_test button:last").click(
		function () {
			$("#trigger_test button:first").trigger("click");
			update($("#trigger_test span:last"));
		}
	);

	$("#imageArea").click(
		function () {
			changeImage($("#imageArea img"));
		}
	);

	$("#imgAlbum").click(
		function () {
			clicked++;
			runCat($(this));
		}
	);

	$("#add_img").click(
		showNoteForm
	);

	$("#add_note").click(
		function () {
			makeNote($("#note_form"));
		}
	);

	$(window).resize(
		function () {
			change_position($(".popup"));
		}
	);

	$("#moving_button").click(
		move_box
	);


	$(".accordion").each(function () {
		var dl = $(this);
		var alldd = dl.find("dd");
		var alldt = dl.find("dt");

		function closeAll() {
			alldd.addClass("closed");
			alldt.addClass("closed");
		}

		function open(dt, dd) {
			dt.removeClass("closed");
			dd.removeClass("closed");
		}

		// alldd.hide();
		closeAll();

		alldt.click(function () {
			var dt = $(this);
			var dd = dt.next();

			closeAll();
			
			// $(this).next().show;
			open(dt, dd);
		})
	});

	var interval = 3000;

	$(".slideshow").each(function() {
		var timer;
		var container = $(this);
		
		function switchImg() {
			var imgs = container.find('img');
			var first = imgs.eq(0);
			var second = imgs.eq(1);
			first.appendTo(container).fadeOut(2000);
			// container.append(first);
			second.fadeIn();
		}

		function startTimer() {
			timer = setInterval(switchImg, interval);
		}

		function stopTimer() {
			clearInterval(timer);
		}

		setInterval(switchImg, interval);

		container.hover(stopTimer, startTimer);
		startTimer();
	})

	$("#getText1").click( function () {
		$("#textbox").text("글자 입력 테스트");

		// var req = $.ajax("data.txt");
		// var req = $.ajax("data.json");

		var req = $.ajax({
			url: "data.txt",
			dataType: "json"
		})

		req.done(function (data, status) {
			// var student = JSON.parse(data);
			for (var i=0; i<data.length; i++) {
				var str = "<br>"+data[i].name
				$("#textbox").append(str);
			}
		})
	})

	$("#getText2").click( function () {
		$("#textbox").text("글자 입력 테스트");

		var req = $.ajax({
			url: "data.txt",
			dataType: "json"
		})

		req.done(function (data, status) {
			var tb = $("<table />");
			var row = $("<tr />").append(
				$("<th />").text("이름"),
				$("<th />").text("학번"),
				$("<th />").text("학과"),
				$("<th />").text("수업"),
				$("<th />").text("번호")
			);
			tb.append(row);

			for (var i=0; i<data.length; i++) {
				var name = data[i].name;
				var id = data[i].id;
				var dpt = data[i].department;
				var cls = data[i].class;
				var phone = data[i].phone;

				var sub = "";

				for (var j=0; j<cls.length; j++) {
					if (j < (cls.length - 1)) sub += cls[i] + ",";
					else sub += cls[i];
				}

				row = $("<tr />").append(
					$("<td />").text(name),
					$("<td />").text(id),
					$("<td />").text(dpt),
					$("<td />").text(sub),
					$("<td />").text(phone)
				)
				tb.append(row);
			}
			$("#textbox").append(tb);
		})
	})

	var req = $.ajax({
		url: "/rss",
		dataType: "xml"
		});
	req.done(function(data) {
		var items = $(data).find("item");
		if (items.length > 0) {
			items = items.slice(0,5);
			var uTag = $("<ul />");
			items.each(function() {
				var item = $(this);
				var lk = item.find("link").text();
				var title = item.find("title").text();
				var aTag = $("<a />")
				.attr({
					"href": lk,
					"target": "_blank"
				})
				.text(title);
				var liTag = $("<li />").append(aTag);
				uTag.append(liTag);
			});
			$("#news").html(uTag);
		}
	});
	req.fail(function (jqXHR, textStatus){
		alert("failed: " + textStatus);
	});

	var req = $.ajax({
		url: "/rss/youtube",
		dataType: "xml"
		});
	req.done(function(data) {
		var items = $(data).find("item");
		if (items.length > 0) {
			items = items.slice(0,5);
			var uTag = $("<ul />");
			items.each(function() {
				var item = $(this);
				var lk = item.find("link").text();
				var title = item.find("title").text();
				var sub = item.find("subnail");
				var aTag = $("<a />")
				.attr({
					"href": lk,
					"target": "_blank"
				})
				var img = $("<img />").attr("src":sub);
				var liTag = $("<li />").append(aTag, img);
				uTag.append(liTag);
			});
			$("#youtube").html(uTag);
		}
	});
	req.fail(function (jqXHR, textStatus){
		alert("failed: " + textStatus);
	});

});

function max_open(event) {
	var maxwindow = window.open(event.data.url, "", event.data.winattributes);
	maxwindow.moveTo(0,0);
	maxwindow.resizeTo(screen.availWidth, screen.availHeight);
}

function flash() {
	$("#off_test").show().fadeOut("slow");
}


function update(s) {
	var x = parseInt(s.text(), 10);
	s.text(x+1);
}

function changeImage(s) {
	if (s.attr("src") == IMAGES[0]) {
		s.attr("src", IMAGES[1]);
		return;
	}
	s.attr("src", IMAGES[0]);
}

function runCat(s) {
	var i = (clicked - 1) % 5;
	s.attr("src", CATS[i]);
}

function showNoteForm() {
	// $("#note_form").attr("class", "popup");
	$("#note_form").addClass("popup");
	change_position($(".popup"));
	// $("#note_form").css("display", "block");		// show()
	$("#note_form").slideDown();
}

function makeNote() {
	var title = $("#note_title").val();
	var date = $("#note_date").val();
	var content = $("#note_content").val();

	var str = "<div>" + "<p>제목: "+title+"</p>"+"<p>날짜: "+date+"</p>"+"<p>"+content+"</p>" + "</div><br>";
	$("#schedule").append(str);
	// $("#note_form").css("display", "none");			// hide();
	$("#note_form").slideUp();

	$("#note_title").val("");
	$("#note_date").val("");
	$("#note_content").val("");
}

function change_position(s) {
	var l = ($(window).width() - s.width())/2;
	var t = ($(window).height() - s.height())/2;
	s.css({"top": t, "left": l});
}

function move_box() {
	var h = $("#moving_box").height();
	var w = $("#moving_box").width();

	if (w+50 <= $("#animation_test").width()) {
		$("#moving_box").animate({
			right: "0px",
			height: "+=50px",
			width: "+=50px"
			}
		);
		$("#animation_test").animate(
		{
			height: "+=50px"
		})
	}
}
