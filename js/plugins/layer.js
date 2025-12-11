 /*:
 * @plugindesc edits n functions
 * @author Layer
*/

( function() {

//-----------------------------------------------------------------core
Bitmap.prototype.initialize = function(width, height) { //830
    if(!this._defer){
        this._createCanvas(width, height);
    }

    this._image = null;
    this._url = '';
    this._paintOpacity = 255;
    this._smooth = false;
    this._loadListeners = [];
    this._loadingState = 'none';
    this._decodeAfterRequest = false;

    /**
     * Cache entry, for images. In all cases _url is the same as cacheEntry.key
     * @type CacheEntry
     */
    this.cacheEntry = null;

    /**
     * The face name of the font.
     *
     * @property fontFace
     * @type String
     */
    this.fontFace = 'GameFont';

    /**
     * The size of the font in pixels.
     *
     * @property fontSize
     * @type Number
     */
    this.fontSize = 12;

    /**
     * Whether the font is italic.
     *
     * @property fontItalic
     * @type Boolean
     */
    this.fontItalic = false;

    /**
     * The color of the text in CSS format.
     *
     * @property textColor
     * @type String
     */
    this.textColor = '#ffffff';

    /**
     * The color of the outline of the text in CSS format.
     *
     * @property outlineColor
     * @type String
     */
	 if ( $gameSwitches && $gameSwitches.value(101) ){
		this.outlineColor = 'rgba(0, 0, 0, 0)';
	 } else this.outlineColor = 'rgba(0, 0, 0, 0.5)' ;

    /**
     * The width of the outline of the text.
     *
     * @property outlineWidth
     * @type Number
     */
	 if ( $gameSwitches && $gameSwitches.value(101) ){
		 this.outlineWidth = 0 ;
	 } else this.outlineWidth = 4 ;
};

TouchInput._onMouseDown = function(event) { //core 3708
};

//-----------------------------------------------------------------windows
Window_Base.prototype.lineHeight = function() {
    return 24;
};
Window_Base.prototype.standardFontSize = function() {
    return 16;
};
Window_Base.prototype.standardPadding = function() {
    return 18;
};

Window_Base.prototype.textPadding = function() {
    return 6;
};
Window_Base.prototype.standardBackOpacity = function() {
	return 255;
};
Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
    this.contents.drawText(text, x, y, maxWidth, this.lineHeight(), align);
};
Window_Base.prototype.fittingHeight = function(numLines) {
    return numLines * this.lineHeight() + this.standardPadding() * 2;
};

Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
		if (item.speed===3) {
			this.changeTextColor(this.textColor(1));
		} else if (item.speed===2) {
			this.changeTextColor(this.textColor(23));
		} else if (item.speed===1) {
			this.changeTextColor(this.textColor(0));
		} else {
			this.changeTextColor(this.textColor(8));
		}
//        this.drawIcon(item.iconIndex, x + 2, y + 2);
		this.drawIcon(item.iconIndex, x+2, y-2);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
		this.resetTextColor();
    }
};
//============================Window_Message
Window_Message.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};
Window_Message.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};
Window_Message.prototype.numVisibleRows = function() {
    return 3;
};

