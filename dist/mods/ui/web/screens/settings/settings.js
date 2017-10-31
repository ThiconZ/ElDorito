var activePage;
var selectedItem;
var itemNumber = 0;
var tabIndex = 0;
var previousBind;
var colorIndex = 0;
var changeArray = [];
var commandValues = [];
var vetoEnabled;
var unlimitedSprint;
var hasGP = false;
var axisThreshold = .5;
var stickTicks = { left: 0, right: 0, up: 0, down: 0 };
var repGP;
var lastHeldUpdated = 0;

var h3ColorArray = ['#626262','#B0B0B0','#DEDEDE','#9B3332','#DB6766','#EE807F','#DB8B00','#F8AE58','#FECB9C','#CCAE2C','#F3BC2B','#FDD879','#57741A','#90A560','#D8EFA7','#31787E','#4ABBC1','#91EDEC','#325992','#5588DB','#97B5F5','#553E8F','#9175E3','#C4B4FD','#830147','#D23C83','#FC8BB9','#513714 ','#AC8A6E','#E0BEA2'];
var settingsToLoad = [
    ['sControlsMethod','Settings.Gamepad'],
    ['sInfantryMouseSensV','Settings.MouseSensitivityVertical'],
    ['sInfantryMouseSensH','Settings.MouseSensitivityHorizontal'],
    ['sVehicleMouseSensV','Settings.MouseSensitivityVehicleVertical'],
    ['sVehicleMouseSensH','Settings.MouseSensitivityVehicleHorizontal'],
    ['sMouseAcceleration','Settings.MouseAcceleration'],
    ['sMouseFilter','Settings.MouseFilter'],
    ['sInvertMouse','Settings.InvertMouse'],
    ['sToggleCrouch','Settings.ToggleCrouch'],
    ['sScreenResolution','Settings.ScreenResolution'],
    ['sBrightness','Settings.Brightness'],
    ['sFullscreen','Settings.Fullscreen'],
    ['sVsync','Settings.VSync'],
    ['sAntiAliasing','Settings.Antialiasing'],
    ['sTextureResolution','Settings.TextureResolution'],
    ['sTextureFiltering','Settings.TextureFilteringQuality'],
    ['sLightningQuality','Settings.LightingQuality'],
    ['sEffectsQuality','Settings.EffectsQuality'],
    ['sShadowQuality','Settings.ShadowQuality'],
    ['sDetailsLevel','Settings.DetailsQuality'],
    ['sPostprocessing','Settings.PostprocessingQuality'],
    ['sMotionBlur','Settings.MotionBlur'],
    ['sMasterVolume','Settings.MasterVolume'],
    ['sSFXVolume','Settings.SfxVolume'],
    ['sMusicVolume','Settings.MusicVolume'],
    ['sHudShake','Settings.HUDShake'],
    ['sPlayerMarkerColors','Settings.PlayerMarkerColors'],
    ['sCameraFOV','Camera.FOV'],
    ['sName', 'Server.Name'],
	['sMatchCountdown', 'Server.CountdownLobby'], 
    ['sCountdown', 'Server.Countdown'], 
    ['sMaxPlayers', 'Server.MaxPlayers'], 
    ['sMaxTeamSize', 'Server.MaxTeamSize'], 
    ['sShouldAnnounce', 'Server.ShouldAnnounce'],
    ['sDualWieldEnabled', 'Server.DualWieldEnabled'], 
    ['sAssassinationEnabled', 'Server.AssassinationEnabled'], 
    ['cCenteredCrosshair' , 'Camera.Crosshair'], 
    ['cHideHUD', 'Camera.HideHUD'], 
    ['inputRaw','Input.RawInput'], 
    ['sPass', 'Server.Password'], 
    ['sMessage', 'Server.Message'], 
    ['lookSensitivity', 'Input.ControllerSensitivityX'], 
    ['controllerPort','Input.ControllerPort'], 
    ['gExpandScoreboard','Game.ExpandedScoreboard'], 
    ['invertLook','Input.ControllerInvertY'], 
    ['gHideChat','Game.HideChat'], 
    ['gSuppressJuggling','Game.SuppressJuggling'], 
    ['sTeamShufflingEnabled','Server.TeamShuffleEnabled'],
    ['wOffsetConfig','Weapon.JSON.File'],
    ['gMedalPack','Game.MedalPack'], 
    ['iSpectateSens','Input.SpectateSensitivity'],
    ['iDisableSprint','Input.ToggleSprint'],
    ['gIconSet','Game.IconSet'],
    ['sMapVotingTime','Server.MapVotingTime'],
    ['sNumOfRevotes','Server.NumberOfRevotesAllowed'],
    ['sNumberOfVotingOptions','Server.NumberOfVotingOptions'],
    ['sVotingDuplicationLevel','Server.VotingDuplicationLevel'],
    ['sTimeBetweenVoteEndAndGameStart','Server.TimeBetweenVoteEndAndGameStart'],
    ['sNumOfVetoes','Server.NumberOfVetoVotes'],['sVetoVoteTime','Server.VetoVoteTime'],
    ['sVetoWinningShowTime','Server.VetoWinningOptionShownTime'],
    ['sVetoPassPercentage','Server.VetoVotePassPercentage'],
    ['vEnabled','VoIP.Enabled'],
    ['vMicrophoneID','VoIP.MicrophoneID'],
    ['vPTTEnable','VoIP.PTT_Enabled'],
    ['vAGC','VoIP.AGC'],
    ['vNoiseSupress','VoIP.NoiseSupress'],
    ['vEchoCancelation','VoIP.EchoCancelation'],
    ['pName', 'Player.Name'], 
    ['renderWeapon', 'Player.RenderWeapon'], 
    ['armorHelmet', 'Player.Armor.Helmet'], 
    ['armorChest', 'Player.Armor.Chest'],
    ['armorShoulders', 'Player.Armor.Shoulders'], 
    ['armorArms', 'Player.Armor.Arms'], 
    ['armorLegs', 'Player.Armor.Legs'], 
    ['armorAcc', 'Player.Armor.Accessory'], 
    ['colorsPrimary', 'Player.Colors.Primary'], 
    ['colorsSecondary', 'Player.Colors.Secondary'], 
    ['colorsVisor', 'Player.Colors.Visor'],
    ['colorsLights', 'Player.Colors.Lights'], 
    ['colorsHolo', 'Player.Colors.Holo'],
    ['sUPNP','UPnP.Enabled'], 
    ['tAgressiveAudioDiscard', 'Tweaks.AggressiveAudioDiscarding'], 
    ['tDisableFog', 'Tweaks.DisableReactorFog'], 
    ['tDisableWeapOutline', 'Tweaks.DisableWeaponOutline'], 
    ['tDisableHeadshotEffect', 'Tweaks.DisableHeadshotEffect'],
    ['tDisableHitmarkers', 'Tweaks.DisableHitMarkers'], 
    ['tGruntBirthdayParty', 'Tweaks.GruntBirthdayParty'],
    ['tReachFrags','Tweaks.ReachStyleFrags'],
    ['tIntelBloomPatch','Tweaks.IntelBloomPatch'],
    ['sAudioDevice','Settings.AudioOutputDevice'],
    ['sContrast','Settings.Contrast']
];
var binds = ["Sprint", "Jump", "Crouch", "Use", "DualWield", "Fire", "FireLeft", "Reload", "ReloadLeft", "Zoom", "SwitchWeapons", "Melee", "Grenade", "SwitchGrenades", "VehicleAccelerate", "VehicleBrake", "VehicleBoost", "VehicleRaise", "VehicleDive", "VehicleFire", "VehicleAltFire", "BansheeBomb", "Menu", "Scoreboard", "ForgeDelete", "Chat", "TeamChat", "UseEquipment","VoiceChat","Forward","Back","Left","Right"];
var buttons = ["","A","B","X","Y","RB","LB","LT","RT","Start","Back","LS","RS","Left","Right","Up","Down"];
var renderWeapons = [
	["Assault Rifle","assault_rifle"],
	/*["Assault Rifle DMG","ar_variant_2"],
	["Assault Rifle ROF","ar_variant_3"],
	["Assault Rifle ACC","ar_variant_5"],
	["Assault Rifle PWR","ar_variant_6"],*/
	["Battle Rifle","battle_rifle"],
	/*["Battle Rifle ROF","br_variant_1"],
	["Battle Rifle ACC","br_variant_2"],
	["Battle Rifle MAG","br_variant_3"],
	["Battle Rifle DMG","br_variant_4"],
	["Battle Rifle RNG","br_variant_5"],
	["Battle Rifle PWR","br_variant_6"],
	["Covenant Carbine","covenant_carbine"],
	["Covenant Carbine MAG","covenant_carbine_variant_1"],
	["Covenant Carbine DMG","covenant_carbine_variant_2"],
	["Covenant Carbine ACC","covenant_carbine_variant_3"],
	["Covenant Carbine ROF","covenant_carbine_variant_4"],
	["Covenant Carbine RNG","covenant_carbine_variant_5"],
	["Covenant Carbine PWR","covenant_carbine_variant_6"],*/
	["DMR","dmr"],
	/*["DMR MAG","dmr_variant_1"],
	["DMR ACC","dmr_variant_2"],
	["DMR ROF","dmr_variant_3"],
	["DMR DMG","dmr_variant_4"],
	["DMR RNG","dmr_variant_5"],
	["DMR PWR","dmr_variant_6"],*/
	["Plasma Rifle","plasma_rifle"],
	/*["Plasma Rifle PWR","plasma_rifle_variant_6"],*/
	["SMG","smg"],
	/*["SMG ROF","smg_variant_1"],
	["SMG ACC","smg_variant_2"],
	["SMG DMG","smg_variant_4"],
	["SMG PWR","smg_variant_6"]*/
];
var armorList = [
	["Air Assault","air_assault"],
	["Ballista","ballista"],
	["Chameleon","chameleon"],
	["Cyclops","cyclops"],
	["Demo","demo"],
	["Dutch","dutch"],
	["Gladiator","gladiator"],
	["Gungnir","gungnir"],
	["Halberd","halberd"],
	["Hammerhead","hammerhead"],
	["Hoplite","hoplite"],
	["Juggernaut","juggernaut"],
	["Mac","mac"],
	["Mercenary","mercenary"],
	["Nihard","nihard"],
	["Omni","omni"],
	["Oracle","oracle"],
	["Orbital","orbital"],
	["Renegade","renegade"],
	["Scanner","scanner"],
	["Shark","shark"],
	["Silverback","silverback"],
	["Spectrum","spectrum"],
	["Stealth","stealth"],
	["Strider","strider"],
	["Widow Maker","widow_maker"]
];
var accessoryList = [
    ["None", ""],
    ["Ammo Belt", "ammo_belt"],
    ["Ammo Pack", "ammo_pack"],
    ["Antenna 1", "antenna_01"],
    ["Antenna 2", "antenna_02"],
    ["Bullet Shield", "bullet_shield"],
    ["Chest Battery", "chest_battery"],
    ["Dog Tag", "dog_tag_01"],
    ["Electronic Tool", "electronic_tool"],
    ["Flashlight", "flashlight"],
    ["Generator Device", "generator_device"],
    ["Grenade", "grenade_01"],
    ["Holo Scope", "holo_scope"],
    ["HUD Screen", "hud_screen"],
    ["Katana", "katana"],
    ["Knife 1", "knife_01"],
    ["Knife 2", "knife_02"],
    ["Medkit", "medkit"],
    ["Reactive Armor Arm", "reactive_armor_arm"],
    ["Reactive Armor Leg", "reactive_armor_leg"],
    ["Reactive Armor Plate", "reactive_armor_plate"],
    ["Shotgun Ammo", "shotgun_ammo"],
    ["Target Painter", "target_painter"],
    ["Throwing Knives", "throwing_knives"],
    ["Tool Bag", "tools_bag_1"]
];
var controllerPresets = [
    ["Halo Online Default","LS,A,X,RB,LB,RT,LT,RB,LB,RS,Y,B,LT,Right,,,LT,A,X,RT,LT,B,Start,Back,Y,,,LB,Down"],
    ["Halo 3 Default","Right,A,LS,RB,LB,RT,LT,RB,LB,RS,Y,B,LT,LB,,,LT,A,LS,RT,LT,B,Start,Back,Y,,,X,Down"],
    ["Halo 3 Southpaw","Right,A,LS,RB,LB,LT,RT,RB,LB,RS,Y,B,RT,LB,,,RT,A,LS,LT,RT,B,Start,Back,Y,,,X,Down"],
    ["Halo 3 Boxer","Right,A,LS,RB,LB,RT,LT,RB,LB,RS,Y,LT,B,LB,,,LT,A,LS,RT,LT,B,Start,Back,Y,,,X,Down"],
    ["Halo 3 Green Thumb","Right,A,LS,RB,LB,RT,LT,RB,LB,B,Y,RS,LT,LB,,,LT,A,LS,RT,LT,B,Start,Back,Y,,,X,Down"],
    ["Halo 3 Bumper Jumper","Right,LB,LS,B,A,RT,LT,B,A,RS,Y,RB,LT,A,,,LT,LB,LS,RT,LT,B,Start,Back,Y,,,X,Down"],
    ["Halo 3 Walkie Talkie","Right,A,LS,B,X,RT,LT,B,X,RS,Y,RB,LT,A,,,LT,A,LS,RT,LT,B,Start,Back,Y,,LB,Up,Down"],
    ["Halo Reach Default","LB,A,LS,X,LB,RT,LT,X,LB,RS,Y,RB,LT,B,,,LT,A,LS,RT,LT,B,Start,Back,Y,Down,Left,Right,Down"],
    ["Halo Reach Southpaw","RB,A,LS,X,RB,LT,RT,X,RB,RS,Y,LB,RT,B,,,RT,A,LS,LT,RT,B,Start,Back,Y,Down,Left,Right,Down"],
    ["Halo Reach Boxer","LB,A,LS,X,LB,RT,LT,X,LB,RS,Y,LT,RB,B,,,LT,A,LS,RT,LT,B,Start,Back,Y,Down,Left,Right,Down"],
    ["Halo Reach Green Thumb","LB,A,LS,X,LB,RT,LT,X,LB,RB,Y,RS,LT,B,,,LT,A,LS,RT,LT,B,Start,Back,Y,Down,Left,Right,Down"],
    ["Halo Reach Bumper Jumper","X,LB,LS,B,LB,RT,LT,B,LB,RS,Y,RB,LT,A,,,LT,LB,LS,RT,LT,RB,Start,Back,Y,Down,Left,Right,Down"],
    ["Halo Reach Recon","LB,A,LS,RB,LB,RT,LT,RB,LB,RS,Y,B,LT,X,,,LT,A,LS,RT,LT,B,Start,Back,Y,Down,Left,Right,Down"],
    ["Halo 4 Default","LS,A,B,X,LB,RT,LT,X,LB,RS,Y,RB,LT,Right,,,LT,A,B,RT,LT,RB,Start,Back,Y,,,LB,Down"],
    ["Halo 4 Southpaw","LS,A,B,X,RB,LT,RT,X,RB,RS,Y,LB,RT,Right,,,RT,A,B,LT,RT,LB,Start,Back,Y,,,LB,Down"],
    ["Halo 4 Boxer","B,A,LS,X,LB,RT,LT,X,LB,RS,Y,LT,RB,Right,,,LT,A,LS,RT,LT,B,Start,Back,Y,,,LB,Down"],
    ["Halo 4 Green Thumb","LS,A,B,X,LB,RT,LT,X,LB,RB,Y,RS,LT,Right,,,LT,A,B,RT,LT,RB,Start,Back,Y,,,LB,Down"],
    ["Halo 4 Bumper Jumper","A,LB,LS,B,X,RT,LT,B,X,RS,Y,RB,LT,Right,,,LT,LB,LS,RT,LT,RB,Start,Back,Y,,,X,Down"],
    ["Halo 4 Recon","X,A,LS,RB,LB,RT,LT,RB,LB,RS,Y,B,LT,Right,,,LT,A,LS,RT,LT,B,Start,Back,Y,,,LB,Down"],
    ["Halo 4 Fishstick","LS,A,B,X,LB,RT,LT,X,LB,LT,Y,RS,RB,Right,,,LT,A,B,RT,LT,RS,Start,Back,Y,,,LB,Down"]
];
var controllerIconPacks = [
    ['Xbox 360','360'],
    ['Xbox One','XboxOne']
];

