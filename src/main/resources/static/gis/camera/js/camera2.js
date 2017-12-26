
var iChannelID = parseInt("1", 10);
// 初始化插件

// 全局保存当前选中窗口
var g_iWndIndex = 0; //可以不用设置这个变量，有窗口参数的接口中，不用传值，开发包会默认使用当前选择窗口
$(function () {
	// 检查插件是否已经安装过
	if (-1 == WebVideoCtrl.I_CheckPluginInstall()) {
		alert("您还未安装过插件，双击开发包目录里的WebComponents.exe安装！");
		return;
	}
	var pluW = $("#divPlugin").width();
	var pluH = pluW * 0.6;
	// 初始化插件参数及插入插件
	WebVideoCtrl.I_InitPlugin(pluW, pluH, {
        iWndowType: 1,
		cbSelWnd: function (xmlDoc) {
			g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
			var szInfo = "当前选择的窗口编号：" + g_iWndIndex;
		}
	});
	WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");

	// 检查插件是否最新
	if (-1 == WebVideoCtrl.I_CheckPluginVersion()) {
		alert("检测到新的插件版本，双击开发包目录里的WebComponents.exe升级！");
		return;
	}

	// 窗口事件绑定
	$(window).bind({
		resize: function () {
			var $Restart = $("#restartDiv");
			if ($Restart.length > 0) {
				var oSize = getWindowSize();
				$Restart.css({
					width: oSize.width + "px",
					height: oSize.height + "px"
				});
			}
		}
	});

    //初始化日期时间
    var szCurTime = dateFormat(new Date(), "yyyy-MM-dd");
    $("#starttime").val(szCurTime + " 00:00:00");
    $("#endtime").val(szCurTime + " 23:59:59");
});