//============================Window_MenuCommand
Window_MenuCommand.prototype.windowWidth = function() {
    return 140;
};
Window_MenuCommand.prototype.numVisibleRows = function() {
    return this.maxItems();
};
Window_MenuCommand.prototype.makeCommandList = function() {
    this.addMainCommands();
//    this.addFormationCommand();
    this.addOriginalCommands();
    this.addOptionsCommand();
    this.addSaveCommand();
    this.addGameEndCommand();
};
Window_MenuCommand.prototype.addMainCommands = function() {
    var enabled = this.areMainCommandsEnabled();
//    if (this.needsCommand('item')) {
        this.addCommand(TextManager.item, 'item', enabled);
    /*}
    if (this.needsCommand('skill')) {
        this.addCommand(TextManager.skill, 'skill', enabled);
    }
    if (this.needsCommand('equip')) {
        this.addCommand(TextManager.equip, 'equip', enabled);
    }
    if (this.needsCommand('status')) {
        this.addCommand(TextManager.status, 'status', enabled);
    }*/
};
//============================Window_MenuStatus
Window_MenuStatus.prototype.windowWidth = function() {
    return Graphics.boxWidth - 140;
};
Window_MenuStatus.prototype.windowHeight = function() {
    return Graphics.boxHeight;
};
//============================Window_ItemCategory
Window_ItemCategory.prototype.makeCommandList = function() {
    this.addCommand(TextManager.item,    'item');
//    this.addCommand(TextManager.weapon,  'weapon');
//    this.addCommand(TextManager.armor,   'armor');
//    this.addCommand(TextManager.keyItem, 'keyItem');
};

//============================Window_Options
Window_Options.prototype.windowWidth = function() {
    return 300;
};
Window_Options.prototype.makeCommandList = function() {
    this.addGeneralOptions();
    this.addVolumeOptions();
};
Window_Options.prototype.addGeneralOptions = function() {
    this.addCommand(TextManager.alwaysDash, 'alwaysDash');
//    this.addCommand(TextManager.commandRemember, 'commandRemember');
};
Window_Options.prototype.addVolumeOptions = function() {
    this.addCommand(TextManager.bgmVolume, 'bgmVolume');
    this.addCommand(TextManager.bgsVolume, 'bgsVolume');
//    this.addCommand(TextManager.meVolume, 'meVolume');
    this.addCommand(TextManager.seVolume, 'seVolume');
};
//============================ Window_SavefileList
Window_SavefileList.prototype.drawContents = function(info, rect, valid) {
    var bottom = rect.y + rect.height;
    if (rect.width >= 420) {
        this.drawGameTitle(info, rect.x + 192, rect.y, rect.width - 192);
        if (valid) {
            this.drawPartyCharacters(info, rect.x + 220, bottom - 4);
        }
    }
    var lineHeight = this.lineHeight();
    var y2 = bottom - lineHeight;
    if (y2 + 12 >= lineHeight) {
        this.drawPlaytime(info, rect.x, y2, rect.width);
    }
};

//============================Window_TitleCommand
Window_TitleCommand.initCommandPosition = function() {
    this._lastCommandSymbol = null;
};
Window_TitleCommand.prototype.windowWidth = function() {
    return 140;
};
Window_TitleCommand.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = ( Graphics.boxHeight - this.height )*3 / 4;
};


//-----------------------------------------------------------------objects
Game_Player.prototype.isDashing = function() { //objects 7522
    if ($gameSwitches.value(5)) {
		return false;
	} else return this._dashing;
};
Game_Event.prototype.updateSelfMovement = function() { //objects 8512
	if (!this._locked &&
            this.checkStop(this.stopCountThreshold())) {
        switch (this._moveType) {
        case 1:
            this.moveTypeRandom();
            break;
        case 2:
            this.moveTypeTowardPlayer();
            break;
        case 3:
            this.moveTypeCustom();
            break;
        }
    }
};

