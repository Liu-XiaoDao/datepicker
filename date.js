(function () {
	var datepicker = {};

	datepicker.getMonthData = function (year,month) {
		var ret = [];
		if (!year || !month) {
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}

		var firstDay = new Date(year,month - 1, 1); //想要的月的第一天(下面称为本月)
		var firstDayWeekDay = firstDay.getDay(); //本月第一天是星期几
		if (firstDayWeekDay === 0) firstDayWeekDay = 7; //(星期天是0)在设置为7

		year = firstDay.getFullYear();
		month = firstDay.getMonth() + 1;

		var lastDayOfLastMonth = new Date(year,month - 1, 0);//上个月的最后一天
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();//上个月最后一天是几号

		var preMonthDayCount = firstDayWeekDay - 1;//显示上一个月的几天

		var lastDay = new Date(year,month,0);//本月的最后一天
		var lastDate = lastDay.getDate();//本月的最后一天是星期几

		for (var i = 0; i<7*6; i++) {
			var date = i + 1 - preMonthDayCount;
			var showDate = date;
			var thisMonth = month;

			if (date <= 0) {
				thisMonth = month - 1;
				showDate = lastDateOfLastMonth + date;
			}else if(date > lastDate){
				thisMonth = month + 1;
				showDate = showDate - lastDate;
			}

			if (thisMonth === 0) thisMonth = 12;
			if (thisMonth === 13) thisMonth = 1;

			ret.push({
				month: thisMonth,
				date: date,
				showDate: showDate
			});
		}

		return {
			year: year,
			month: month,
			days: ret
		};

	}

	window.datepicker = datepicker;
})();