// 格式化时间
function dateFormat(oDate, fmt) {
	var o = {
		"M+": oDate.getMonth() + 1, //月份
		"d+": oDate.getDate(), //日
		"h+": oDate.getHours(), //小时
		"m+": oDate.getMinutes(), //分
		"s+": oDate.getSeconds(), //秒
		"q+": Math.floor((oDate.getMonth() + 3) / 3), //季度
		"S": oDate.getMilliseconds()//毫秒
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (oDate.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

// 获取窗口尺寸
function getWindowSize() {
	var nWidth = $(this).width() + $(this).scrollLeft(),
		nHeight = $(this).height() + $(this).scrollTop();

	return {width: nWidth, height: nHeight};
}

// 打开选择框 0：文件夹  1：文件
function clickOpenFileDlg(id, iType) {
	var szDirPath = WebVideoCtrl.I_OpenFileDlg(iType);
	
	if (szDirPath != -1 && szDirPath != "" && szDirPath != null) {
		$("#" + id).val(szDirPath);
	}
}

// 获取本地参数
function clickGetLocalCfg() {
	var xmlDoc = WebVideoCtrl.I_GetLocalCfg();

	$("#captureFileFormat").val($(xmlDoc).find("CaptureFileFormat").eq(0).text());
	$("#packSize").val($(xmlDoc).find("PackgeSize").eq(0).text());
	$("#recordPath").val($(xmlDoc).find("RecordPath").eq(0).text());
	$("#downloadPath").val($(xmlDoc).find("DownloadPath").eq(0).text());
	$("#previewPicPath").val($(xmlDoc).find("CapturePath").eq(0).text());
	$("#playbackPicPath").val($(xmlDoc).find("PlaybackPicPath").eq(0).text());
	$("#playbackFilePath").val($(xmlDoc).find("PlaybackFilePath").eq(0).text());

}

// 设置本地参数
function clickSetLocalCfg() {
	var arrXml = [],
		szInfo = "";
	
	arrXml.push("<LocalConfigInfo>");
	arrXml.push("<PackgeSize>" + $("#packSize").val() + "</PackgeSize>");
	arrXml.push("<RecordPath>" + $("#recordPath").val() + "</RecordPath>");
	arrXml.push("<CapturePath>" + $("#previewPicPath").val() + "</CapturePath>");
	arrXml.push("<PlaybackFilePath>" + $("#playbackFilePath").val() + "</PlaybackFilePath>");
	arrXml.push("<PlaybackPicPath>" + $("#playbackPicPath").val() + "</PlaybackPicPath>");
	arrXml.push("<DownloadPath>" + $("#downloadPath").val() + "</DownloadPath>");
	arrXml.push("<CaptureFileFormat>" + $("#captureFileFormat").val() + "</CaptureFileFormat>");
	arrXml.push("</LocalConfigInfo>");

	var iRet = WebVideoCtrl.I_SetLocalCfg(arrXml.join(""));
}

// 窗口分割数
function changeWndNum(iType) {
	iType = parseInt(iType, 10);
	WebVideoCtrl.I_ChangeWndNum(iType);
}

// 登录
/*function clickLogin() {
	var szIP = $("#loginip").val(),
		szPort = $("#port").val(),
		szUsername = $("#username").val(),
		szPassword = $("#password").val();

	if ("" == szIP || "" == szPort) {
		return;
	}

	var iRet = WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
		success: function (xmlDoc) {
			showOPInfo(szIP + " 登录成功！");

			$("#ip").prepend("<option value='" + szIP + "'>" + szIP + "</option>");
			setTimeout(function () {
				$("#ip").val(szIP);
				getChannelInfo();
			}, 10);
		},
		error: function () {
			showOPInfo(szIP + " 登录失败！");
		}
	});

	if (-1 == iRet) {
		showOPInfo(szIP + " 已登录过！");
	}
}*/
function clickLogin( szIP, szPort, szUsername, szPassword ) {
	/*var szIP = $("#loginip").val(),
		szPort = $("#port").val(),
		szUsername = $("#username").val(),
		szPassword = $("#password").val();*/

	if ("" == szIP || "" == szPort) {
		return;
	}

	var iRet = WebVideoCtrl.I_Login(szIP, 1, szPort, szUsername, szPassword, {
		success: function (xmlDoc) {
			console.log("登录成功");
			clickStartRealPlay();
			//$("#ip").prepend("<option value='" + szIP + "'>" + szIP + "</option>");
			/*setTimeout(function () {
				$("#ip").val(szIP);
				getChannelInfo();
			}, 10);*/
		},
		error: function () {
			console.log("登录失败");
		}
	});
}


// 退出
function clickLogout() {
	var //szIP = $("#ip").val(),
		szInfo = "";

	if (szIP == "") {
		return;
	}

	var iRet = WebVideoCtrl.I_Logout(szIP);
	if (0 == iRet) {
		szInfo = "退出成功！";

		$("#ip option[value='" + szIP + "']").remove();
		getChannelInfo();
	} else {
		szInfo = "退出失败！";
	}
}

// 获取设备信息
function clickGetDeviceInfo() {
	//var szIP = $("#ip").val();

	if ("" == szIP) {
		return;
	}

	WebVideoCtrl.I_GetDeviceInfo(szIP, {
		success: function (xmlDoc) {
			var arrStr = [];
			arrStr.push("设备名称：" + $(xmlDoc).find("deviceName").eq(0).text() + "\r\n");
			arrStr.push("设备ID：" + $(xmlDoc).find("deviceID").eq(0).text() + "\r\n");
			arrStr.push("型号：" + $(xmlDoc).find("model").eq(0).text() + "\r\n");
			arrStr.push("设备序列号：" + $(xmlDoc).find("serialNumber").eq(0).text() + "\r\n");
			arrStr.push("MAC地址：" + $(xmlDoc).find("macAddress").eq(0).text() + "\r\n");
			arrStr.push("主控版本：" + $(xmlDoc).find("firmwareVersion").eq(0).text() + " " + $(xmlDoc).find("firmwareReleasedDate").eq(0).text() + "\r\n");
			arrStr.push("编码版本：" + $(xmlDoc).find("encoderVersion").eq(0).text() + " " + $(xmlDoc).find("encoderReleasedDate").eq(0).text() + "\r\n");
			
			alert(arrStr.join(""));
		},
		error: function () {
		}
	});
}

// 获取通道
function getChannelInfo() {
	var //szIP = $("#ip").val(),
		oSel = $("#channels").empty(),
		nAnalogChannel = 0;

	if ("" == szIP) {
		return;
	}

	// 模拟通道
	WebVideoCtrl.I_GetAnalogChannelInfo(szIP, {
		async: false,
		success: function (xmlDoc) {
			var oChannels = $(xmlDoc).find("VideoInputChannel");
			nAnalogChannel = oChannels.length;

			$.each(oChannels, function (i) {
				var id = parseInt($(this).find("id").eq(0).text(), 10),
					name = $(this).find("name").eq(0).text();
				if ("" == name) {
					name = "Camera " + (id < 9 ? "0" + id : id);
				}
				oSel.append("<option value='" + id + "' bZero='false'>" + name + "</option>");
			});
		},
		error: function () {
		}
	});
	// 数字通道
	WebVideoCtrl.I_GetDigitalChannelInfo(szIP, {
		async: false,
		success: function (xmlDoc) {
			var oChannels = $(xmlDoc).find("InputProxyChannelStatus");

			$.each(oChannels, function (i) {
				var id = parseInt($(this).find("id").eq(0).text(), 10),
					name = $(this).find("name").eq(0).text(),
					online = $(this).find("online").eq(0).text();
				if ("false" == online) {// 过滤禁用的数字通道
					return true;
				}
				if ("" == name) {
					name = "IPCamera " + ((id - nAnalogChannel) < 9 ? "0" + (id - nAnalogChannel) : (id - nAnalogChannel));
				}
				oSel.append("<option value='" + id + "' bZero='false'>" + name + "</option>");
			});
		},
		error: function () {
		}
	});
	// 零通道
	WebVideoCtrl.I_GetZeroChannelInfo(szIP, {
		async: false,
		success: function (xmlDoc) {
			var oChannels = $(xmlDoc).find("ZeroVideoChannel");
			
			$.each(oChannels, function (i) {
				var id = parseInt($(this).find("id").eq(0).text(), 10),
					name = $(this).find("name").eq(0).text();
				if ("" == name) {
					name = "Zero Channel " + (id < 9 ? "0" + id : id);
				}
				if ("true" == $(this).find("enabled").eq(0).text()) {// 过滤禁用的零通道
					oSel.append("<option value='" + id + "' bZero='true'>" + name + "</option>");
				}
			});
		},
		error: function () {
		}
	});
}


/*// 开始预览
function clickStartRealPlay() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szIP = $("#ip").val(),
		iStreamType = parseInt("1", 10),
		iChannelID = parseInt($("#channels").val(), 10),
		bZeroChannel = $("#channels option").eq($("#channels").get(0).selectedIndex).attr("bZero") == "true" ? true : false,
		szInfo = "";

	if ("" == szIP) {
		return;
	}

	if (oWndInfo != null) {// 已经在播放了，先停止
		WebVideoCtrl.I_Stop();
	}

	var iRet = WebVideoCtrl.I_StartRealPlay(szIP, {
		iStreamType: iStreamType,
		iChannelID: iChannelID,
		bZeroChannel: bZeroChannel
	});

	if (0 == iRet) {
		console.log("开始预览成功！");
	} else {
		console.log("开始预览失败！");
	}

	showOPInfo(szIP + " " + szInfo);
}*/
function clickStartRealPlay() {
	console.log("szIP"+szIP);
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		//szIP = $("#ip").val(),
		iStreamType = parseInt("1", 10),
		iChannelID = parseInt("1", 10),
		//bZeroChannel = $("#channels option").eq($("#channels").get(0).selectedIndex).attr("bZero") == "true" ? true : false,
		bZeroChannel = false,
		szInfo = "";

	if ("" == szIP) {
		return;
	}

	/*if (oWndInfo != null) {// 已经在播放了，先停止
		WebVideoCtrl.I_Stop();
	}*/

	var iRet = WebVideoCtrl.I_StartRealPlay(szIP, {
		iStreamType: iStreamType,
		iChannelID: iChannelID,
		bZeroChannel: bZeroChannel
	});

	if (0 == iRet) {
		console.log("开始预览成功！");
	} else {
		console.log("开始预览失败！");
	}

}

// 停止预览
function clickStopRealPlay() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_Stop();
		if (0 == iRet) {
			szInfo = "停止预览成功！";
		} else {
			szInfo = "停止预览失败！";
		}
	}
}

// 抓图
function clickCapturePic() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var //szChannelID = $("#channels").val(),
		szChannelID = "IPdome",
			szPicName = oWndInfo.szIP + "_" + szChannelID + "_" + new Date().getTime(),
			iRet = WebVideoCtrl.I_CapturePic(szPicName);
		if (0 == iRet) {
			szInfo = "抓图成功！";
		} else {
			szInfo = "抓图失败！";
		}
	}
}