$(document).ready(function(){
    $(document).keyup(function (e) {
        if (e.keyCode === 27) {
            if(window.location.hash != '#page5'){
                cancelButton();
            }
        }
    });
    $(document).keydown(function(e){
        if(e.keyCode == 192 || e.keyCode == 223){
            dew.show('console');
        }
    });
    initActive();
    setButtonLists();
    setOptionList('presetMenu', controllerPresets);
	setOptionList('renderWeapon', renderWeapons);
	setOptionList('armorHelmet', armorList);
	setOptionList('armorChest', armorList);
	setOptionList('armorShoulders', armorList);
	setOptionList('armorArms', armorList);
	setOptionList('armorLegs', armorList);
    setOptionList('armorAcc', accessoryList);
    setOptionList('gIconSet', controllerIconPacks);
    dew.command('Game.ListMedalPacks', {}).then(function(response) {
        var packArray = [];
        var packs = response.split(',');
        for (i = 0; i < packs.length; i++){
            if(packs[i].indexOf(" ") == -1){
                packArray.push([packs[i],packs[i]]);
            }
        }
        setOptionList('gMedalPack', packArray);
    });
    $('.tabs li a').click(function(e){
        adjustBiped();   
        $('.tabs li').removeClass('selected');
        $(this).parent().addClass('selected');
        window.location.href = e.target.href;
        activePage = e.target.hash;
        itemNumber = 0;
        $(e).ready(function(){
            if(hasGP){
                updateSelection(0);
            }
            tabIndex = $('.tabs li:visible a').index($("a[href='"+activePage+"']"));
        });
    });
    $('.tinySetting').on('change', function(){
        var newID = $(this).attr('id');
        if(newID.endsWith('Text')){
            newID = newID.slice(0, -4);
        }
        $('#'+newID).val($(this).val());
    });
    $('input[type=range]').on('input', function(){
        var newID = $(this).attr('id') + 'Text';
        $('#'+newID).val($(this).val());
    });
    $('#settingsWindow input:not(#lookSensitivity,#lookSensitivityText), #settingsWindow select,#settingsWindow textarea').on('change', function(e){
        var elementID = e.target.id;
        if($('#'+elementID).hasClass('tinySetting') && e.target.id.endsWith('Text')){
            elementID = elementID.slice(0, -4);
        }
        var newValue = e.target.value;
        if(e.target.computedRole == 'checkbox'){
            if($('#'+elementID).is(':checked')){
                newValue = '1';
            }else{
                newValue = '0';
            }
        }
        $.grep(settingsToLoad, function(result){
            if(result[0] == elementID){
                queueChange([result[1], newValue]);
            };
        });
    });
    $('#lookSensitivity, #lookSensitivityText').on('change', function(e){
        var xVal = 90 + (e.target.value * 20);
        queueChange(['Input.ControllerSensitivityX', xVal]);
        queueChange(['Input.ControllerSensitivityY', 90]);
    });
    $('.instant').on('change', function(e){
        if($(this).hasClass('color')){
            if(!/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e.target.value)){
                $(this).val('#FFFFFF');
                return;
            }
        }
        $.grep(settingsToLoad, function(result){
            if(result[0] == e.target.id){
                dew.command(result[1] + ' ' + e.target.value);
            };
        });
    });
    $('.color').colorPicker({
        opacity: false,    
        renderCallback: function($elm, toggled) {
            var colors = this.color.colors;
            $.grep(settingsToLoad, function(result){
                if(result[0] == $elm[0].id){
                    dew.command(result[1]+' #'+colors.HEX);
                };
            });
        }
    });
    $('.wheelable').on('mousewheel', function(e) {
        if(e.originalEvent.wheelDelta > 0) {
            var elementIndex = $('#'+this.id+' option:selected').index();
            if(elementIndex > 0){
                var newElement = elementIndex - 1;
                $('#'+this.id+' option').eq(newElement).prop('selected', true);
                $('#'+this.id).trigger('change');
            }
        }else{
            var elementIndex = $('#'+this.id+' option:selected').index();
            var elementLength = $('#'+this.id).children('option').length;
            if(elementIndex < elementLength){
                var newElement = elementIndex + 1;
                $('#'+this.id+' option').eq(newElement).prop('selected', true);
                $('#'+this.id).trigger('change');
            }
        }
    });
    dew.command('Graphics.SupportedResolutions', {}).then(function(response){
        var supportedArray = JSON.parse(response);
        var resolutionArray = [['Default','default']];
        for(i = 0; i < supportedArray.length; i++){
            resolutionArray.push([supportedArray[i],supportedArray[i]]);
        }
        setOptionList('sScreenResolution', resolutionArray);
    });
    $('#applyButton').on('click', function(e){
        applyButton();
    });
    $('#cancelButton').on('click', function(e){
        cancelButton();
    });
    $('#sTextureResolution, #sTextureFiltering, #sLightningQuality, #sEffectsQuality, #sShadowQuality, #sDetailsLevel, #sPostprocessing').on('change', function(e){
        if($('#sTextureResolution').val() == e.target.value && $('#sTextureFiltering').val() == e.target.value && $('#sLightningQuality').val() == e.target.value && $('#sEffectsQuality').val() == e.target.value && $('#sDetailsLevel').val() == e.target.value && $('#sPostprocessing').val() == e.target.value){
            $('#sQualityPreset').val(e.target.value);
        }else{
            $('#sQualityPreset').val('custom');
        }
    });
    $('#sQualityPreset').on('change', function(e){
        if(e.target.value != 'custom'){
            $('#sTextureResolution').val(e.target.value);
            $('#sTextureFiltering').val(e.target.value);
            $('#sLightningQuality').val(e.target.value);
            $('#sEffectsQuality').val(e.target.value);
            $('#sDetailsLevel').val(e.target.value);
            $('#sPostprocessing').val(e.target.value);
            if(e.target.value == 'low'){
                $('#sShadowQuality').val('medium');
            }else{
                $('#sShadowQuality').val(e.target.value);
            }
            if(e.target.value == 'high'){
                 $('#sMotionBlur').prop('checked', true);
            }else{
                $('#sMotionBlur').prop('checked', false);
            }
            $('.video').trigger('change');
        }
    });
    $('#sVotingStyle').on('change', function(){
        updateVotingStyle(this.value);
        if(hasGP){
            if(itemNumber > $(activePage + ' label:visible').length-1){
                itemNumber = $(activePage + ' label:visible').length-1;
            }
            updateSelection(itemNumber);
        }
    });
    $('#sSprint').on('change', function(){
        updateSprint(this.value);
    });
    $('#presetMenu').on('change', function(){
        applyBindString(this.value);
    });
    $('#gIconSet').on('change', function(){
        setButtons();
    });
    $('.voip').on('change', function(){
        changeArray.push(['VoIP.Update', '']);
    });
    $('#wOffsetConfig').on('change', function(){
        changeArray.push(['Weapon.JSON.Load', '']);
    });    
    navigator.mediaDevices.enumerateDevices().then(function(devices){
        var deviceArray = [['Default','']];
        for (i = 0; i < devices.length; i++){
            if(devices[i].kind == "audioinput" && devices[i].label){
                deviceArray.push([devices[i].label,devices[i].label]);
            }
        }
        setOptionList('vMicrophoneID', deviceArray);
    });
    setControlValues();
    initializeBindings();
    setButtons();
    if(hasGP){
        $('button img,.tabs img').show();
    }
    $('.bind').on('change', function(){
        updateBinding(this.id, this.value);
        updateBindLabels();
    });   
    dew.command('Server.VotingEnabled', {}).then(function(x){
        dew.command('Server.VetoSystemEnabled', {}).then(function(y){
            if(x == '1' && y == '1'){
                $('#sVotingStyle').val('2');
                $('#voting').hide();
            }else if(x == '1' && y == '0'){
                $('#sVotingStyle').val('1');
                $('#voting').show();
                $('#veto').hide();
            }else{
                $('#sVotingStyle').val('0');
                $('#voting, #veto').hide();
            }
        });       
    });
    dew.command('Server.SprintEnabled', {}).then(function(a){
        dew.command('Server.UnlimitedSprint', {}).then(function(b){
            if(a == '1' && b == '1'){
                $('#sSprint').val('2');
            }else if(a == '1' && b == '0'){
                $('#sSprint').val('1');
            }else{
                $('#sSprint').val('0');
            }
        });       
    });
    dew.command('Settings.AudioOutputDeviceList', {}).then(function(response) {
        var audioDevArray = [];
        var devs = JSON.parse(response);
        for (i = 0; i < devs.length; i++){
                audioDevArray.push([devs[i],i]);
        }
        setOptionList('sAudioDevice', audioDevArray);
    });
    
    dew.on('controllerinput', function(e){    
        if(hasGP){    
            if(e.data.A == 1){
                if($('#'+selectedItem).prev()[0].computedRole == 'button'){
                    $('#'+selectedItem).prev().click();
                }else{
                    toggleSetting();
                }
            }
            if(e.data.B == 1){
                cancelButton();
            }
            if(e.data.X == 1){
                if(activePage=='#page7'){
                    randomArmor();
                }else if(selectedItem=='presetMenu'){
                    location.href='#page9';
                }
            }
            if(e.data.Y == 1){
                if(activePage=='#page7'){
                    randomColors();
                }
            }
            if(e.data.Up == 1){
                upNav();
            }
            if(e.data.Down == 1){
                downNav();
            }
            if(e.data.Left == 1){
                leftToggle();
            }
            if(e.data.Right == 1){
                rightToggle();
            }
            if(e.data.LeftBumper == 1){
                prevPage();
            }
            if(e.data.RightBumper == 1){
                nextPage();
            }
            if(e.data.Start == 1){
                applyButton();
            }
            if(e.data.LeftTrigger != 0){
                rotateBiped('left');
            }
            if(e.data.RightTrigger != 0){
                rotateBiped('right');
            }
            if(e.data.AxisLeftX != 0){
                if(e.data.AxisLeftX > axisThreshold){
                    stickTicks.right++;
                };
                if(e.data.AxisLeftX < -axisThreshold){
                    stickTicks.left++;
                };
            }else{
                stickTicks.right = 0;
                stickTicks.left = 0;
            }
            if(e.data.AxisLeftY != 0){
                if(e.data.AxisLeftY > axisThreshold){
                    stickTicks.up++;
                };
                if(e.data.AxisLeftY < -axisThreshold){
                    stickTicks.down++;
                };
            }else{
                stickTicks.up = 0;
                stickTicks.down = 0;               
            }
        }
    });
    var clicking = false;
    var currentPos = {x: null, y: null};
    $('#playerWindow').mousedown(function(){
        clicking = true;
    });
    $(document).mouseup(function(){
        clicking = false;
    })
    $('#playerWindow').mousemove(function(event){
        if(clicking){
            currentPos.x = event.clientX;
            currentPos.y = event.clientY;
            var xDiff = (currentPos.x + 90);
            //console.log(xDiff);
            dew.command('Player.Armor.SetUiModelRotation ' + xDiff);
        }
    });
});

