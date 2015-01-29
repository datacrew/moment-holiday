/**
 * moment-holiday.js
 * moment-holiday is a plugin for moment.js, which is able to calculate holidays.
 * Currently only german and bavarian holidays are implemented.
 * 
 * This software comes without any warrenty. 
 * Feel free to use it, if you find it useful. 
 */
(function (){

  var moment = (typeof require !== "undefined" && require !== null) && !require.amd ? require("moment") : this.moment;
  
  /**
   * easterDate
   * Calculate the easter date 
   * 
   * @param {int} year Optionial
   * @returns Moment 
   */

  moment.easterDate = function (year) {
    var y = year || this._y || new Date().getFullYear();
    var a = y % 19;
    var b = Math.floor(y / 100);
    var c = y % 100;
    var d = Math.floor(b / 4);
    var e = b % 4;
    var f = Math.floor((b+ 8) / 25);
    var g = Math.floor((b - f + 1) / 3);
    var h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4);
    var k = c % 4;
    var l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var n = Math.floor((h + l - 7 * m + 114) / 31);
    var p = (h + l - 7 * m + 114) % 31;
    p = Math.round(p + 1);
    return this().month((n - 1)).year(y).date(p);
  };

  /**
   * goodFriday
   * Karfreitag 
   * 
   * Always 2 days before easter sunday
   * 
   * @param {int} year
   * @returns {moment-holiday_L1.moment@call;easterDate@call;subtract}
   */

  moment.goodFriday = function (year) {
    return this.easterDate(year).subtract(2, 'days');
  };

  /**
   * easterMonday
   * Ostermontag
   * Always one day after easter sunday
   * @param {int} year
   * @returns {moment-holiday_L1.moment@call;easterDate@call;add}
   */
  moment.easterMonday = function (year) {
    return this.easterDate(year).add(1, 'day');
  };

  /**
   * pentecost
   * Pfingsten (Pfingstsonntag)
   * Alwasy 49 days after easter sunday
   * @param {int} year
   * @returns {moment-holiday_L1.moment@call;easterDate@call;add}
   */

  moment.pentecost = function (year) {
    return this.easterDate(year).add(49, 'days');
  };

  /**
   * pentecostMonday
   * Pfingstmontag 
   * Always 50 days after easter sunday. 
   * Can also be 49 days after easter monday, or one day after pentecost sunday.
   * 
   * @param {int} year
   * @returns {moment-holiday_L1.moment@call;easterDate@call;add}
   */
  moment.pentecostMonday = function (year) {
    return this.easterDate(year).add(50, 'days');
  };

  /**
   * ascensionOfChrist
   * Christi Himmelfahrt
   * Always ten days before pentecost. Must be a thursday.
   * 
   * @param {int} year
   * @returns {moment-holiday_L1.moment@call;pentecost@call;subtract}
   */
  moment.ascensionOfChrist = function (year) {
    return this.pentecost(year).subtract(10, 'days');
  };
  /**
   * corpusChristi
   * Fronleichnam
   * 11 days after pentecost, also 21 days after ascensionOfChrist.
   * 
   * @param {type} year
   * @returns {moment-holiday_L1.moment@call;pentecost@call;add}
   */
  moment.corposChristi = function (year) {
    return this.pentecost(year).add(11, 'days');
  };
  /**
   * greenMonday
   * Rosenmontag
   * 48 before easter sunday
   * @param {int} year
   * @returns {moment-holiday_L1.moment@call;easterDate@call;subtract}
   */
  moment.greenMonday = function (year) {
    return this.easterDate(year).subtract(48, 'days');
  };
  /**
   * firstDayOfMay
   * Mai-Feiertag
   * always on the first day in may.
   * @param {int} year
   * @returns {Moment}
   */
  moment.firstDayOfMay = function (year) {
    var y = year || this._y || new Date().getFullYear();
    return this().date(1).month(5 - 1).year(y);
  };
  
  /**
   * shroveTuesday
   * Faschingsdienstag
   * 
   * @param {int} year
   * @returns {moment-holiday_L1.moment@call;greenMonday@call;add}
   */
  moment.shroveTuesday = function (year) {
    return this.greenMonday(year).add(1, 'day');
  };
  /**
   * ashWednesday 
   * Aschermittwoch
   * 
   * @param {int} year
   * @returns {moment-holiday_L1.moment@call;greenMonday@call;add}
   */
  
  moment.ashWednesday = function (year) {
    return this.greenMonday().add(2, 'days');
  };
  
  /**
   * assumption
   * Maria Himmelfahrt
   * @param {int} year
   * @returns {Moment}
   */
  moment.assumption = function (year) {
    var y = year || this._y || new Date().getFullYear();
    return this().date(15).month(8 - 1).year(y);
  };
  /**
   * dayOfGermanUnity
   * Tag der deutschen Einheit
   * @param {int} year
   * @returns {Moment}
   */
  moment.dayOfGermanUnity = function (year) {
    var y = year || this._y || new Date().getFullYear();
    return this().date(3).month(10 - 1).year(y);
  };
  /**
   * allSaintsDay
   * Allerheiligen
   * 
   * @param {int} year
   * @returns {Moment}
   */
  
  moment.allSaintsDay = function (year) {
    var y = year || this._y || new Date().getFullYear();
    return this().date(1).month(11 - 1).year(y);
  };
  /**
   * christmasEvening
   * Heilig Abend
   * @param {int} year
   * @returns {Moment}
   */
  
  moment.christmasEvening = function (year) {
    var y = year || this._y || new Date().getFullYear();
    return this().month(12 - 1).date(24).year(y);
  };
  /**
   * holyThreeKings
   * Heilige Drei Koenige
   * @param {int} year
   * @returns {moment-holiday_L1.moment@call;newYearsDay@call;add}
   */
  
  moment.holyThreeKings = function (year) {
    return this.newYearsDay().add(5, 'days');
  };
  /**
   * christmasHolidayFirst 
   * 1. Weihnachtsfeiertag
   * @param {int} year
   * @returns {Moment}
   */
  moment.christmasHolidayFirst = function (year) {
    var y = year || this._y || new Date().getFullYear();
    return this().month(12 - 1).date(25).year(y);
  };
  /**
   * christmasHolidaySecond
   * 2. Weihnachtsfeiertag
   * @param {int} year
   * @returns {Moment}
   */

  moment.christmasHolidaySecond = function (year) {
    var y = year || this._y || new Date().getFullYear();
    return this().month(12 - 1).date(26).year(y);
  };
  /**
   * sylvester
   * Sylvester
   * @param {int} year
   * @returns {Moment}
   */
  
  
  moment.sylvester = function (year) {
    var y = year || this._y || new Date().getFullYear();
    return this().month(12 - 1).date(31).year(y);
  };
  /**
   * newYearsDay
   * Neujahr
   * @param {int} year
   * @returns {Moment}
   */
  moment.newYearsDay = function (year) {
    var y = year || this._y || new Date().getFullYear();
    return this().month(1 - 1).date(1).year(y);
  };
  
  /**
   * isWeekDay
   * @returns {Boolean}
   */
  
  moment.isWeekDay = function(){
    var dow = this.day();
    return dow > 0 && dow < 6;
  };
  /**
   * isWeekend
   * @returns {Boolean}
   */
  
  moment.isWeekend = function(){
    return !this.isWeekDay();
  };
  /**
   * isGermanHoliday
   * @returns {Boolean}
   */
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
  /**
   * isBavarianHoliday
   * @returns {Boolean}
   */
  
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