// 开始录像
function clickStartRecord() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var //szChannelID = $("#channels").val(),
		szChannelID = "IPdome",
			szFileName = oWndInfo.szIP + "_" + szChannelID + "_" + new Date().getTime(),
			iRet = WebVideoCtrl.I_StartRecord(szFileName);
		if (0 == iRet) {
			szInfo = "开始录像成功！";
		} else {
			szInfo = "开始录像失败！";
		}
	}
}

// 停止录像
function clickStopRecord() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_StopRecord();
		if (0 == iRet) {
			szInfo = "停止录像成功！";
		} else {
			szInfo = "停止录像失败！";
		}
	}
}

// 全屏
function clickFullScreen() {
	WebVideoCtrl.I_FullScreen(true);
}

// PTZ控制 9为自动，1,2,3,4,5,6,7,8为方向PTZ
var g_bPTZAuto = false;
function mouseDownPTZControl(iPTZIndex,iPTZSpeed ) {
	
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		//bZeroChannel = $("#channels option").eq($("#channels").get(0).selectedIndex).attr("bZero") == "true" ? true : false,
		bZeroChannel = false,
		//iPTZSpeed = $("#ptzspeed").val(),
		bStop = false;
	if (bZeroChannel) {// 零通道不支持云台
		return;
	}
	if (oWndInfo != null) {
		if (9 == iPTZIndex && g_bPTZAuto) {
			iPTZSpeed = 0;// 自动开启后，速度置为0可以关闭自动
			bStop = true;
		} else {
			g_bPTZAuto = false;// 点击其他方向，自动肯定会被关闭
			bStop = false;
		}

		WebVideoCtrl.I_PTZControl(iPTZIndex, bStop, {
			iPTZSpeed: iPTZSpeed,
			success: function (xmlDoc) {
				if (9 == iPTZIndex) {
					g_bPTZAuto = !g_bPTZAuto;
				}
			},
			error: function () {
			}
		});
	}
}