function checkGamepad(){
    var shouldUpdateHeld = false;
    if(Date.now() - lastHeldUpdated > 100) {
        shouldUpdateHeld = true;
        lastHeldUpdated = Date.now();
    }
    if(stickTicks.up == 1 || (shouldUpdateHeld && stickTicks.up > 25)){
        upNav();
    }
    if(stickTicks.down == 1 || (shouldUpdateHeld && stickTicks.down > 25)){
        downNav();
    }
    if(stickTicks.left == 1 || (shouldUpdateHeld && stickTicks.left > 25)){
        leftToggle();
    }
    if(stickTicks.right == 1 || (shouldUpdateHeld && stickTicks.right > 25)){
        rightToggle();
    }
};

function setButtons(){
    dew.command('Game.IconSet', {}).then(function(response){
        $('#randomArmor img').attr('src','dew://assets/buttons/' + response + '_X.png');
        $('#randomColors img').attr('src','dew://assets/buttons/' + response + '_Y.png');
        $('#applyButton img').attr('src','dew://assets/buttons/' + response + '_Start.png');
        $('#cancelButton img').attr('src','dew://assets/buttons/' + response + '_B.png');
        $('.tabs img').eq(0).attr('src','dew://assets/buttons/' + response + '_LB.png');
        $('.tabs img').eq(1).attr('src','dew://assets/buttons/' + response + '_RB.png');
    });
}

