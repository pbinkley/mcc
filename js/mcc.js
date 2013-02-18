var firstVisit;
function CheckTop () {
	//force into frame
  var loaded = true;
  firstVisit = true;
//  alert ("CheckTop\nfirstVisit="+firstVisit);
	if (top.location != self.location) {
//    alert ("Reloading in top frame");
    top.location = self.location;
  }
  LoadCalendar(parent.DefaultCalSource);
}

var BrowserName;
var BrowserVersion;

function checkBrowser() {
	BrowserName = navigator.appName;
	BrowserVerstion = navigator.userAgent;
	
}


var CalendarArray = new Array;
CalendarArray [0] = new Array;
CalendarArray[0][0] =  "calendars/mcc_generic.html";
CalendarArray[0][1] =  "Generic";
CalendarArray[1] = new Array;
CalendarArray[1][0] = "calendars/mcc_printable.html";
CalendarArray[1][1] = "Printable";
CalendarArray [2] = new Array;
CalendarArray[2][0] = "calendars/mcc_hereford.html";
CalendarArray[2][1] = "Hereford Use";
CalendarArray [3] = new Array;
CalendarArray [3][0] = "calendars/mcc_lynn.html";
CalendarArray [3][1] = "Nicholas of Lynn";
CalendarArray [4] = new Array;
CalendarArray [4][0] = "custom";
CalendarArray [4][1] = "Custom";

var Year;
var Easter;
var DominicalLetter;
var GoldenNumber;
var Offset;
var LeapDomLet;
var WeekDayOffset;
var debugWindow;

var OldCalSource = "";
var DefaultCalSource = "calendars/mcc_generic.html";

var CalendarName;
var CalendarSource;
var CalendarCreator;
var CalendarCreatorEmail;
var CalendarNotes = new Array;
var WeekDayName = new Array;
var MonthName = new Array;
var MonthAbbr = new Array;
var LatDayName = new Array;
var TopFeastClass;
var FeastClassTextColor = "white";
var FeastClassColor = new Array;
var FeastClassName = new Array;
var Sept;
var Sex;
var Quin;
var Quad = new Array;
var Pass;
var Palm;
var Easter;
var Pascha = new Array;
var Ascen;
var Pent;
var Trinity;
var TrinSun = new Array;
var Advent = new Array;
var Epiph = new Array;
var Shrove;
var Ash;
var GoodFri;
var Ascension;
var CorpusC;
var Ember = new Array;

var YearData = new Array(2);
// true = leap year; false = common year
YearData [false] = new Object;
YearData [true] = new Object;

YearData[false].MonthSt = new Array (0,1,32,60,91,121,152,182,213,244,274,305,335,366);

YearData[false].MonthLength = new Array (0,31,28,31,30,31,30,31,31,30,31,30,31);

YearData[true].MonthSt = new Array (0,1,32,61,92,122,153,183,214,245,275,306,336,367);

YearData[true].MonthLength = new Array (0,31,29,31,30,31,30,31,31,30,31,30,31);

var LeapYear = true; //start true so can create immovable on Feb. 29

function CreateYearArray() {
	if (typeof (YearArray) != "undefined") {
		delete YearArray;
	}
	YearArray = new Array (366);
	for (i=1; i<=366; i++)
	YearArray[i] = new DayOfYear(i);
}

CreateYearArray();

function MakeDefault() {
	//sets a cookie containing the url of the chosen default calendar
	var agree = false;
	agree = confirm ("The address of your chosen default calendar ("+CalendarName+") will be stored as a cookie on your system. If you object to cookies, click 'Cancel'.");
	if (agree) {
		s = lowerFrame.location.href;
		var expireDate = new Date;
		expireDate.setMonth (expireDate.getMonth()+1);
		//    expireDate = Date (2005,1,1);
		//    alert ("Expiry date:\n"+expireDate.toGMTString());
		document.cookie = "defaultCalendar="+escape(s)+"; expires="+expireDate.toGMTString();
	}
}

function GetDefault(s) {
	if (document.cookie != "") {
		var cookies = document.cookie.split(";");
		var parts;
		for (var i = 0; i < cookies.length; i++) {
			parts = cookies[i].split("=");	
			if (parts[0] == "defaultCalendar") 
				DefaultCalSource = unescape(parts[1]);
		}
	}
	else
	DefaultCalSource = CalendarArray [0][0];
}