// 方向PTZ停止
function mouseUpPTZControl() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

	if (oWndInfo != null) {
		WebVideoCtrl.I_PTZControl(1, true, {
			success: function (xmlDoc) {
			},
			error: function () {
			}
		});
	}
}

// 设置预置点
function clickSetPreset(preset) {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		//iPresetID = parseInt($("#preset").val(), 10);
		iPresetID = parseInt(preset, 10);

	if (oWndInfo != null) {
		WebVideoCtrl.I_SetPreset(iPresetID, {
			success: function (xmlDoc) {
			},
			error: function () {
			}
		});
	}
}

// 调用预置点
function clickGoPreset(preset) {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		//iPresetID = parseInt($("#preset").val(), 10);
		iPresetID = parseInt(preset, 10);

	if (oWndInfo != null) {
		WebVideoCtrl.I_GoPreset(iPresetID, {
			success: function (xmlDoc) {
			},
			error: function () {
			}
		});
	}
}

// 搜索录像
var iSearchTimes = 0;
function clickRecordSearch(iType) {
	var //szIP = $("#ip").val(),
		//iChannelID = $("#channels").val(),
		szChannelID = "IPdome",
		//bZeroChannel = $("#channels option").eq($("#channels").get(0).selectedIndex).attr("bZero") == "true" ? true : false,
		bZeroChannel = false,
		szStartTime = $("#starttime").val(),
		szEndTime = $("#endtime").val();

	if ("" == szIP) {
		return;
	}

	if (bZeroChannel) {// 零通道不支持录像搜索
		return;
	}

	if (0 == iType) {// 首次搜索
		$("#searchlist").empty();
		iSearchTimes = 0;
	}

	WebVideoCtrl.I_RecordSearch(szIP, iChannelID, szStartTime, szEndTime, {
		iSearchPos: iSearchTimes * 40,
		success: function (xmlDoc) {
			if("MORE" === $(xmlDoc).find("responseStatusStrg").eq(0).text()) {
				
				for(var i = 0, nLen = $(xmlDoc).find("searchMatchItem").length; i < nLen; i++) {
					var szPlaybackURI = $(xmlDoc).find("playbackURI").eq(i).text();
					if(szPlaybackURI.indexOf("name=") < 0) {
						break;
					}
					var szStartTime = $(xmlDoc).find("startTime").eq(i).text();
					var szEndTime = $(xmlDoc).find("endTime").eq(i).text();
					var szFileName = szPlaybackURI.substring(szPlaybackURI.indexOf("name=") + 5, szPlaybackURI.indexOf("&size="));

					var objTr = $("#searchlist").get(0).insertRow(-1);
					var objTd = objTr.insertCell(0);
					objTd.id = "downloadTd" + i;
					objTd.innerHTML = iSearchTimes * 40 + (i + 1);
					objTd = objTr.insertCell(1);
					objTd.width = "30%";
					objTd.innerHTML = szFileName;
					objTd = objTr.insertCell(2);
					objTd.width = "30%";
					objTd.innerHTML = (szStartTime.replace("T", " ")).replace("Z", "");
					objTd = objTr.insertCell(3);
					objTd.width = "30%";
					objTd.innerHTML = (szEndTime.replace("T", " ")).replace("Z", "");
					objTd = objTr.insertCell(4);
					objTd.width = "10%";
					objTd.innerHTML = "<a href='javascript:;' onclick='clickStartDownloadRecord(" + i + ");'>下载</a>";
					$("#downloadTd" + i).data("playbackURI", szPlaybackURI);
				}

				iSearchTimes++;
				clickRecordSearch(1);// 继续搜索
			} else if ("OK" === $(xmlDoc).find("responseStatusStrg").eq(0).text()) {
				var iLength = $(xmlDoc).find("searchMatchItem").length;
				for(var i = 0; i < iLength; i++) {
					var szPlaybackURI = $(xmlDoc).find("playbackURI").eq(i).text();
					if(szPlaybackURI.indexOf("name=") < 0) {
						break;
					}
					var szStartTime = $(xmlDoc).find("startTime").eq(i).text();
					var szEndTime = $(xmlDoc).find("endTime").eq(i).text();
					var szFileName = szPlaybackURI.substring(szPlaybackURI.indexOf("name=") + 5, szPlaybackURI.indexOf("&size="));

					var objTr = $("#searchlist").get(0).insertRow(-1);
					var objTd = objTr.insertCell(0);
					objTd.id = "downloadTd" + i;
					objTd.innerHTML = iSearchTimes * 40 + (i + 1);
					objTd = objTr.insertCell(1);
					objTd.width = "30%";
					objTd.innerHTML = szFileName;
					objTd = objTr.insertCell(2);
					objTd.width = "30%";
					objTd.innerHTML = (szStartTime.replace("T", " ")).replace("Z", "");
					objTd = objTr.insertCell(3);
					objTd.width = "30%";
					objTd.innerHTML = (szEndTime.replace("T", " ")).replace("Z", "");
					objTd = objTr.insertCell(4);
					objTd.width = "10%";
					objTd.innerHTML = "<a href='javascript:;' onclick='clickStartDownloadRecord(" + i + ");'>下载</a>";
					$("#downloadTd" + i).data("playbackURI", szPlaybackURI);
				}
			} else if("NO MATCHES" === $(xmlDoc).find("responseStatusStrg").eq(0).text()) {
				setTimeout(function() {
				}, 50);
			}
		},
		error: function () {
		}
	});
}