Game_Event.prototype.findProperPageIndex = function() {//8642 //END1불러올때 자꾸 오류나서 아예 없으면 무시하기로함
if (this.event()){
	var pages = this.event().pages;
    for (var i = pages.length - 1; i >= 0; i--) {
        var page = pages[i];
        if (this.meetsConditions(page)) {
            return i;
        }
    }
    return -1;
}
};
//-----------------------------------------------------------------scenes
//Scene_Title
Scene_Title.prototype.playTitleMusic = function() { //526
	var fileName = StorageManager.exists('_오르페아') ? "REST" : "AN_END" ;
	var bgm = { name: fileName, volume: 90, pitch: 100 };
    AudioManager.playBgm(bgm);
    AudioManager.stopBgs();
    AudioManager.stopMe();
};
//-----------------------------------------------------------------추가함수
Game_Event.prototype.Lyr_womanTool1 = function(){//NPC 밭갈기
	var move = false;
	var targetX; var targetY;
	var _this = $gameMap.event(this._eventId);
	for (var id = 128; id < 136; id++){
		if ( !$gameVariables.value(id) && !$gameVariables.value(100+id)[6] ){
			targetX = $gameMap.event(id)._x;
			targetY = $gameMap.event(id)._y;
			move = true;
			break;
		}
	} if (move) {
		_this.moveStraight(_this.findDirectionTo(targetX, targetY));
		if (_this.x===targetX && _this.y===targetY){
			_this.Lyr_hoe(id);
			_this._waitCount = 59;
		}
	} else if (Math.random()<0.2){
		_this.moveStraight(_this.findDirectionTo(11, 13));
	} else if (Math.random()<0.2) {
		_this.moveRandom();
	} else if (Math.random()<0.2) {
		_this.moveTowardPlayer();
	} else {
		_this._waitCount = 59;
	}
}
Game_Event.prototype.Lyr_womanTool3 = function(){//NPC 물주기
	var move = false;
	var targetX; var targetY;
	var _this = $gameMap.event(this._eventId);
	for (var id = 128; id < 136; id++){
		if ( $gameVariables.value(id) > 5 && ($gameVariables.value(100+id)[2] + $gameVariables.value(100+id)[4] < 0.6) ){
			targetX = $gameMap.event(id)._x;
			targetY = $gameMap.event(id)._y;
			move = true;
			break;
		}
	} if (move) {
		_this.moveStraight(_this.findDirectionTo(targetX, targetY));
		if (_this.x===targetX && _this.y===targetY){
			_this.Lyr_water(id);
			_this._waitCount = 59;
		}
	} else if (Math.random()<0.2){
		_this.moveStraight(_this.findDirectionTo(11, 13));
	} else if (Math.random()<0.2) {
		_this.moveRandom();
	} else if (Math.random()<0.2) {
		_this.moveTowardPlayer();
	} else {
		_this._waitCount = 59;
	}
}
Game_Event.prototype.Lyr_womanTool4 = function(){//NPC 추수-1,2,3
	var move = false;
	var targetX; var targetY;
	var _this = $gameMap.event(this._eventId);
	for (var id = 128; id < 136; id++){
		var level = parseInt(($gameVariables.value(id) - 6) / $gameVariables.value(5));
		//16 = z - 6., 22부터 흉-3, 26부터 풍-4
		if ( $gameVariables.value(100+id)[6]<4 && level>4 ){
			targetX = $gameMap.event(id)._x;
			targetY = $gameMap.event(id)._y;
			move = true;
			break;
		}
	} if (move) {
		_this.moveStraight(_this.findDirectionTo(targetX, targetY));
		if (_this.x===targetX && _this.y===targetY){
			$gameVariables.setValue(id, $gameVariables.value(id)+8);
			var pitch = Math.random()*40 + 85; AudioManager.playSe({name:"_Reap1", volume:85, pitch:pitch, pan:0});
			_this._waitCount = 59;
		}
	} else {
		_this.moveStraight(_this.findDirectionTo(16, 13));
		if (_this.x===16 && _this.y===13){
			$gameSwitches.setValue(97, true);
			$gameSwitches.setValue(96, false);
		}
	}
}
Game_Event.prototype.Lyr_womanTool0 = function(){//NPC 추수-4(순무), 창고행
	var move = false;
	var targetX; var targetY;
	var _this = $gameMap.event(this._eventId);
	for (var id = 128; id < 136; id++){ //순무
		var level = parseInt(($gameVariables.value(id) - 6) / $gameVariables.value(5));
		if ( $gameVariables.value(100+id)[6]===4 && level>4 ){
			targetX = $gameMap.event(id)._x;
			targetY = $gameMap.event(id)._y;
			move = true;
			break;
		}
	} if (move) {
		_this.moveStraight(_this.findDirectionTo(targetX, targetY));
		if (_this.x===targetX && _this.y===targetY){
			$gameVariables.setValue(id, $gameVariables.value(id)+8);
			var name = "_Bubble" + Math.floor(Math.random()*2+1); var pitch = Math.random()*40 + 85; AudioManager.playSe({name:name, volume:85, pitch:pitch, pan:0});
			_this._waitCount = 59;
		}
	} else {
		for (var id = 128; id < 136; id++){ //창고행
			if ( !$gameVariables.value(id) && $gameVariables.value(100+id)[9] ){
			//= if ( $gameSelfSwitches.value([this._mapId, 100+id, "A"]) || $gameSelfSwitches.value([this._mapId, 100+id, "B"]) ){
				//= if ( !page && arr[6] )
				//이하 : { if (플레이어가 운반하고 있지 않음) ... }
				targetX = $gameMap.event(id)._x;
				targetY = $gameMap.event(id)._y;
				if ( targetX===$gameMap.event(100+id)._x && targetY===$gameMap.event(100+id)._y ){ //이동1
					_this.moveStraight(_this.findDirectionTo(targetX, targetY));
					move = true;
				} else {
					 targetX = $gameMap.event(100+id)._x;
					 targetY = $gameMap.event(100+id)._y;
					 if (targetX>15){_this.moveStraight(_this.findDirectionTo(targetX, targetY)); move = true;} else continue; //이동2
				}
				if ( _this.x===targetX && _this.y===targetY){ //줍줍
					var crop = $gameVariables.value(100+id)[9];
					var stock = Math.ceil($gameVariables.value(100+id)[8] || 1);
					$gameVariables.setValue(306+crop, $gameVariables.value(306+crop) + stock);
					$gameVariables.value(100+id)[8]=0; $gameVariables.value(100+id)[9]=0; //$gameVariables.value(100+id)[3]=0;
					$gameSelfSwitches.setValue([this._mapId, 100+id, "A"], false);
					$gameSelfSwitches.setValue([this._mapId, 100+id, "B"], false);
					$gameMap.event(100+id).setPosition(0, 0);
					//__cropSUM
					var crop1 = $gameVariables.value(307); var crop2 = $gameVariables.value(308); var crop3 = $gameVariables.value(309); var crop4 = $gameVariables.value(310);
					if(crop1<0) $gameVariables.setValue(307, 0);
					if(crop2<0) $gameVariables.setValue(308, 0);
					if(crop3<0) $gameVariables.setValue(309, 0);
					if(crop4<0) $gameVariables.setValue(310, 0);
					var sum = crop1 + crop2 + crop3 + crop4;
					$gameVariables.setValue(315, sum);
					//
					_this._waitCount = 59;
				}
			break;
			}
		} if (!move){
			if (Math.random()<0.2){
				_this.moveStraight(_this.findDirectionTo(11, 13));
			} else if (Math.random()<0.2) {
				_this.moveRandom();
			} else if (Math.random()<0.2) {
				_this.moveTowardPlayer();
			} else {
				_this._waitCount = 59;
			}
		}
	}
}