GetDefault("mcc.htm head");

function DayOfYear (d) {
	this.d = d;
	I = 12;
	this.Mon = 0;
	while (this.Mon == 0) {
		if (d >= YearData[LeapYear].MonthSt [I]) {
			this.Mon = I;
			this.Day = d - YearData[LeapYear].MonthSt [I] + 1;
		}
		I--;
	}
}

EasterTable = new Array (20)
for (i=1; i<=19; i++) {
	EasterTable [i] = new Array (2)
}
EasterTable [1][0] = 5
EasterTable [1][1] = 16
EasterTable [2][0] = 1
EasterTable [2][1] = 5
EasterTable [3][0] = 6
EasterTable [3][1] = 24
EasterTable [4][0] = 2
EasterTable [4][1] = 13
EasterTable [5][0] = 5
EasterTable [5][1] = 2
EasterTable [6][0] = 3
EasterTable [6][1] = 21
EasterTable [7][0] = 6
EasterTable [7][1] = 10
EasterTable [8][0] = 4
EasterTable [8][1] = 29
EasterTable [9][0] = 7
EasterTable [9][1] = 18
EasterTable [10][0] = 3
EasterTable [10][1] = 7
EasterTable [11][0] = 1
EasterTable [11][1] = 26
EasterTable [12][0] = 4
EasterTable [12][1] = 15
EasterTable [13][0] = 7
EasterTable [13][1] = 4
EasterTable [14][0] = 5
EasterTable [14][1] = 23
EasterTable [15][0] = 1
EasterTable [15][1] = 12
EasterTable [16][0] = 4
EasterTable [16][1] = 1
EasterTable [17][0] = 2
EasterTable [17][1] = 20
EasterTable [18][0] = 5
EasterTable [18][1] = 9
EasterTable [19][0] = 3
EasterTable [19][1] = 28

DomLetTable = new Array(1,6,5,4,3,1,7,6,5,3,2,1,7,5,4,3,2,7,6,5,4,2,1,7,6,4,3,2);

DomLetName = new Array ("X","A","B","C","D","E","F","G")

Advent = new Array (5)
Epiph = new Array (7)
Quad = new Array (5)
Pascha = new Array (7)
TrinSun = new Array (28)
Ember = new Array (13)

/******************************/

function AdjustYear (newStatus) {
	//newStatus: boolean: true = leap year, false = common year
//  alert ("AdjustYear\n\nLeapYear: " + LeapYear + "\nnewStatus: " + newStatus);
	with (YearData[LeapYear]) {
		if (newStatus != LeapYear) { //otherwise no adjustment needed
			if (LeapYear) { // change from leap year to common
//          alert ("Change from leap year to common");
				HoldDay = YearArray [MonthSt[3]-1];
				for (i=MonthSt[3]-1; i < MonthSt[13]-1; i++) {
					YearArray [i] = YearArray [i+1];
					YearArray [i].d = i;
				}
				YearArray [366] = HoldDay;
			}
			else { //change from common to leap year
//          alert ("Change from common to leap year\n\nMonthSt[13]=" + MonthSt[13] + "\nMonthSt[3]="+MonthSt[3]);
				HoldDay = YearArray [366]; //where 29 Feb. is stored
				for (i=MonthSt[13]; i > MonthSt[3]; i--) {
           // alert ("i=" + i + "\nYearArray[i]=" + YearArray[i]);
					YearArray [i] = YearArray [i-1];
					YearArray [i].d = i;
				}
				YearArray [MonthSt[3]] = HoldDay;
			}
			LeapYear = newStatus;
		}
	}
}

/******************************/
//Nonae for Roman calendar
MonthNo = new Array (0,5,5,7,5,7,5,7,5,5,7,5,5);

RomanNumeral = new Array ("","i","ii","iii","iv","v","vi","vii","viii","ix","x",
	"xi","xii","xiii","xiv","xv","xvi","xvii","xviii",
"xix","xx");