var bipedRotate = 270;
dew.on('show', function(e){
    bipedRotate = 270;
    dew.getSessionInfo().then(function(i){
        if(i.established){
            if(i.mapName != "mainmenu"){
                $('.tabs li').eq(0).hide();
                if(i.isHost){
                    $('.tabs li').eq(1).show();
                }else{
                    $('.tabs li').eq(1).hide();
                }
                $('.tabs li').eq(5).hide();
            }else{
                $('.tabs li').eq(0).show();
                $('.tabs li').eq(5).show();  
            }
        }else{
            $('.tabs li').eq(0).show();
            $('.tabs li').eq(1).show();   
            $('.tabs li').eq(5).show();            
        }
        initActive();
    });
    setControlValues();
    setButtons();
    adjustBiped();
    dew.command('Settings.Gamepad', {}).then(function(result){
        if(result == 1){
            onControllerConnect();
            hasGP = true;
            repGP = window.setInterval(checkGamepad,1000/60);
        }else{
            onControllerDisconnect();
            hasGP = false;
            if(repGP){
                window.clearInterval(repGP);
            }
        }
    });
    dew.command('game.hideh3ui 1');
});

dew.on('hide', function(e){
    dew.command('Player.Armor.SetUiModelPosition -0.398312 -13.5218 25.5292');
    dew.command('Player.Armor.SetUiModelRotation 270');
    dew.command('game.hideh3ui 0');
    if(repGP){
        window.clearInterval(repGP);
    }
});