Game_Event.prototype.Lyr_hoe = function(i){
var id = i;
if (id>100 && id<136 && this._mapId===6){
var n = Number( $dataMap.events[id].name.replace(/\D/g, "") ); var n2;
switch (n){
 case 1: n2=3440+34; break; case 2: n2=3440+20; break; case 3: n2=3440+36; break;
 case 4: n2=3440+16; break; case 5: n2=3440+0; break; case 6: n2=3440+24; break;
 case 7: n2=3440+40; break; case 8: n2=3440+28; break; case 9: n2=3440+38; break;
 case 0: n2=3440+8; break; default: n2=3440; break;
}
$gameMap.changeTile([$gameMap.event(id).x, $gameMap.event(id).y, 1, n2]);
$gameVariables.setValue(id, 1); $gameVariables.value(100+id)[5]=0; $gameVariables.value(100+id)[6]=0; $gameSelfSwitches.setValue([this._mapId, id, "A"], false);
var pitch = Math.random()*50 + 75; AudioManager.playSe({name:"_Dirt1", volume:80, pitch:pitch, pan:0});
}
}

Game_Event.prototype.Lyr_water = function(i){//NPC전용
var id = i;
if (id>100 && id<136 && this._mapId===6){
 $gameVariables.value(100+id)[2] = 1;
 $gameMap.changeTile([$gameMap.event(id).x, $gameMap.event(id).y, 3, 264]);
 var pitch = Math.random()*30 + 85; AudioManager.playSe({name:"_Water1", volume:100, pitch:pitch, pan:0});
}
}