function ConvertDate (x) {
	var Day;
	var Mon;
	var I;
	var Temp;
	if (x < 1000) {
		I = 12;
		Mon = 0;
		while (Mon == 0) {
			if (x >= YearData[LeapYear].MonthSt [I]) {
				Mon = I;
				Day = x - YearData[LeapYear].MonthSt [I] + 1;
			}
			I = I - 1;
		}
		return MonthAbbr [Mon] + ' ' + Day;
	}
	else {
		if (x == 1000) {
			return "(?)";
		}
		else {
			return MonthAbbr [x - 1000];
		}
	}
}

function WeekDay (d) {
	x = d % 7;
	if (x == 0) x = 7;
	x = x + WeekDayOffset;
	if (x > 7) x -= 7;
	if (x < 1) x += 7;
	return (x);
}

/****************************************************/
/* YearArray object                                 */

function MovableFeast (name,r) {
	this.Name = name;
	if (typeof(r) != "undefined") {
		this.Rank = r;
	}
	else {
		this.Rank = Math.round (TopFeastClass/2);
	}
	//  if (typeof(this.Rank)=="undefined") {
		//    debugWindow.document.writeln ("Undefined rank: "+this.Name+"<br>");
	//  }
}

function ImmovableFeast (name, r, y) {
	this.Name = name;
	if (typeof(r) != "undefined") {
		this.Rank = r;
	}
	else {
		this.Rank = Math.round (TopFeastClass/2);
	}
	if (typeof (y) != "undefined") {
		this.YearStart = y;
	}
	else {
		this.YearStart = 0;
	}
}

function DateString () {
	return (MonthAbbr [this.Mon] + " " + this.Day);
}

function ComposeName () {
	//method of YearArray objects
	//produces day name for month table
	var s="";
	if (typeof (this.Movable) != "undefined") {
		if (typeof (this.Movable.Name) != "undefined") {
			s += this.Movable.Name;
		}
	}
	if (typeof (this.Immovable) != "undefined") {
		if (typeof(this.Movable) != "undefined") {
			s += "<br>";
		}
		s += this.Immovable.Name;
	}
	return (s);
}

function ComposeHint () {
	//method of YearArray objects
	var s="";
	s = this.DateString();
	if (typeof (this.Movable) != "undefined") {
		if (typeof (this.Movable.Name) != "undefined") {
			s += ": "+this.Movable.Name + " (" + FeastClassName [this.Movable.Rank] +")";
		}
	}
	if (typeof (this.Immovable) != "undefined") {
		if (typeof(this.Movable) != "undefined") {
			s += "; ";
		}
		else {
			s += ": ";
		}
		s += this.Immovable.Name + " (" + FeastClassName [this.Immovable.Rank] +")";
	}
	return (s);
}

function SetMovable (f) {
	//  debugWindow.document.writeln ("<p>SetMovable</p>");
	this.Movable = new MovableFeast(f.Name, f.Rank);
	f.d = this.d;
	//  debugWindow.document.writeln ("<p>this.Movable.Name: "+this.Movable.Name+" this.d: "+this.d+"</p>");
	//  debugWindow.document.writeln ("<p>YearArray[this.d].Movable.Name: "+YearArray[this.d].Movable.Name+"</p>");
	//  debugWindow.document.writeln ("<p>f.Name: "+f.Name+" f.d: "+f.d+"</p>");
	//  debugWindow.document.writeln ("<p>End SetMovable</p>");
}

function KillMovable() {
	if (typeof(this.Movable)!="undefined") delete this.Movable;
}

function SetImmovable (s, r, y) {
	if (typeof(this.Immovable) == "undefined") {
		this.Immovable = new ImmovableFeast (s, r, y);
	}
}