// 开始回放
function clickStartPlayback() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		//szIP = $("#ip").val(),
		//bZeroChannel = $("#channels option").eq($("#channels").get(0).selectedIndex).attr("bZero") == "true" ? true : false,
		bZeroChannel = false,
		//iChannelID = $("#channels").val(),
		szChannelID = "IPdome",
		szStartTime = $("#starttime").val(),
		szEndTime = $("#endtime").val(),
		szInfo = "",
		bChecked = $("#transstream").prop("checked"),
		iRet = -1;

	if ("" == szIP) {
		return;
	}

	if (bZeroChannel) {// 零通道不支持回放
		return;
	}

	if (oWndInfo != null) {// 已经在播放了，先停止
		WebVideoCtrl.I_Stop();
	}

	if (bChecked) {// 启用转码回放
		var oTransCodeParam = {
			TransFrameRate: "16",// 0：全帧率，5：1，6：2，7：4，8：6，9：8，10：10，11：12，12：16，14：15，15：18，13：20，16：22
			TransResolution: "2",// 255：Auto，3：4CIF，2：QCIF，1：CIF
			TransBitrate: "23"// 2：32K，3：48K，4：64K，5：80K，6：96K，7：128K，8：160K，9：192K，10：224K，11：256K，12：320K，13：384K，14：448K，15：512K，16：640K，17：768K，18：896K，19：1024K，20：1280K，21：1536K，22：1792K，23：2048K，24：3072K，25：4096K，26：8192K
		};
		iRet = WebVideoCtrl.I_StartPlayback(szIP, {
			iChannelID: iChannelID,
			szStartTime: szStartTime,
			szEndTime: szEndTime,
			oTransCodeParam: oTransCodeParam
		});
	} else {
		iRet = WebVideoCtrl.I_StartPlayback(szIP, {
			iChannelID: iChannelID,
			szStartTime: szStartTime,
			szEndTime: szEndTime
		});
	}

	if (0 == iRet) {
		szInfo = "开始回放成功！";
	} else {
		szInfo = "开始回放失败！";
	}
}