//========================
Game_Character.prototype.Lyr_windWave1 = function() { //흔들림 딜레이
//	this._waitCount = parseInt(this.regionId()/12)*12 + (this.regionId()%12)*6;
	this._waitCount = this.regionId()*6;
};
Game_Character.prototype.Lyr_windWave2 = function() {
	this.setStepAnime(true);
	this._waitCount = 64;
};
Game_Character.prototype.Lyr_windWave3 = function() {
	this.setStepAnime(false);
//	this._waitCount = $gameVariables.value(9) - parseInt(this.regionId()/12)*12 - (this.regionId()%12)*6;
	this._waitCount = $gameVariables.value(9) - this.regionId()*6;
};
Game_Event.prototype.Lyr_windWave1 = function(){
	Game_Character.prototype.Lyr_windWave1.call(this);
};
Game_Event.prototype.Lyr_windWave2 = function(){
	Game_Character.prototype.Lyr_windWave2.call(this);
};
Game_Event.prototype.Lyr_windWave3 = function(){
	Game_Character.prototype.Lyr_windWave3.call(this);
};

Game_Event.prototype.Lyr_grass = function(){ //잡초배치
/*
	var id = this._eventId;
	var id2 = Math.floor(Math.random()*96) + 101;
	do {
		if ($gameMap.eventIdXy($gameMap.event(id2).x, $gameMap.event(id2).y) < 100){
			id2 = id2===197 ? 101 : (id2+1);
		} else {
			$gameVariables.setValue(id, id2); //id2는 crop의 event ID, $var(id2)=evtPage변수
			$gameMap.event(id).setPosition($gameMap.event(id2).x, $gameMap.event(id2).y);
			}
	} while ($gameMap.event(id).x < 5)
		*/
};

Game_Event.prototype.Lyr_reap = function(){ //수확, event201~에 직접 들어가는거
	$gameVariables.value(this._eventId)[8] = $gameVariables.value(this._eventId)[5];
	$gameVariables.value(this._eventId)[9] = $gameVariables.value(this._eventId)[6];
	var crop = $gameVariables.value(this._eventId)[6] || 1;
	var x = $gameMap.event(this._eventId).x; var y = $gameMap.event(this._eventId).y; var d;
	switch (crop){
		case 1: d=2; break;
		case 2: d=4; break;
		case 3: d=6; break;
		case 4: d=8; break;
		default: break;
	} $gameMap.event(this._eventId).setDirection(d || 2);
	if ($gameVariables.value(this._eventId - 100) <38) {
		$gameSelfSwitches.setValue([this._mapId, this._eventId, "A"], true);
	} else $gameSelfSwitches.setValue([this._mapId, this._eventId, "B"], true);
	$gameMap.event(this._eventId).jump(0, 0);
	
	var n = Number( $dataMap.events[this._eventId - 100].name.replace(/\D/g, "") ); var n2;
	switch (n){
		case 1: n2=3488+34; break; case 2: n2=3488+20; break; case 3: n2=3488+36; break;
		case 4: n2=3488+16; break; case 5: n2=3488+0; break; case 6: n2=3488+24; break;
		case 7: n2=3488+40; break; case 8: n2=3488+28; break; case 9: n2=3488+38; break;
		case 0: n2=3488+8; break; default: n2=3488; break;
	} $gameMap.changeTile([x, y, 1, n2]);
	$gameVariables.setValue(this._eventId - 100, 0);
	$gameMap.event(this._eventId - 100).setPosition(x, y);
	$gameVariables.value(this._eventId)[3] = 0;
	$gameVariables.value(this._eventId)[5] = 0; $gameVariables.value(this._eventId)[6] = 0;
//	if ($gameVariables.value(this._eventId)[3] < -1) {$gameVariables.value(this._eventId)[3] = -1;}
	$gameSelfSwitches.setValue([this._mapId, this._eventId - 100, "A"], false);
//	$gameVariables.value(this._eventId)[3] -= $dataItems[crop].speed;
// 그래픽결정 -> 제자리점프 1회 -> 맨손으로 ok하면 들 수 있고, 6개씩 창고로 옮겨놓을 수 있음
};