function rotateBiped(direction){
    if(direction == "right"){
        bipedRotate++;
    }else{
        bipedRotate--;
    }
    dew.command('Player.Armor.SetUiModelRotation '+bipedRotate);
}

function initActive(){
    tabIndex = 0;
    $('.selected').removeClass('selected');
    $('.tabs li:visible').eq(0).addClass('selected');
    location.hash = $('.selected a')[0].hash;
    activePage = window.location.hash;
}

function setControlValues(){
    commandValues = [];
    dew.getCommands().then(function (commands){
        for(i = 0; i < commands.length; i++){
            var setValue = commands[i].value;
            $.grep(settingsToLoad, function(result){
                if(result[1] == commands[i].name){
                    commandValues.push([result[0],commands[i].name,commands[i].value]);
                    if(result[1].startsWith('Player.Colors')){
                        $('#'+result[0]).css('background-color',setValue);   
                        $('#'+result[0]).val(setValue); 
                        if(getLuminance(setValue)> 0.22){
                            $('#'+result[0]).css('color','#222');
                        }else{
                            $('#'+result[0]).css('color','#ddd');
                        }
                    }else if(result[1].startsWith('Input.ControllerSensitivityX')){ 
                        var xVal = (setValue-90)/20;
                        $('#lookSensitivity').val(xVal);
                        $('#lookSensitivityText').val(xVal);
                    }else if(result[1].startsWith('Settings.PostprocessingQuality')){
                        $('#'+result[0]).val(setValue);
                        if($('#sTextureResolution').val() == setValue && $('#sTextureFiltering').val() == setValue && $('#sLightningQuality').val() == setValue && $('#sEffectsQuality').val() == setValue && $('#sShadowQuality').val() == setValue && $('#sDetailsLevel').val() == setValue && $('#sPostprocessing').val() == setValue){
                            $('#sQualityPreset').val(setValue);
                        }else{
                            $('#sQualityPreset').val('custom');
                        }
                    }else{
                        if($('#'+result[0]).is(':checkbox')){
                            if(setValue == '1'){
                                $('#'+result[0]).prop('checked', true);
                            }else{
                                $('#'+result[0]).prop('checked', false);                               
                            }
                        }else{
                            if($('#'+result[0]).hasClass('tinySetting')){
                                setValue = parseFloat(setValue);
                            }
                            $('#'+result[0]).val(setValue);
                        }
                        $('#'+result[0]).val(setValue);
                        if($('#'+result[0]).hasClass('hasTiny')){
                            $('#'+result[0]+'Text').val(setValue);
                        }
                    }
                };
            });
        }
    })
}