// 停止回放
function clickStopPlayback() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_Stop();
		if (0 == iRet) {
			szInfo = "停止回放成功！";
		} else {
			szInfo = "停止回放失败！";
		}
	}
}

// 开始倒放
function clickReversePlayback() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		//szIP = $("#ip").val(),
		//bZeroChannel = $("#channels option").eq($("#channels").get(0).selectedIndex).attr("bZero") == "true" ? true : false,
		bZeroChannel = false,
		//iChannelID = $("#channels").val(),
		szChannelID = "IPdome",
		szStartTime = $("#starttime").val(),
		szEndTime = $("#endtime").val(),
		szInfo = "";

	if ("" == szIP) {
		return;
	}

	if (bZeroChannel) {// 零通道不支持回放
		return;
	}

	if (oWndInfo != null) {// 已经在播放了，先停止
		WebVideoCtrl.I_Stop();
	}

	var iRet = WebVideoCtrl.I_ReversePlayback(szIP, {
		iChannelID: iChannelID,
		szStartTime: szStartTime,
		szEndTime: szEndTime
	});

	if (0 == iRet) {
		szInfo = "开始倒放成功！";
	} else {
		szInfo = "开始倒放失败！";
	}
}

// 单帧
function clickFrame() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_Frame();
		if (0 == iRet) {
			szInfo = "单帧播放成功！";
		} else {
			szInfo = "单帧播放失败！";
		}
	}
}

// 暂停
function clickPause() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_Pause();
		if (0 == iRet) {
			szInfo = "暂停成功！";
		} else {
			szInfo = "暂停失败！";
		}
	}
}

// 恢复
function clickResume() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_Resume();
		if (0 == iRet) {
			szInfo = "恢复成功！";
		} else {
			szInfo = "恢复失败！";
		}
	}
}

// 慢放
function clickPlaySlow() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_PlaySlow();
		if (0 == iRet) {
			szInfo = "慢放成功！";
		} else {
			szInfo = "慢放失败！";
		}
	}
}

// 快放
function clickPlayFast() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_PlayFast();
		if (0 == iRet) {
			szInfo = "快放成功！";
		} else {
			szInfo = "快放失败！";
		}
	}
}

// OSD时间
function clickGetOSDTime() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);
	
	if (oWndInfo != null) {
		var szTime = WebVideoCtrl.I_GetOSDTime();
		if (szTime != -1) {
			$("#osdtime").val(szTime);
		} else {
		}
	}
}