function PutSunday () {
	//  with (parent.frames["lowerFrame"].document) {
		with (lowerFrame.window.document) {
			write ("<tr>");
			write ("<td>" + this.Movable.Name + "</td><td>" + this.DateString() + "</td>")
			write ("</tr>");
		}
	}
	
	DayOfYear.prototype.Name = ComposeName;
	DayOfYear.prototype.Hint = ComposeHint;
	DayOfYear.prototype.KillMovable = KillMovable;
	DayOfYear.prototype.SetMovable = SetMovable;
	DayOfYear.prototype.SetImmovable = SetImmovable;
	DayOfYear.prototype.DateString = DateString;
	DayOfYear.prototype.PutSunday = PutSunday;
	
	
	/******************************************************/
	
	function MakeImmovableFeast (s,d,m,r,y) {
		YearArray [YearData[LeapYear].MonthSt [m]+d-1].SetImmovable (s, r, y);
	}
	
	function SetDate(Offset) {
		return (Easter.d + Offset);
	}
	
	function calcEmbers (d, x) {
		i = 4 - WeekDay (d);  //Exaltatio Crucis
		if (i < 1) i += 7;
		YearArray[d+i].SetMovable (Ember [x++]);
		YearArray [d+i+2].SetMovable (Ember [x++]);
		YearArray [d+i+3].SetMovable (Ember [x]);
	}
	
	function calcEaster () {
		for (i=1; i<=366; i++) {
			YearArray[i].KillMovable();
		}
		
		AdjustYear (Year % 4 == 0);
		
		SeptOffset=-63;
		SexOffset=-56;
		QuinOffset=-49;
		PassOffset=-14;
		PalmOffset=-7;
		PentOffset=49;
		TrinOffset=56;
		QuadOffsetRoot=-42;
		PaschaOffsetRoot=7;
		TrinOffsetRoot=63;
		
		/****** Find Dominical Letter etc. ********/
		
		DominicalLetter = DomLetTable [(Year+9) % 28];
		if (Year>1582) DominicalLetter = (DominicalLetter + 10) % 7;
		if (DominicalLetter == 0)
		DominicalLetter = 7;
		
		if (LeapYear) {
			LeapDomLet = DominicalLetter + 1;
			if (LeapDomLet == 8)
			LeapDomLet = 1;
		}
		else LeapDomLet = DominicalLetter;
		
		WeekDayOffset = 8 - ((LeapYear) ? LeapDomLet : DominicalLetter);
		if (WeekDayOffset == 7) WeekDayOffset = 0;
		
		GoldenNumber = (Year + 1) % 19;
		if (GoldenNumber == 0)
		GoldenNumber = 19;
		
		Offset = ((LeapYear) ? LeapDomLet : DominicalLetter) - EasterTable [GoldenNumber][0];
		//  if (Year>1582) Offset = (Offset + 10);
		if (Offset < 0) Offset += 7;
		//  if (Offset > 6) Offset -= 7;
		
		/******* Set Sundays, starting with Easter *******/
		
		//  debugWindow.document.writeln ("YearArray[111].d: "+YearArray[111].d+"<br>");
		YearArray [(EasterTable [GoldenNumber][1] + Offset + 80)].SetMovable (Easter);
		/*  with (debugWindow.document) {
			writeln("Easter: "+Easter.d+"<br>");
			for (i=Easter.d-2; i <= Easter.d+2; i++) {
				write ("YearArray["+i+"].Movable: ");
				//      if (typeof(YearArray[i].Movable) != "undefined") if (typeof(YearArray[i].Movable.Name) != "undefined") writeln (" Confirm: "+YearArray[Easter.d].Movable.Name+"<br>");
				//      else write ("undefined");
				write (typeof(YearArray[i].Movable));
				writeln ("<br>");
			}
		}*/
		AdvOffset = 9 - ((LeapYear) ? LeapDomLet : DominicalLetter);
		if (AdvOffset == 8) AdvOffset = 1;
		AdvOffsetRoot = 359 - AdvOffset;
		for (I = 4; I >= 1; I--) {
			YearArray [AdvOffsetRoot].SetMovable(Advent [I]);
			AdvOffsetRoot -= 7;
		}
		
		YearArray [SetDate (SeptOffset)].SetMovable(Sept);
		/*  with (debugWindow.document) {
			writeln("Easter: "+Easter.d+"<br>");
			for (i=Easter.d-2; i <= Easter.d+2; i++) {
				write ("YearArray["+i+"]: ");
				if (typeof(YearArray[i].Movable) != "undefined") if (typeof(YearArray[i].Movable.Name) != "undefined") writeln (" Confirm: "+YearArray[Easter.d].Movable.Name+"<br>");
				else write ("undefined");
				writeln ("<br>");
			}
			writeln("Sept: "+Sept.d+"<br>");
			for (i=Sept.d-2; i <= Sept.d+2; i++) {
				write ("YearArray["+i+"]: ");
				if (typeof(YearArray[i].Movable) != "undefined") writeln (" Confirm: "+YearArray[Easter.d].Movable.Name+"<br>");
				else write ("undefined");
				writeln ("<br>");
			}
			writeln ("SeptOffset: "+SeptOffset+"<br>");
		}*/
		YearArray [SetDate (SexOffset)].SetMovable(Sex);
		YearArray [SetDate (QuinOffset)].SetMovable(Quin);
		YearArray [SetDate (PassOffset)].SetMovable(Pass);
		YearArray [SetDate (PentOffset)].SetMovable(Pent);
		YearArray [SetDate (TrinOffset)].SetMovable(Trinity);
		YearArray [SetDate (PalmOffset)].SetMovable(Palm);
		
		EpiphOffset = LeapDomLet - 6;
		if (EpiphOffset <= 0) EpiphOffset += 7;
		EpiphOffsetRoot = 6 + EpiphOffset;
		for (I = 1; I <= 6; I++) {
			if (EpiphOffsetRoot >= Sept.d) {
				Epiph [I].d = -1;
			}
			else {
				YearArray [EpiphOffsetRoot].SetMovable(Epiph[I]);
			}
			EpiphOffsetRoot += 7;
		}
		
		QuadOffset = QuadOffsetRoot;
		for (I = 1; I <= 4; I++) {
			YearArray [SetDate (QuadOffset)].SetMovable(Quad [I]);
			QuadOffset += 7;
		}
		
		PaschaOffset = PaschaOffsetRoot;
		for (I = 1; I <= 6; I++) {
			YearArray [SetDate (PaschaOffset)].SetMovable(Pascha [I]);
			PaschaOffset += 7;
		}
		
		TrinSunOffset = TrinOffsetRoot;
		for (I = 1; I <= 27; I++) {
			if (SetDate (TrinSunOffset) >= Advent [1].d) {
				TrinSun [I].d = -1;
			}
			else {
				YearArray [SetDate (TrinSunOffset)].SetMovable(TrinSun[I]);
			}
			TrinSunOffset += 7;
		}
		
		// set minor movable feasts
		
		YearArray [Easter.d-47].SetMovable(Shrove);
		YearArray [Easter.d-46].SetMovable(Ash);
		YearArray [Easter.d-2].SetMovable(GoodFri);
		YearArray [Easter.d+39].SetMovable(Ascension);
		YearArray [Trinity.d+4].SetMovable(CorpusC);
		
		calcEmbers (Quad[1].d, 1);
		calcEmbers (Pent.d, 4);
		with (YearData [LeapYear]) {
			calcEmbers (MonthSt [9]+13, 7);  //Exaltatio Crucis: 14 Sept.
			calcEmbers (MonthSt [12]+12, 10);  //St. Lucy: 13 Dec.
		}
	}
	
	function Indiction() {
		var x;
		x = (Year-312) % 15;
		if (x == 0) x = 15;
		return (x);
	}
	
	function ShowSundays () {
		//  with (parent.frames["lowerFrame"].document) {
			with (lowerFrame.window.document) {
				
				writeln ("<html><head><title>Sundays of " + Year + "</title></head>");
				writeln ("<body>");
				write ("<h1>Sundays of the Year " + Year);
				if (LeapYear) write (' (Leap Year)');
				writeln ("</h1>");
				writeln ("<b>Calendar:</b> "+CalendarName+"<br>");
				write ("Dominical Letter: "+DomLetName[DominicalLetter]+"; ");
				write ("Golden Number: "+GoldenNumber+"; ");
				write ("Indiction: " + Indiction());
				writeln ("<p>");
				
				writeln ("<table border=1 cellpadding=5>");
				for (I = 1; I <= 6; I++) {
					if (Epiph [I].d > 0) {
						YearArray [Epiph[I].d].PutSunday();
					}
				}
				YearArray [Sept.d].PutSunday ();
				YearArray [Sex.d].PutSunday ();
				YearArray [Quin.d].PutSunday ();
				for (I = 1; I <= 4; I++) {
					YearArray [Quad [I].d].PutSunday ();
				}
				YearArray [Pass.d].PutSunday ();
				YearArray [Palm.d].PutSunday ();
				YearArray [Easter.d].PutSunday();
				for (I = 1; I <= 6; I++) {
					YearArray [Pascha [I].d].PutSunday ();
				}
				YearArray [Pent.d].PutSunday ();
				YearArray [Trinity.d].PutSunday ();
				for (I = 1; I <= 27; I++) {
					if (TrinSun [I].d > 0) {
						YearArray [TrinSun [I].d].PutSunday ();
					}
				}
				for (I = 1; I <= 4; I++) {
					YearArray [Advent [I].d].PutSunday ();
				}
				writeln ("</table>");
				writeln ("<hr><a rel='license' href='http://creativecommons.org/licenses/by/3.0/deed.en_US'><img alt='Creative Commons License' style='border-width:0' src='http://i.creativecommons.org/l/by/3.0/88x31.png' /></a> <span xmlns:dct='http://purl.org/dc/terms/' href='http://purl.org/dc/dcmitype/Text' property='dct:title' rel='dct:type'>Medieval Calendar Calculator</span> by <a xmlns:cc='http://creativecommons.org/ns#' href='http://www.wallandbinkley.com/mcc/' property='cc:attributionName' rel='cc:attributionURL'>Peter Binkley</a> is licensed under a <a rel='license' href='http://creativecommons.org/licenses/by/3.0/deed.en_US'>Creative Commons Attribution 3.0 Unported License</a>.</div>");
				writeln ("</body></html>");
			}
			frames["lowerFrame"].document.close();
		}
		
		function YearOK (y) {
			Year = parseInt (y, 10);
			if ((Year < 1) | (Year > 2000)) Year = 0;
			return (Year != 0);
		}
		
		function ShowMonth (month,formtype) {
			
			function RomCal(d) { //nested function within ShowMonth
				var NStr,DStr,MStr;
				if (d > (MonthNo[month]+8)) {
					if (LeapYear && (month==2) && (d<25)) {
						if (d==24) NStr = 'bis '+RomanNumeral[6];
						else NStr = RomanNumeral [30 - d];
					}
					else NStr = RomanNumeral [YearData[LeapYear].MonthLength [month] + 2 - d];
					DStr = 'Kal.';
					MStr = MonthAbbr [month+1];
				}
				else if (d > MonthNo [month]) {
					NStr = RomanNumeral [MonthNo [month]+9-d];
					DStr = 'Id.';
					MStr = MonthAbbr [month];
				}
				else if (d > 1) {
					NStr = RomanNumeral [MonthNo [month] + 1 - d];
					DStr = 'Non.';
					MStr = MonthAbbr [month];
				}
				else {
					NStr = '';
					DStr = 'Kalendae';
					MStr = MonthAbbr [month];
				}
				if (NStr == RomanNumeral[1]) {
					NStr = '';
					if (DStr == 'Non.') DStr = 'Nonae';
					else if (DStr == 'Id.') DStr = 'Idus';
				}
				else if (NStr == RomanNumeral[2]) NStr = 'Prid.';
				return (NStr + ' ' + DStr + ' ' + MStr);
			}
			
			function HandleFeast (x, rank) {  //nested function within ShowMonth
				/*n.b. Netscape doesn't allow mouse event handlers with regular tags, so
				we must disguise the tag as a disabled link to enable onMouseOver etc. */
				
				FeastName = YearArray[x].Name(formtype);
				var OverTxt = 'window.status="'+YearArray[x].Hint()+'";';
				var OutTxt = 'window.status=""; return true';
				frames["lowerFrame"].document.write ("<td class='"+FeastClassName[rank]+"'><A href='' class='feast' onMouseOver='"+OverTxt
					+"return true'"+" onMouseOut='"+OutTxt+"' onClick='return false;"
				+"' onDblClick='return false;'>");
				SpecialDay = true;
			}
			
			function PutDay (d,m) { //nested function within ShowMonth
				var x;
				FeastName = "";
				x = d + YearData[LeapYear].MonthSt [m] - 1;
				with (frames["lowerFrame"].document) {
					
					/*    if ((d + FirstWeekDay -1) % 7 == 1) { //Sunday
						HandleFeast (x, "#FF0000");
					}
					else if (typeof (YearArray[x].Movable) != "undefined") {
						HandleFeast (x, "#0000FF");
					}
					else if ((typeof (YearArray[x].Immovable) != "undefined") &&
						(YearArray[x].Immovable.YearStart <= Year)) {
						HandleFeast (x, FeastClassColor [YearArray[x].Immovable.Rank]);
					} */
					
					if (typeof (YearArray[x].Movable) != "undefined" &&
						(typeof (YearArray[x].Immovable) != "undefined") &&
						(YearArray[x].Immovable.YearStart <= Year)) {
						with (YearArray[x]) {
							HandleFeast (x, (Movable.Rank<Immovable.Rank) ? Movable.Rank : Immovable.Rank);
						}
					}
					else if (typeof (YearArray[x].Movable) != "undefined") {
						HandleFeast (x, YearArray[x].Movable.Rank);
					}
					else if ((typeof (YearArray[x].Immovable) != "undefined") &&
						(YearArray[x].Immovable.YearStart <= Year)) {
						HandleFeast (x, YearArray[x].Immovable.Rank);
					}
					else {
						write ('<td>');
						SpecialDay = false;
					}
					write (d);
					if (formtype) {
						writeln ("<br>"+FeastName);
						writeln ('<p style="font-size: small;">'+RomCal (d)+"</p>");
					}
					if (SpecialDay) write ("</a>");
					writeln ("</td>");
				}
			}
			
			function PutBlankDay() { // nested function within ShowMonth
				frames["lowerFrame"].document.writeln ('<td bgcolor="d3d3d3">&nbsp;<br></td>');
			}
			
			// ShowMonth starts here
			//formtype: true = long form, false = short form
			var FeastName;
			month = Number (month);
			with (frames["lowerFrame"].document) {
				if (formtype) {
					writeln ("<html><head><title>"+MonthName[month]+" "+Year+"</title>");
					writeln ("</head>");
					writeln ('<style type="text/css">');
//					writeln ('  .feast {color: white; text-decoration: none; }');
					writeln ('  .feast {color: '+FeastClassTextColor+'; text-decoration: none; }');
					for (i=0; i<=TopFeastClass; i++) {
						writeln ('  td.'+FeastClassName[i]+' {background-color: '+FeastClassColor[i]+'; }');
					}
					writeln ('  td {vertical-align: top}');
					writeln ('</style>');
					writeln ("<body><h1>"+MonthName[month]+" "+Year+"</h1><hr>");
				}
				
				if (formtype) {
					writeln ("<b>Calendar:</b> "+CalendarName+"<br>");
					write ("Dominical Letter: "+DomLetName[DominicalLetter]+"; ");
					write ("Golden Number: "+GoldenNumber+"; ");
					write ("Indiction: " + Indiction());
					writeln ("<p>");
				}
				
				FirstWeekDay = WeekDay(YearData[LeapYear].MonthSt [month]);
				
				writeln ("<table width=100% border=1><tr>");
				for (i=1; i<7; i++) {
					write ("<td width=14.3% align=center><b>");
					if (formtype) {
						write (WeekDayName[i]+"</b><br><small>"+LatDayName[i]+"</small>");
					}
					else write ("<b>"+WeekDayName[i].charAt(0)+"</b>");
					writeln ("</b></td>");
				}
				write ("<td align=center><b>");
				if (formtype) {
					write (WeekDayName[i]+"</b><br><small>"+LatDayName[i]+"</small>");
				}
				else write ("<b>"+WeekDayName[i].charAt(0)+"</b>");
				writeln ("</b></td></tr>");
				
				//Write first week, with leading blank days
				write ("<tr>");
				y = 0;
				for (i = WeekDay (YearData[LeapYear].MonthSt [month]) - 1; i > 0; i--) {  //blank days at start
					y++;
					PutBlankDay();
				}
				i=1;
				for (y=7-y; y > 0; y--) {
					PutDay (i,month);
					i++;
				}
				writeln ("</tr>");
				
				//Write middle weeks
				write ("<tr>");
				for (i=i; i <= YearData[LeapYear].MonthLength [month]; i++) {
					PutDay (i,month);
					if ((i + FirstWeekDay - 1) % 7 == 0) { //end of week: new row
						writeln ("</tr><tr>");
					}
				}
				
				//Write trailing blank days
				with (YearData[LeapYear]) {
					for (i=7-WeekDay(MonthSt[month]+MonthLength[month]-1); i > 0; i--) {
						PutBlankDay();
					}
				}
				
				writeln ("</tr></table></center>");
				if (formtype) {
					writeln ("<hr><address><font SIZE='-2'>Produced by the Medieval Calendar Calculator (http://www.wallandbinkley.com/mcc/), &copy; 1999 Peter Binkley; may be freely distributed and reproduced.</font></address>");
					writeln ("</body></html>");
					close();
				}
			}
		}
		
		function LoadCalendar (s) {
//       alert ("LoadCalendar\ns="+s+"\nfirstVisit="+firstVisit);
       if (s=="auto") {   // loading automatically on call from mcc_blank.htm
         if (firstVisit) {
           s = DefaultCalSource;
           firstVisit = false;
         }
       }  // if s still = "auto", user is backing out of the site    
//       alert ("LoadCalendar\ns="+s+"\nfirstVisit="+firstVisit);
			if (s == "custom") {
				s = prompt ("Enter the URL or directory path and file name of your customized calendar.","")
			}
			if ((s != null) && (s != "") && (s != "auto")) {
				lowerFrame.document.location.href = s;
				DefaultCalSource = s;
			}
		}
		
		function HandleYear (form) {
			if (YearOK (form.year.value)) {
				calcEaster ();
				ShowSundays ();
			}
			else {
				alert ("The year you entered (" + form.year.value + ") is out of bounds.");
			}
		}
		
		function HandleMonth (form) {
			if (YearOK (form.year.value)) {
				calcEaster ();
				with (form.month) {
					ShowMonth (options[selectedIndex].value,true);
				}
			}
			else {
				alert ("The year you entered (" + form.year.value + ") is out of bounds.");
			}
		}
		
		function ShowYear (form) {
			if (YearOK (form.year.value)) {
				calcEaster ();
				
				with (frames["lowerFrame"].document) {
					writeln ("<html><head><title>Calendar for "+Year+"</title>");
					writeln ("</head>");
					
					writeln ('<style type="text/css">');
//					writeln ('  .feast {color: white; text-decoration: none; }');
					writeln ('  .feast {color: '+FeastClassTextColor+'; text-decoration: none; }');
					for (i=0; i<=TopFeastClass; i++) {
						writeln ('  td.'+FeastClassName[i]+' {background-color: '+FeastClassColor[i]+'; }');
					}
					writeln ('</style>');
					
					write ("<body><h1>Calendar for "+Year);
					if (LeapYear) write (" (Leap Year)");
					writeln ("</h1>");
					
					writeln ("<b>Calendar:</b> "+CalendarName+"<br>");
					write ("Dominical Letter: "+DomLetName[DominicalLetter]+"; ");
					write ("Golden Number: "+GoldenNumber+"; ");
					write ("Indiction: " + Indiction());
					writeln ("<p>");
					
					writeln ("<table width=100% border=1><tr>");
					for (i=0; i<=TopFeastClass; i++) {
						writeln ("<td width="+(100/(TopFeastClass+1))+"%>"+FeastClassName[i]+"</td>");
					}
					writeln ("</tr><tr>");
					for (i=0; i<=TopFeastClass; i++) {
						writeln ("<td bgcolor="+FeastClassColor[i]+">&nbsp;</td>");
					}
					writeln ("</tr></table>");
					
					
					for (YearRow=0;YearRow<6;YearRow++) {
						writeln ("<table width=100% border=0>");
						writeln ("<tr>");
						for (YearCol=1;YearCol<=2;YearCol++) {
							writeln ("<td valign=top>");
							writeln ("<b><center>"+MonthName [(2*YearRow)+YearCol]+"</center></b>");
							ShowMonth ((2*YearRow)+YearCol, false);
							writeln ("</td>");
						}
						writeln ("</tr></table>");
					}
					writeln ("<hr><address><font SIZE='-2'>Produced by the Medieval Calendar Calculator (http://www.wallandbinkley.com/mcc/), &copy; 1999 Peter Binkley; may be freely distributed and reproduced.</font></address>");
					writeln ("</body></html>");
					close();
				}
			}
			else {
				alert ("The year you entered (" + form.year.value + ") is out of bounds.");
			}
		}
		
		function PrepareDebug() {
			debugWindow = window.open ('', 'debugWin');
		}
		//  --->


