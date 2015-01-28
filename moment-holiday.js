(function (){

  var moment = (typeof require !== "undefined" && require !== null) && !require.amd ? require("moment") : this.moment;

  moment.easterDate = function (year) {
    var y = year || this._y || new Date().getFullYear();
    var a = y % 19;
    var b = Math.floor(y / 100);
    var c = y % 100;
    var d = Math.floor(b / 4);
    var e = b % 4;
    var f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4);
    var k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var n = Math.floor((h + l - 7 * m + 114) / 31);
    var p = (h + l - 7 * m + 114) % 31;
    p = Math.round(p + 1);
    console.log(p, n, y);
    return this().month((n - 1)).year(y).date(p);
  };

  moment.goodFriday = function (year) {
    return this.easterDate(year).subtract(2, 'days');
  };

  moment.easterMonday = function (year) {
    return this.easterDate(year).add(1, 'day');
  };

  moment.pentecost = function (year) {
    return this.easterDate(year).add(49, 'days');
  };

  moment.pentecostMonday = function (year) {
    return this.easterDate(year).add(50, 'days');
  };

  moment.ascensionOfChrist = function (year) {
    return this.pentecost(year).subtract(10, 'days');
  };
  moment.corposChristi = function (year) {
    return this.pentecost(year).add(11, 'days');
  }
  moment.greenMonday = function (year) {
    return this.easterDate(year).subtract(48, 'days');
  };
  moment.firstDayOfMay = function (year) {
    var y = year || this._y || new Date().getFullYear();
    return this().date(1).month(5 - 1).year(y);
  }
  moment.shroveTuesday = function (year) {
    return this.greenMonday(year).add(1, 'day');
  }
  moment.ashWendnesday = function (year) {
    return this.greenMonday().add(2, 'days');
  };
  moment.assumption = function (year) {
    var y = year || this._y || new Date().getFullYear();
    return this().date(15).month(8 - 1).year(y);
  };
  moment.dayOfGermanUnity = function (year) {
    var y = year || this._y || new Date().getFullYear();
    return this().date(3).month(10 - 1).year(y);
  };
  moment.allSaintsDay = function (year) {
    var y = year || this._y || new Date().getFullYear();
    return this().date(1).month(11 - 1).year(y);
  };
  moment.christmasEvening = function (year) {
    var y = year || this._y || new Date().getFullYear();
    return this().month(12 - 1).date(24).year(y);
  };
  moment.holyThreeKings = function (year) {
    return this.newYearsDay().add(5, 'days');
  }
  moment.christmasHolidayFirst = function (year) {
    var y = year || this._y || new Date().getFullYear();
    return this().month(12 - 1).date(25).year(y);
  };
  moment.christmasHolidaySecond = function (year) {
    var y = year || this._y || new Date().getFullYear();
    return this().month(12 - 1).date(26).year(y);
  };
  moment.sylvester = function (year) {
    var y = year || this._y || new Date().getFullYear();
    return this().month(12 - 1).date(31).year(y);
  };
  moment.newYearsDay = function (year) {
    var y = year || this._y || new Date().getFullYear();
    return this().month(1 - 1).date(1).year(y);
  };
  
  moment.isWeekDay = function(){
    var dow = this.day();
    return dow > 0 && dow < 6;
  };
  moment.isWeekend = function(){
    return !this.isWeekDay();
  };
  
  moment.isGermanHoliday = function(){
    var check = moment().year(this._y);
    var doy = this.dayOfYear();
    return doy == check.goodFriday().dayOfYear() ||
           doy == check.easterDate().dayOfYear() ||
           doy == check.allSaintsDay().dayOfYear() ||
           doy == check.ascensionOfChrist().dayOfYear() ||
//           doy == check.ashWendnesday().dayOfYear() ||
//           doy == check.assumption().dayOfYear() ||
           doy == check.christmasEvening().dayOfYear() ||
           doy == check.christmasHolidayFirst().dayOfYear() ||
           doy == check.christmasHolidaySecond().dayOfYear() ||
           doy == check.corposChristi().dayOfYear() ||
           doy == check.dayOfGermanUnity().dayOfYear() ||
           doy == check.easterMonday().dayOfYear() ||
           doy == check.firstDayOfMay().dayOfYear() ||
           doy == check.greenMonday().dayOfYear() ||
           doy == check.holyThreeKings().dayOfYear() ||
           doy == check.newYearsDay().dayOfYear() ||
           doy == check.pentecost().dayOfYear() ||
           doy == check.pentecostMonday().dayOfYear() ||
           doy == check.shroveTuesday().dayOfYear() ||
           doy == check.sylvester().dayOfYear();
   
  };
  moment.isBavarianHoliday = function(){
    var check = moment().year(this._y);
    var doy = this.dayOfYear();
    return doy == check.goodFriday().dayOfYear() ||
           doy == check.easterDate().dayOfYear() ||
           doy == check.allSaintsDay().dayOfYear() ||
           doy == check.ascensionOfChrist().dayOfYear() ||
           doy == check.ashWendnesday().dayOfYear() ||
           doy == check.assumption().dayOfYear() ||
           doy == check.christmasEvening().dayOfYear() ||
           doy == check.christmasHolidayFirst().dayOfYear() ||
           doy == check.christmasHolidaySecond().dayOfYear() ||
           doy == check.corposChristi().dayOfYear() ||
           doy == check.dayOfGermanUnity().dayOfYear() ||
           doy == check.easterMonday().dayOfYear() ||
           doy == check.firstDayOfMay().dayOfYear() ||
           doy == check.greenMonday().dayOfYear() ||
           doy == check.holyThreeKings().dayOfYear() ||
           doy == check.newYearsDay().dayOfYear() ||
           doy == check.pentecost().dayOfYear() ||
           doy == check.pentecostMonday().dayOfYear() ||
           doy == check.shroveTuesday().dayOfYear() ||
           doy == check.sylvester().dayOfYear();
  };
  
  if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    module.exports = moment;
  }

}).call(this);