function adjustBiped(){
    //console.log(getAspectRatio());
    if(getAspectRatio() == '4:3' || getAspectRatio() == '5:4' ){
        dew.command('Player.Armor.SetUiModelPosition 0.048312 -13.6018 25.5232');
    }else{
        dew.command('Player.Armor.SetUiModelPosition 0.108312 -13.2518 25.5232');
    }    
}

function switchPage(pageHash){
    itemNumber = 0;
    location.href=pageHash;
    activePage=pageHash;    
    if(hasGP){
        updateSelection(0);
    }
}

function editControls(which){
    if(which == 0){
        switchPage('#page5');
    }else{
        switchPage('#page8');
    }
}

function applySettings(i){
    if(i != changeArray.length){
        dew.command(changeArray[i][0] + ' "' + changeArray[i][1] + '"', {}).then(function(){
			i++;
			applySettings(i);            
        }).catch(function (error){
            console.log(error);
            i++;
			applySettings(i);  
        });
    }else{
        changeArray = [];
        dew.command('writeconfig');
    }
}

function applyButton(){
    if(window.location.hash == '#page5'){
        applyBinds();
        switchPage('#page2'); 
    }else if(window.location.hash == '#page4'){
        applySettings(0);
        switchPage('#page3');    
    }else if(window.location.hash == '#page9'){
        switchPage('#page8');    
    }else if(window.location.hash == '#page8'){
        switchPage('#page2');    
    }else{
        if(changeArray.length){
            applySettings(0);           
        }else{
            dew.hide();
        }
    }
}

function cancelButton(){
    resetInstants();
    itemNumber = 0;
    if(window.location.hash == '#page5'){
        initializeBindings(); 
        switchPage('#page2');  
    }else if(window.location.hash == '#page4'){
        setControlValues();      
        switchPage('#page3');
    }else if(window.location.hash == '#page9'){ 
        switchPage('#page8');
    }else if(window.location.hash == '#page8'){ 
        switchPage('#page2');
    }else{
        dew.hide();
        setControlValues();
        changeArray = [];
    }
}

function applyBinds(){
    for(i=0; i<$('#bindBox tbody tr').length; i++){
        var action = $('#bindBox tbody tr').eq(i).find('td').eq(0).text();
        var primaryKey = $('#bindBox tbody tr').eq(i).find('input').eq(0).val();
        var secondaryKey = $('#bindBox tbody tr').eq(i).find('input').eq(1).val();
        dew.command('Input.KeyboardAction ' + action + ' ' + primaryKey + ' ' + secondaryKey);
    }
    dew.command('writeconfig');
}

function setOptionList(ElementID, ArrayVar){
    var sel = document.getElementById(ElementID);
    for(var i = 0; i < ArrayVar.length; i++){
        var opt = document.createElement('option');
        opt.innerHTML = ArrayVar[i][0];
        opt.value = ArrayVar[i][1];
        sel.appendChild(opt);
    }
}

function updateVotingStyle(value){
    if(value == "0"){
        queueChange(['Server.VotingEnabled', '0']);
        queueChange(['Server.VetoSystemEnabled', '0']);
        $('#voting, #veto').hide();
    }else if(value == "1"){
        queueChange(['Server.VotingEnabled', '1']);
        queueChange(['Server.VetoSystemEnabled', '0']);
        $('#veto').hide();
        $('#voting').show();
    }else{
        queueChange(['Server.VotingEnabled', '0']);
        queueChange(['Server.VetoSystemEnabled', '1']);
        $('#voting').hide();
        $('#veto').show();
    }
}

function updateSprint(value){
    if(value == "0"){
        queueChange(['Server.SprintEnabled', '0']);
        queueChange(['Server.UnlimitedSprint', '0']);
    }else if(value == "1"){
        queueChange(['Server.SprintEnabled', '1']);
        queueChange(['Server.UnlimitedSprint', '0']);
    }else{
        queueChange(['Server.SprintEnabled', '1']);
        queueChange(['Server.UnlimitedSprint', '1']);
    }
}

function getLuminance(hex) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    var div = 255,
        RGB = [r/div, g/div, b/div],
        luminance = {r: 0.2126, g: 0.7152, b: 0.0722};
    for (var i = RGB.length; i--; ) {
        RGB[i] = RGB[i] <= 0.03928 ? RGB[i] / 12.92 : Math.pow(((RGB[i] + 0.055) / 1.055), 2.4);
    }
    return ((luminance.r * RGB[0]) + (luminance.g * RGB[1]) + (luminance.b * RGB[2]));
}

