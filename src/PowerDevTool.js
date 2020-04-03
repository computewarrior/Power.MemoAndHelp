// ==UserScript==
// @name         获取开发平台框架地址
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the world!
// @author       You
// @match        http://dev.p3china.com:7608/*
// @grant        none
// ==/UserScript==
// @require      https://code.jquery.com/jquery-3.4.0.min.js
var config = {
    path: {
        field: "path",
        displayHtml: "<b>页面地址 : </b>",
        displayText: "页面地址:",
        type: "string",
        value: ""
    }, keyword: {
        field: "keyword",
        displayHtml: "<b>关键词 : </b>",
        displayText: "关键词:",
        type: "Array",
        value: ""
    }, formid: {
        field: "formid",
        displayHtml: "<b>当前窗体Id : </b>",
        displayText: "当前窗体Id:",
        type: "Array",
        value: ""
    }, openformid: {
        field: "openformid",
        displayHtml: "<b>弹出窗体Id : </b>",
        displayText: "弹出窗体Id:",
        type: "Array",
        value: ""
    }, keyvalue: {
        field: "keyvalue",
        displayHtml: "<b>KeyValue : </b>",
        displayText: "KeyValue : ",
        type: "string",
        value: ""
    }, userCode: {
        field: "userCode",
        displayHtml: "<b>用户帐号 : </b>",
        displayText: "用户帐号:",
        type: "string",
        value: ""
    }, userName: {
        field: "userName",
        displayHtml: "<b>用户名称 : </b>",
        displayText: "用户名称:",
        type: "string",
        value: ""
    }, epsprojectname: {
        field: "epsprojectname",
        displayHtml: "<b>所属层级 : </b>",
        displayText: "所属层级 : ",
        type: "string",
        value: ""
    }
}
var ClickBtn = '<a target="_blank" id="clickBtn" class="fa fa-share-square" style="position:fixed;">程序员战士助手</a>';
(function () {
    'use strict';
    //绘制按钮
    $(".row").after(ClickBtn);
    $("#clickBtn").css({
        "right":"-150px",
        "bottom":"80px",
        "display":"block",
        "padding":"18px 10px",
        "border-radius":"6px",
        "color":"#C1C1C1",
        "box-shadow":"7px 7px 5px #888888",
        "background-color":"#05495A",
        "font-size":"17px",
        "cursor":"pointer",
        "z-index":"99"
    })
    $("#clickBtn").click(function(){
       // Power.ui.success("点击了");
        setTimeout(() => {
            $("#clickBtn").animate({
            right:"-150px"
        })
        }, 5000);
    })
    
    $("#clickBtn").mouseover(function(){
       // Power.ui.success("你到我头上了");
        $("#clickBtn").animate({
            right:"10px"
        })
    })
    $("#clickBtn").mouseleave(function(){
       // Power.ui.success("你到我头上了");
        setTimeout(() => {
        $("#clickBtn").animate({
            right:"-150px"
        })
    }, 8000);
    })
    //在主页就获取所有iframe框架
    var iframes = document.getElementsByTagName("iframe");
    console.log("当前页面地址:" + window.location.href);
    for (var i = 0; i < iframes.length; i++) {
        var url = iframes[i].src;
        console.log(BreakDowmUrl(url), url);
    }
    config.path.value = window.location.href;
    if (formconfig && formconfig.config) {
        config.formid.value = formconfig.FormId;
        config.openformid.value = formconfig.config.openformid;
        config.keyvalue.value = formconfig.KeyValue;
        config.keyword.value = formconfig.config.joindata;
    }
    if (sessiondata) {
        config.userCode.value = sessiondata.UserCode;
        config.userName.value = sessiondata.UserName;
        config.epsprojectname.value = sessiondata.EpsProjName;
    }
    var retText = "";
    var retHtml = "<hr>";
    for (var i in config) {
        if (config[i].value) {
            if (i == "path")
            {

                retText +="链接地址 : "+config[i].value+"\n";
                retHtml +="<b>链接地址 : </b>"+ " <a target='_blank' href='"+config[i].value+"'>"+config[i].value + "</a><br>";
                continue;
                }
            if (i == "keyword") {
                // displayHtml: "<b>关键词:</b>",
                // displayText: "关键词:",
                if (config[i].value.children.length > 0) {
                    retText += config[i].displayText + config[i].value.KeyWord + "\n";
                    retHtml += config[i].displayHtml + config[i].value.KeyWord + "<br>";
                    for (var j = 0; j < config[i].value.children.length; j++) {
                        retText += "子表关键词"+j+":" + config[i].value.children[j].KeyWord + "\n";
                        retHtml += "<b>关键词"+j+":</b>" + config[i].value.children[j].KeyWord + "<br>";
                    }
                    continue;
                }
                else
                    config[i].value=config[i].value.KeyWord
            }
            retText += config[i].displayText + config[i].value + "\n";
            retHtml += config[i].displayHtml + config[i].value + "<br>";
        }
    }
    console.log("debug", retText);
    $("#clickBtn").click(function () {
        document.addEventListener('copy', function (e) {
            e.clipboardData.setData('text/plain', retText);
            e.clipboardData.setData('text/html', retHtml);
            e.preventDefault(); // We want our data, not data from any selection, to be written to the clipboard
        });
        document.execCommand('copy');
        Power.ui.success("复制成功，请粘贴给程序员战士！");
    })
    //获取框架地址。
    //console.log("good");
})();
function BreakDowmUrl(url) {
    var windowReg = /\/Form\/EditForm\//;//窗体页面
    var wizardReg = /\/Form\/Wizard/;//向导窗体
    var formReg = /\/Form\/ValidForm\//;
    if (windowReg.test(url)) {
        return "窗体";
    } else if (wizardReg.test(url)) {
        return "向导";
    }
    else if (formReg.test(url)) {
        return "表单";
    }
}