// 下载录像
var iDownloadID = -1;
var tDownloadProcess = 0;
function clickStartDownloadRecord(i) {
	var //szIP = $("#ip").val(),
		//szChannelID = $("#channels").val(),
		szChannelID = "IPdome",
		szFileName = szIP + "_" + szChannelID + "_" + new Date().getTime(),
		szPlaybackURI = $("#downloadTd" + i).data("playbackURI");

	if ("" == szIP) {
		return;
	}

	iDownloadID = WebVideoCtrl.I_StartDownloadRecord(szIP, szPlaybackURI, szFileName);

	if (iDownloadID < 0) {
		var iErrorValue = WebVideoCtrl.I_GetLastError();
		if (34 == iErrorValue) {
		} else if (33 == iErrorValue) {
		} else {
		}
	} else {
		$("<div id='downProcess' class='freeze'></div>").appendTo("body");
		tDownloadProcess = setInterval("downProcess(" + i + ")", 1000);
	}
}
// 下载进度
function downProcess() {
	var iStatus = WebVideoCtrl.I_GetDownloadStatus(iDownloadID);
	if (0 == iStatus) {
		$("#downProcess").css({
			width: $("#searchlist").width() + "px",
			height: "100px",
			lineHeight: "100px",
			left: $("#searchlist").offset().left + "px",
			top: $("#searchlist").offset().top + "px"
		});
		var iProcess = WebVideoCtrl.I_GetDownloadProgress(iDownloadID);
		if (iProcess < 0) {
			clearInterval(tDownloadProcess);
			tDownloadProcess = 0;
			m_iDownloadID = -1;
		} else if (iProcess < 100) {
			$("#downProcess").text(iProcess + "%");
		} else {
			$("#downProcess").text("100%");
			setTimeout(function () {
				$("#downProcess").remove();
			}, 1000);

			WebVideoCtrl.I_StopDownloadRecord(iDownloadID);

			clearInterval(tDownloadProcess);
			tDownloadProcess = 0;
			m_iDownloadID = -1;
		}
	} else {
		WebVideoCtrl.I_StopDownloadRecord(iDownloadID);

		clearInterval(tDownloadProcess);
		tDownloadProcess = 0;
		iDownloadID = -1;
	}
}

// 重连
function reconnect(szIP) {
	WebVideoCtrl.I_Reconnect(szIP, {
		success: function (xmlDoc) {
			$("#restartDiv").remove();
		},
		error: function () {
			setTimeout(function () {reconnect(szIP);}, 5000);
		}
	});
}


// 检查插件版本
function clickCheckPluginVersion() {
	var iRet = WebVideoCtrl.I_CheckPluginVersion();
	if (0 == iRet) {
		alert("您的插件版本已经是最新的！");
	} else {
		alert("检测到新的插件版本！");
	}
}

function PTZZoomIn() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(10, false, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
            },
            error: function () {
            }
        });
    }
}

function PTZZoomOut() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(11, false, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
            },
            error: function () {
            }
        });
    }
}

function PTZZoomStop() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(11, true, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
            },
            error: function () {
            }
        });
    }
}

function PTZFocusIn() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(12, false, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
            },
            error: function () {
            }
        });
    }
}

function PTZFocusOut() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(13, false, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
            },
            error: function () {
            }
        });
    }
}

function PTZFocusStop() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(12, true, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
            },
            error: function () {
            }
        });
    }
}

function PTZIrisIn() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(14, false, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
            },
            error: function () {
            }
        });
    }
}

function PTZIrisOut() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(15, false, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
            },
            error: function () {
            }
        });
    }
}

function PTZIrisStop() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(14, true, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
            },
            error: function () {
            }
        });
    }
}

dateFormat = function (oDate, fmt) {
    var o = {
        "M+": oDate.getMonth() + 1, //月份
        "d+": oDate.getDate(), //日
        "h+": oDate.getHours(), //小时
        "m+": oDate.getMinutes(), //分
        "s+": oDate.getSeconds(), //秒
        "q+": Math.floor((oDate.getMonth() + 3) / 3), //季度
        "S": oDate.getMilliseconds()//毫秒
    };
    if(/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (oDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if(new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

// 切换模式
function changeIPMode(iType) {
	var arrPort = [0, 7071, 80];

	$("#serverport").val(arrPort[iType]);
}