function applyBindString(bindString){
    var bindArray = new Array(bindString.split(','));
    for (i = 0; i < bindArray[0].length; i++) { 
        $('#'+binds[i]).val(bindArray[0][i]);
        updateBinding(binds[i], bindArray[0][i]);
    }
    updateBindLabels();
}

function initializeBindings(){
    dew.command("Input.DumpBindingsJson", {}).then(function(response){
        $('#bindBox tbody').empty();
        var bindDump = JSON.parse(response);
        for (i = 0; i < bindDump.length; i++){
            if(bindDump[i].controllerButton=="Select"){
                bindDump[i].controllerButton="Back";
            }
            $('#'+bindDump[i].actionName).val(bindDump[i].controllerButton);
            if($.inArray(bindDump[i].actionName, binds) > -1){
                var primaryBind = bindDump[i].primaryKey;
                if(bindDump[i].primaryMouseButton != 'none'){
                    primaryBind = bindDump[i].primaryMouseButton;
                }
                var secondaryBind = bindDump[i].secondaryKey;
                if(bindDump[i].secondaryMouseButton != 'none'){
                    secondaryBind = bindDump[i].secondaryMouseButton;
                }
                $('#bindBox').find('tbody').append($('<tr><td>'+bindDump[i].actionName+'</td><td><input class="keybind" value='+primaryBind+'></td><td><input class="keybind" value='+secondaryBind+'></td></tr>'));
            }
        }
        updateBindLabels();
        getCurrentBindString();
        $('.keybind').on('focus blur', function(e){
            var this_ = $(this);
            dew.on('mouse-xbutton-event', function(m){
                if(m.data.xbutton == 1){
                    document.activeElement.value = 'Mouse4';
                }else{
                    document.activeElement.value = 'Mouse5';
                }; 
                document.activeElement.blur();
            });
            function keyHandler(e){
                e.preventDefault();
                e.stopPropagation();

                // not escape
                if(e.keyCode == 27){
                    if(previousBind){
                        if(previousBind == this_.val()){
                            this_.val('none');
                        }else{
                            this_.val(previousBind);
                        }
                    }
                    this_.blur();
                    return;
                }

                // A-Z, 0-9
                if((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 48 && e.keyCode < 58))
                    this_.val( String.fromCharCode(e.keyCode));

                switch(e.keyCode){
                    case 8: 
                        this_.val('Back'); 
                    break;
                    case 9: 
                        this_.val('Tab'); 
                    break;
                    case 13:
                        this_.val('Enter');
                    break;
                    case 16: 
                        if(e.originalEvent.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT){
                           this_.val('LShift'); 
                        }else{
                           this_.val('RShift'); 
                        }   
                    break
                    case 17:
                        if(e.originalEvent.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT){
                           this_.val('LControl'); 
                        }else{
                           this_.val('RControl'); 
                        }   
                    break;
                    case 18:
                        if(e.originalEvent.location === KeyboardEvent.DOM_KEY_LOCATION_LEFT){
                           this_.val('LAlt'); 
                        }else{
                           this_.val('RAlt'); 
                        }  
                    case 32: 
                        this_.val('Space'); 
                    break;
                    case 46: 
                        this_.val('Delete'); 
                    break;
                    default:
                        //console.log(e.keyCode);
                }
                this_.blur();
            };

            function mouseHandler(e){
                e.preventDefault();
                e.stopPropagation();
                if(e.type == 'mousewheel'){
                    if(e.originalEvent.wheelDelta > 0){
                        this_.val('MouseWheelUp');
                    }else{
                        this_.val('MouseWheelDown');
                    }   
                }
                else if(e.type == 'mousedown'){
                    switch(e.which){
                        case 1:
                            this_.val('MouseLeft');
                        break;
                        case 2:
                            this_.val('MouseMiddle');
                        break;
                        case 3:
                            this_.val('MouseRight');
                        break;
                        default:
                            this_.val('Mouse' + e.which);
                    }
                }
                this_.blur();
            };

            var $doc = $(document);
            if(e.type == 'focus'){
                $doc.on('mousedown.rebind', mouseHandler);
                $doc.on('mousewheel.rebind', mouseHandler);
                $doc.on('keydown.rebind', keyHandler);
            }else{
                previousBind = e.target.defaultValue;
                $doc.off('keydown.rebind');
                $doc.off('mousedown.rebind');
                $doc.off('mousewheel.rebind');
            }
        });
    });
}

function updateBinding(action, bind){
    if (bind == "Back") { bind = "Select"; }
    if (bind) { bind = "\"" + bind + "\""; }
    dew.command("Input.ControllerAction \"" + action + "\" " + bind, {}).then(function(){
        dew.command("writeconfig");
    });
}

function updateBindLabels(){
    $('#controllerGraphic').children('div').empty();
    for (i = 0; i < binds.length-4; i++) { 
        var bind = document.getElementById(binds[i]).value;
        var action = binds[i];
        if(document.getElementById(bind)){
            var actionString = action;
            if(document.getElementById(bind).innerHTML.length > 0){
                actionString = ", " + action;
            }
            $("#" + bind).append(actionString);
        }
    }
}

function getCurrentBindString(){
    var currentBinds = "";
    for(var i = 0; i < binds.length-4; i++) {
        if($('#'+binds[i]).val()){
            currentBinds += $('#'+binds[i]).val() + ",";
        }else{
            currentBinds += ",";
        }
    }
    //console.log(currentBinds.slice(0, -1));
    $("#presetMenu").val(currentBinds.slice(0, -1));
}

function setButtonLists(){
    for(var i = 0; i < binds.length-4; i++) {
        var sel = document.getElementById(binds[i]);
        for(var x = 0; x < buttons.length; x++) {
            var opt = document.createElement('option');
            opt.innerHTML = buttons[x];
            opt.value = buttons[x];
            sel.appendChild(opt);
        }
    }
}
function randomArmor(){
    var armorArray = ['armorHelmet','armorChest','armorShoulders','armorArms','armorLegs'];
    for(var i = 0; i < armorArray.length; i++) {
        var $options = $('#'+armorArray[i]).find('option'),
            random = ~~(Math.random() * $options.length);
        $options.eq(random).prop('selected', true);    
        $.grep(settingsToLoad, function(result){
            if(result[0] == armorArray[i]){
                dew.command(result[1] + ' ' + $('#'+armorArray[i]).val());
            };
        });
    }
}