Game_Event.prototype.Lyr_hold = function(){
	var id = this._eventId;
	var id2 = $gameVariables.value(289 + id);
	var crop = $gameVariables.value(id2)[9] || 1; var d;
	switch (crop){
		case 1: d=2; break;
		case 2: d=4; break;
		case 3: d=6; break;
		case 4: d=8; break;
		default: break;
	}  $gameMap.event(id).setDirection(d || 2);
	$gameMap.event(id2).setPosition(0, 0);
	$gameMap.event(id).setPosition($gamePlayer.x, $gamePlayer.y);
	if ( $gameSelfSwitches.value([this._mapId, id2, "A"]) ) $gameSelfSwitches.setValue([this._mapId, id, "A"], true);
	else $gameSelfSwitches.setValue([this._mapId, id, "B"], true);
};
Game_Event.prototype.Lyr_holdCancel = function(){
	var id = this._eventId;
	var id2 = $gameVariables.value(289 + id);
	if (!id2) return;
	$gameSwitches.setValue(5, false);
	$gameSwitches.setValue(this._eventId - 2, false);
	$gameMap.event(id).setPosition(0, 0);
	$gameMap.event(id2).setPosition($gamePlayer.x, $gamePlayer.y);
//	$gameVariables.setValue(this._eventId + 289, 0);
};

// $gameMap.event(this._eventId).Lyr_pick($gameVariables.value(2) + 100);
Game_Event.prototype.Lyr_pick = function(id){

if ( $gameSelfSwitches.value([this._mapId, id, "A"]) || $gameSelfSwitches.value([this._mapId, id, "B"]) ){
var id2; var swt;
for (swt = 7; swt < 13; swt++){
 if ( !$gameSwitches.value(swt) ){
  id2 = swt + 2;
  $gameVariables.setValue(289 + id2, id);
  $gameSwitches.setValue(swt, true);
  $gameSwitches.setValue(5, true);
  break;
 }
}
}

};
Game_Event.prototype.Lyr_pick2 = function(){

	var x = $gamePlayer.x; var y = $gamePlayer.y;
	for (var id = 201; id < 236; id++){
//	for (var id = 201; id < 298; id++){
		if ( $gameMap.event(id).x === x && $gameMap.event(id).y === y){
			$gameMap.event(this._eventId).Lyr_pick(id);
			}
	}

};
/*
var id; var swt = 7; var v;
for (swt; swt < 13; swt++){
 if ( !$gameSwitches.value(swt) ){
  v = $gameVariables.value(303 + 7 - swt);
  if ( v > 0 && $gameMap.event(v).x === x && $gameMap.event(v).y === y ){
   $gameMap.event(this._eventId).Lyr_pick(v);
   if ( (303+7-swt) !== (289+2+swt) ) $gameVariables.setValue(303 + 7 - swt, 0);
   $gameSwitches.setValue(20, true);
  } else {
   for (id = 201; id < 298; id++){
    if ( $gameMap.event(id).x === x && $gameMap.event(id).y === y){
     $gameMap.event(this._eventId).Lyr_pick(id);
    }
   }
  }
 }
}
*/


} )();