function randomColors(){
    var colorArray = ['colorsPrimary','colorsSecondary','colorsVisor','colorsLights','colorsHolo'];
    for(var i = 0; i < colorArray.length; i++) {
        var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16).toUpperCase();
        $('#'+colorArray[i]).css("background-color",randomColor);
        if(getLuminance(randomColor)> 0.22){
            $('#'+colorArray[i]).css("color","#222");
        }else{
            $('#'+colorArray[i]).css("color","#ddd");
        }
        $('#'+colorArray[i]).val(randomColor);
        $.grep(settingsToLoad, function(result){
            if(result[0] == colorArray[i]){
                dew.command(result[1] + ' ' + randomColor);
            };
        });
    }   
}

function updateSelection(item){
    colorIndex = 0;
    $('.selectedElement').removeClass('selectedElement');
    $(activePage + ' label:visible').eq(item).parent().addClass('selectedElement');
    selectedItem = $(activePage + ' .setting:visible').not('span').eq(itemNumber).attr('id');
    $('#'+selectedItem).parent()[0].scrollIntoView(false);
    dew.command('Game.PlaySound 0xAFE');
}

function prevPage(){
    if(tabIndex > 0){
        $('.tabs li:visible a').eq(tabIndex-1).click();
    }        
}

function nextPage(){
    var tabLength = $('.tabs li').length-1;
    if(tabIndex < tabLength){
        $('.tabs li:visible a').eq(tabIndex+1).click();
    }        
}

function upNav(){
    if(itemNumber > 0){
        itemNumber--;
        updateSelection(itemNumber);
    }
}

function downNav(){
    if(itemNumber < $(activePage + ' label:visible').length-1){
        itemNumber++;
        updateSelection(itemNumber);
    }           
}

function onControllerConnect(){
    updateSelection(itemNumber);
    $('button img, .tabs img').show();
}

function onControllerDisconnect(){
    $('.selectedItem').removeClass(); 
    $('button img, .tabs img').hide();
}

function getAspectRatio(){
    function gcd (a, b) {
        return (b == 0) ? a : gcd (b, a%b);
    }
    var w = screen.width;
    var h = screen.height;
    var r = gcd (w, h);
    return w/r+":"+h/r;
}

function resetInstants(){
    for(var i = 0; i < $('.instant').length; i++) {
        var elementID = $('.instant').eq(i).attr('id');
        $.grep(commandValues, function(result){
            if(result[0] == elementID){
                dew.command(result[1] + ' ' + result[2]);
            };
        });
    }
}

function leftToggle(){
    if(document.getElementById(selectedItem).computedRole == "combobox"){
        var elementIndex = $('#'+selectedItem+' option:selected').index();
        if(elementIndex > 0){
            var newElement = elementIndex - 1;
            $('#'+selectedItem+' option').eq(newElement).prop('selected', true);
        }
    }
    if(document.getElementById(selectedItem).computedRole == "slider"){
        document.getElementById(selectedItem).stepDown();
        document.querySelector('#'+selectedItem +'Text').value = document.getElementById(selectedItem).value; 
    }
    if($('#'+selectedItem).hasClass('color')){
        colorIndex = $.inArray($('#'+selectedItem).val(), h3ColorArray);
        if(colorIndex == -1){ colorIndex = 0 };       
        if($('#'+selectedItem).val()==h3ColorArray[colorIndex]){
            if(colorIndex > 0){
                colorIndex--;
            }    
        }
        setColor(h3ColorArray[colorIndex]);
    }
    if(document.getElementById(selectedItem).computedRole == "combobox" || document.getElementById(selectedItem).computedRole == "slider" || $('#'+selectedItem).hasClass('color')){
        $('#'+selectedItem).trigger('change');
        dew.command('Game.PlaySound 0x0B00');  
    }
}

function rightToggle(){
    if(document.getElementById(selectedItem).computedRole == "combobox"){
        var elementIndex = $('#'+selectedItem+' option:selected').index();
        var elementLength = $('#'+selectedItem).children('option').length;
        if(elementIndex < elementLength){
            var newElement = elementIndex + 1;
            $('#'+selectedItem+' option').eq(newElement).prop('selected', true);
        } 
    }
    if(document.getElementById(selectedItem).computedRole == "slider"){
        document.getElementById(selectedItem).stepUp();
        document.querySelector('#'+selectedItem +'Text').value = document.getElementById(selectedItem).value;   
    }
    if($('#'+selectedItem).hasClass('color')){
        colorIndex = $.inArray( $('#'+selectedItem).val(), h3ColorArray);
        if(colorIndex == -1){ colorIndex = 0 };
        if($('#'+selectedItem).val()==h3ColorArray[colorIndex]){
            if(colorIndex < h3ColorArray.length-1){
                colorIndex++;
            }      
        }
        setColor(h3ColorArray[colorIndex]);
    }
    if(document.getElementById(selectedItem).computedRole == "combobox" || document.getElementById(selectedItem).computedRole == "slider" || $('#'+selectedItem).hasClass('color')){
        $('#'+selectedItem).trigger('change');
        dew.command('Game.PlaySound 0x0B00');  
    }
}

function setColor(colorHex){
    $('#'+selectedItem).css('background-color',colorHex);   
    $('#'+selectedItem).val(colorHex); 
    if(getLuminance(colorHex)> 0.22){
        $('#'+selectedItem).css('color','#222');
    }else{
        $('#'+selectedItem).css('color','#ddd');
    }      
}

function toggleSetting(){
    if(document.getElementById(selectedItem).computedRole == "checkbox"){
        if(document.getElementById(selectedItem).checked){
            document.getElementById(selectedItem).checked = false;
        }else{
            document.getElementById(selectedItem).checked = true;
        }
        $('#'+selectedItem).trigger('change');
        dew.command('Game.PlaySound 0x0B00');  
    }       
}

function updateSensitivity(value){
    var xVal = 90 + (value * 20);
    dew.command("Input.ControllerSensitivityX " + xVal, {}).then(function(){
        dew.command("writeconfig");
    });
}

function queueChange(changeBlock){
    $.grep(changeArray, function(result, index){
        if(result){
            if(result[0] == changeBlock[0]){
                changeArray.splice(index,1);
            };
        }
    });
    changeArray.push(changeBlock);
}