### [项目管理PM参考应用平台](http://58.246.56.2:9503/)

+ ### 开发平台和应用平台
* [河南水投应用平台](http://42.96.187.78)
* [河南水投开发平台](http://42.96.187.78:9901)
* [河南水投PM系统应用平台](http://42.96.187.78:8001)
* [河南水投PM系统开发平台](http://42.96.187.78:9903)
* [新平台帮助文档](http://dev.p3china.com:9000/PowerPlat/Systemhelp.html)
* [协鑫新能源开发平台](http://dev.p3china.com:9000)
* [协鑫新能源应用网站](http://Dev.p3china.com:9536)[测试地址](http://10.10.2.186)
* ### 同步读取后台数据的方法。
```javascript
var QBSId = formconfig.config.joindata.newdefaultdata.QBSId;
                var LongCode = "";
                var jsonData = [];
                var p1 = {};
                p1.KeyWord = "HNST_QTL_QBSProject"; //数据集的名字
                p1.Type = "Business"; //类型 枚举型 ViewEntity 数据集  Business 业务对象
                p1.Where = "Id='" + QBSId + "'"
                jsonData.push(p1); //组装

                getDataJson(jsonData, function (data) {
                    var HNST_QTL_QBSProject = data.data[one.KeyWord];
                    LongCode = HNST_QTL_QBSProject[0].LongCode;
                });
```

* ### 静态页面要用上的JS

```html
<script src="/Scripts/boot.js?v=$AppVersion" type="text/javascript"></script>
    <script src="/Scripts/PlatForm/ComTools.js?v=$AppVersion" type="text/javascript"></script>
    <script src="/Scripts/PlatForm/SingleForm.js?v=$AppVersion" type="text/javascript"></script>
    <script src="/Form/Init/$Model.data.FormId/$Model.data.FormState/$Model.data.KeyValue"></script>
    <script type="text/javascript" hasvelocity="true">
        var OpenFormId = "$Model.data.OpenFormId"
        var FormId = "$Model.data.FormId"
        var FormState = "$Model.data.FormState"
        var KeyValue = "$Model.data.KeyValue"
        var SingleParams = ""
    </script>    
    <script>//页面加载后运行
    var PowerForm = new SingleForm();
        $(function () {
            PowerForm.Init();
        });
        mini.parse();
    </script>
```

* ### 静态表单要用上的JS

```html
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
    <script src="/Scripts/boot.js?v=$AppVersion" type="text/javascript"></script>
    <script src="/Scripts/PlatForm/ComTools.js?v=$AppVersion" type="text/javascript"></script>
    <script src="/Scripts/PlatForm/WebForm.js?v=$AppVersion" type="text/javascript"></script>
    <script src="/Form/Init/$Model.data.FormId/$Model.data.FormState/$Model.data.KeyValue"></script>
    <script language="javascript" src="/Scripts/PlatForm/ControlCenter.js?v=$AppVersion"></script>
    <script language="javascript" src="/Scripts/PlatForm/WorkFlowsEnums.js?v=$AppVersion"></script>
    <script language="javascript" src="/Scripts/PlatForm/WorkFlowsForm.js?v=$AppVersion"></script>
    <script type="text/javascript" hasvelocity="true">
    var KeyValue = "$Model.data.KeyValue"
    var FormId = "$Model.data.FormId"
    var FormState = "$Model.data.FormState"
    </script>
```

* ### 获取sessiondata 
sessiondata里面的字段
```
AssemblyCode:"系统应用库"
AssemblyID:"263224be-6c40-3968-121c-80c9aad5b4ed"
AssemblyName:"系统应用库"
BizAreaCode:
null
BizAreaId:"00000000-0000-0000-0000-00000000000a"
BizAreaName:
null
CssStyle:""
DeptCode:""
DeptId:""
DeptName:""
DeviceInfo:
{DeviceType: "Unknow", DevicePlatform: "WinNT", DeviceAppName: "Chrome61", DeviceAppVersion: "61.0", DeviceIP: "180.173.33.114", …}
EpsIsProject:"0"
EpsProjCode:"A018"
EpsProjId:"48c26058-4914-46aa-8dfb-048e0de8bf08"
EpsProjLongCode:"1.7"
EpsProjName:"怀州水生态"
ExtendParam:
null
HumanCode:"admin"
HumanEmail:""
HumanHeadBig:""
HumanHeadSmall:""
HumanId:"ad000000-0000-0000-0000-000000000000"
HumanMobile:
null
HumanName:"系统管理员"
IsAdmin:
true
IsITAdmin:
true
IsLockScreen:
false
Language:"zh-CN"
LoginCheckType:"Power"
LoginDateTime:"2017-10-24T16:10:58.862"
MajorCode:""
MajorId:""
MajorName:""
OwnProjId:""
PosiCode:""
PosiId:""
PosiName:""
SessionId:"ba7eea3c-c08c-4e30-9141-d67474611355"
SubSystemId:""
TokenId:""
UserCode:"admin"
UserId:"ad000000-0000-0000-0000-000000000000"
UserName:"系统管理员"
UsingAssemblys:"2840adf7-573d-a391-eac1-f9bf1ca6d6cd,263224be-6c40-3968-121c-80c9aad5b4ed"
UsingEpsProjId:""
UsingEpsProjName:""

```
* ### 数组转化为树表
mini.arrayToTree(result, grid.nodesField, grid.idField, grid.parentField);

/*为了速度，不采用行列转置
        PowerForm.EventBeforeRenderData=function(e,data)
        {
            //表格数据填充之前，行转列（将矩阵中的行数据转换成列数据显示，类别、年份、金额）
            if(e.sender.id=="HNSTC_Cost_Class")
            {
                 var NewList=[];
                 var item=null;
                 //循环数据，将同一类别的多行数据，拼成一行多列
                 for(var i=0;i<data.length;i++)
                 {
                      if(item==null || item.ItemId!=data[i].ItemId)
                      {
                          if(item!=null)
                          {
                              NewList.push(item);
                          }

                          item={};
                          item.ItemId=data[i].ItemId;
                          item.PurchaseRate=data[i].PurchaseRate;
                          item.Name=data[i].Name;
                          if(data[i].Year!=0)
                          {
                              eval("item.Year_"+data[i].Year+"=data[i].Money;");
                          }
                      }
                      else
                      {
                              eval("item.Year_"+data[i].Year+"=data[i].Money;");
                      }
                 }
                 NewList.push(item);
                 return NewList;
            }
            else
            {
            return data;
            }
        }

        PowerForm.EventBeforeSaveData=function(data,e)
        {
            //主表单不存
            data.HNSTC_Proj_ProjectInfo.data=[];

            //保存前，列转行（将一个类别的多列数据（多年）转换成矩阵行数据，类别+年份+金额），对应EventBeforeRenderData中的行转列
            if(data.HNSTC_Cost_Class)
            {
                var NewList=[];
                var HNSTC_Cost_Class=data.HNSTC_Cost_Class.data;
                for(var i=0;i<HNSTC_Cost_Class.length;i++)
                {
                    //每行数据建设期1、2、3年的金额 转换成 年份+金额 矩阵
                    for(j=0;j<ConstructionYears;j++)
                    {
                        var item={};
                        if(j==0)
                        {
                            //Id用原值的Id
                            item["Id"]=HNSTC_Cost_Class[i].Id;
                            item["_state"]="modified";
                        }
                        else
                        {
                            //Id重新生成
                            item["Id"]=CreateGUID();
                            item["_state"]="added";
                        }
                        item["ItemId"]=HNSTC_Cost_Class[i].ItemId;
                        item["MainId"]=HNSTC_Cost_Class[i].MainId;
                        item["ProjectId"]=HNSTC_Cost_Class[i].ProjectId;
                        item["TempId"]=HNSTC_Cost_Class[i].TempId;
                        item["Name"]=HNSTC_Cost_Class[i].Name;
                        item["Sequ"]=HNSTC_Cost_Class[i].Sequ;
                        item["PurchaseRate"]=HNSTC_Cost_Class[i].PurchaseRate;
                        item["Year"]=j+1;
                        if(HNSTC_Cost_Class[i]["Year_"+(j+1)])
                        {
                            item["Money"]=HNSTC_Cost_Class[i]["Year_"+(j+1)];
                        }
                        else
                        {
                            item["Money"]=0;
                        }

                        NewList.push(item);
                    }
                }
                data.HNSTC_Cost_Class.data=NewList;
            }

        }
        */

* ### 表格treeselect 编辑

```
{
    "GCL_EstimateTplDetails.BoundaryConditions": {
        "ComponentID": "9b552609-99be-2bc6-49f2-61d90ea7aa76",
        "ComponentName": "",
        "ComponentType": "wizard",
        "multi": "0",
        "fields": {
            "BoundaryConditions": "Id",
            "BoundaryConditionsName": "Field"
        }

    }   
}
<div name="BoundaryConditionsName" class="design mini-datagridcolumn" field="BoundaryConditionsName" width="120" headeralign="center" type="textboxcolumn" id="GCL_EstimateTplDetails.BoundaryConditions">
边界条件 <input name="BoundaryConditionsName" class="mini-buttonedit" id="GCL_EstimateTplDetails.BoundaryConditions" style="width: 100%;" property="editor" onbuttonclick="PowerForm.OnBtnWizard(this)" allowInput="false" >
</div>
```
* ### 常用PowerForm事件

```javascript

PowerForm.EventBeforeLoadData=function(e){ 
           // if(e.params.swhere=="")
}

PowerForm.EventAfterLoadData = function (e) {return e.data}    
 PowerForm.EventWizardAfterUpdateRow = function (e, row) {}
PowerForm.EventWizardWhere = function (e) {
            e.canOpen = true;
            e.where ="";
}

### 初始化下拉框数据
 comboboxdata["GCLLT_Plan_WorkReportDetails_NextMonth.ProjectId"].Data = projectList;
                    FormFuns.InitComboboxData();

```

###  弹出窗体

 mini.open({
                url: bootPATH + "../demo/CommonLibs/SelectGridWindow.html",
                title: "选择列表",
                width: 650,
                height: 380,
                ondestroy: function (action) {
                    //if (action == "close") return false;
                    if (action == "ok") {
                        var iframe = this.getIFrameEl();
                        var data = iframe.contentWindow.GetData();
                        data = mini.clone(data);    //必须
                        if (data) {
                            btnEdit.setValue(data.id);
                            btnEdit.setText(data.name);
                        }
                    }

                }
            });

```html

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Pager 分页控件</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" /><link href="../demo.css" rel="stylesheet" type="text/css" />
        
    <script src="../../scripts/boot.js" type="text/javascript"></script>
       
</head>
<body>
    <h1>Pager 分页控件</h1>      
    

<div class="mini-pager" style="width:700px;background:#f0f3f7;border:solid 1px #ccc;    " 
    totalCount="123" onpagechanged="onPageChanged" sizeList="[5,10,20,100]"
    showPageSize="true" showPageIndex="true" showPageInfo="true" 
    buttons="#buttons"
    >        
    
</div>    
<div id="buttons">
    <span class="separator"></span>
    <a class="mini-button" iconCls="icon-add" plain="true" id="add"></a>
    <a class="mini-button" iconCls="icon-edit" plain="true"></a>
    <a class="mini-button" iconCls="icon-remove" plain="true"></a>
</div>

<script type="text/javascript">
    function onPageChanged(e) {
        alert(e.pageIndex + ":" + e.pageSize);
    }
    
</script>

    <div class="description">
        <h3>Description</h3>
        <p>
        </p>
    </div>

```
### 我写的神奇的行转列代码

```javascript
 function testSort(){
            var data = [{
                    "Id": "1",
                    "Name": "上班",
                    "Day": "Mon",
                    "Time": "70"
                },
                {
                    "Id": "2",
                    "Name": "上班",
                    "Day": "Tues",
                    "Time": "77"
                },
                {
                    "Id": "3",
                    "Name": "下班",
                    "Day": "Tues",
                    "Time": "66"
                },
                {
                    "Id": "4",
                    "Name": "下班",
                    "Day": "Mon",
                    "Time": "71"
                },
                {
                    "Id": "5",
                    "Name": "晚餐",
                    "Day": "Mon",
                    "Time": "10"
                }
            ];var newData = [];
            var obj = data[0];
            var rid={};//暂存真实id
            for (var i = 0; i < data.length - 1; i++) {
                obj[data[i].Day] = data[i].Time; //将每项的属性和值合并成新对象。
                rid[data[i].Day] = data[i].Id;
                if (data[i].Name != data[i + 1].Name) //相同栏放在一起
                {
                    newData.push(obj);
                    newData.RealId=rid;
                    var obj = data[i + 1]; //初始化obj
                    rid={};
                }
                if (i == (data.length - 2)) //最后一个push上去
                {
                    obj[data[i + 1].Day] = data[i + 1].Time;
                    newData.push(obj);
                    newData.RealId=rid;
                }
            }
            console.log(newData);
       }
```       
</body>
</html>


### 递归树表向上汇总。

```javascript

 function UpdateParent(grid, record, field) {
            var parentNode = grid.getParentNode(record);
            if (!parentNode || parentNode == grid.getRootNode())
                return;
            var childNodes = grid.getChildNodes(parentNode);
            var sum = 0;
            var total = 0;
            for (var i = 0; i < childNodes.length; i++) {
                sum += (childNodes[i][field] == null || childNodes[i][field] == "") ? 0 : parseFloat(childNodes[i][
                    field
                ]);
                total += (childNodes[i].total == null || childNodes[i].total == "") ? 0 : parseFloat(childNodes[i].total);
            }
            var upd = {};
            upd[field] = sum;
            upd.total = total;
            grid.updateRow(parentNode, upd);
            UpdateParent(grid, parentNode, field);
        }
        
```

### 向导事件

``` 

向导拿到数据后
 PowerForm.EventWizardData = function(e, data) {
        }
向导结束后
PowerForm.EventWizardAfterUpdateRow=function(e,row)
 {
        }

```

### 分页后台代码

```csharp
public string GetUsers(string EpsProjId, string Filter = "", int Index = 0, int Count = 0, int Pass = 0)
        {
            //反编译的代码。源代码忘提交不小心被删了
            bool flag = Index < 0 || Count < 0;
            if (flag)
            {
                throw new Exception("参数错误！");
            }
            int rowIndex = Index * Count;
            ViewResultModel result = ViewResultModel.Create(false, "获取用户信息");
            Business.SearchFlag searchFlag = ( Pass > 0 ) ? Business.SearchFlag.IgnoreRight : Business.SearchFlag.Default;
            ProjectBO project = ProjectBO.FindByKey(EpsProjId, searchFlag);
            bool flag2 = project == null;
            if (flag2)
            {
                throw new Exception("EPSId不存在");
            }
            string LongCode = project.LongCode;
            string swhere = string.Concat(new string[]
            {
        "EpsProjId in (Select project_guid from PLN_project where  LongCode='",
        LongCode,
        "' or  LongCode like '",
        LongCode,
        ".%') and ITAdminFlag='N'"
            });
            bool flag3 = !string.IsNullOrEmpty(Filter);
            if (flag3)
            {
                swhere += string.Format(" and (Code like '{0}%' or Name like '%{0}%' or HumanName like '%{0}%' or OwnProjName like '%{0}%')", Filter);
                Count =  Index = 0  ;
            }
            Business.IBusinessOperate operate = Business.BusinessFactory.CreateBusinessOperate("User");
            int count = operate.FindCount(swhere, "", "", 0, 0, searchFlag);
            Business.IBusinessList list = operate.FindAll(swhere, "", "", rowIndex, Count, searchFlag);
            result.detail=("结果有" + list.Count + "条");
            result.data.Add("total", count);
            result.list=list;
            result.success=true;
            return result.ToJson();
        }
```

### 标准版SVN地址
[标准版源码](http://192.168.0.2/svn/PowerPMS)

### 获取config配置
System.Configuration.ConfigurationManager.AppSettings

### 流程加载后事件

```javascript
 //权限加载后事件
        PowerForm.EventAfterLoadRight = function (o) {           
            var markCode = "";
            if (workflowdata && workflowdata.BookMarkCode)
                markCode = workflowdata.BookMarkCode + ",";
            if (o.id == "GCLLT_Tech_Project" && workflowdata && markCode.indexOf("CanEditForm,") > -1 &&
                workflowdata.CanFlowOperate && workflowdata.CanFlowOperate.CanFlowOperate &&
                (workflowdata.CanFlowOperate.CanFlowOperate & ECanFlowOperate["GetBack"]) == 0) {
                apprFee.setReadOnly(false);
                mini.get("GCLLT_Tech_Project.Save").setEnabled(true);
            }  if (o.id == "GCLLT_Tech_Project" && workflowdata && markCode.indexOf("LeaderAppr") > -1 &&
                workflowdata.CanFlowOperate && workflowdata.CanFlowOperate.CanFlowOperate &&
                (workflowdata.CanFlowOperate.CanFlowOperate & ECanFlowOperate["GetBack"]) == 0) {
                var controls = ["GCLLT_Tech_Project.IsLeaderAppr", "GCLLT_Tech_Project.IsCEOAppr",
                    "GCLLT_Tech_Project.IsChairManAppr"
                ];
                for (var i = 0; i < controls.length; i++) {
                    var c=mini.get(controls[i]);
                    c.setVisible(true);
                    c.setEnabled(true);
                    c.setRequired(true);
                    c.setReadOnly(false);
                }
                $(".LeaderAppr").show();
                mini.get("GCLLT_Tech_Project.Save").setEnabled(true);
            }
        }
```


```
string ftpIp = PowerGlobal.GetConfigRunTimeValue("FtpConfig", "Ip");
string ftpPort = PowerGlobal.GetConfigRunTimeValue("FtpConfig", "Port");
string ftpUserId = PowerGlobal.GetConfigRunTimeValue("FtpConfig", "UserId");
string ftpUserPwd = PowerGlobal.GetConfigRunTimeValue("FtpConfig", "UserPwd");

```

```javascript
 FormFuns.APIExec("PS_ProjInfo", "BO", "YearSummaryRpt", par, function (text) {
                var tmp = mini.decode(text);
                if (tmp.success)
                    {
                       var result=mini.decode(tmp.data.value) ;
                       console.log(result);
                       if(result.data.Project)
                       {
                           var ProjCount=result.data.Project[0].AddProj+result.data.Project[0].NewProj+result.data.Project[0].OutPlan;
                        $("#AddProj").html(result.data.Project[0].AddProj);
                        $("#NewProj").html(result.data.Project[0].NewProj);
                        $("#OutPlan").html(result.data.Project[0].OutPlan);
                        $("#PlanProjCount").html(ProjCount);
                       }
                       if(result.data.Invest)
                       {
                        $("#NewPlannedInvest").html(result.data.Invest[0].NewPlannedInvest);
                        $("#PlanTotalInvest").html(result.data.Invest[0].PlanTotalInvest);
                        $("#RenewalPlanInvest").html(result.data.Invest[0].RenewalPlanInvest);
                        $("#OutPlanInvest").html(result.data.Invest[0].OutPlanInvest);
                       }
                    }});
```

```

查询条
 <a class="mini-button blue" id="GCLLT_Proj_projectCostRpt.SearchBar" onclick="PowerForm.OnBtnSearchBar(this)" style="display:none;">
                                <i class="fa fa-search"></i>查询条</a>
```

  function OnWizardCBS(e) {
            var buttonid = e.id;
            var url = "/Form/Wizard?wizardid=957ad71c-0b1d-4130-923d-3089efafebf1&formid=&btnid=";
            mini.open({
                url: url, title: "选择费用类型",
                width: "80%",
                height: "80%",
                showMaxButton: true,
                onload: function () {
                    var cwin = this.getIFrameEl().contentWindow;
                    if (cwin.Select) {
                        if (cwin.WizardParams) cwin.WizardParams.multi = 0;
                        if (cwin.Select.LoadStepFirst) cwin.Select.LoadStepFirst();
                    }
                },
                 ondestroy: function (action) {
                            if (action != "ok")
                                return;
                            var iframe = this.getIFrameEl();
                            var data = null;
                            if (iframe.contentWindow.Select)
                                data = iframe.contentWindow.Select.GetData();
                            else {
                                if (iframe.contentWindow.GetData)
                                    data = iframe.contentWindow.GetData();
                            }
                            if (!data) {
                                Power.ui.warning("未选择数据");//未选择数据
                                return;
                            }
                            data = mini.clone(data);

                            if (e.Next == false)
                                return;
                            var fields = formconfig[buttonid].fields;
                            var grid = mini.get("PS_PurchaseOrder_Dtl");
                            for (var i = 0; i < data.length; i++) {
                                var selectrow = data[i];
                                var row = PowerForm.OnBtnAdd(grid);
                                if (row == false)
                                    return;
                                selectrow["CostTypeId"] = CostTypeId;
                                fields["CostTypeId"] = "CostTypeId";
                                var Cbs_Guid = selectrow.Cbs_Guid;
                                FormFuns.CopyFieldValue(row, selectrow, fields);
                                grid.updateRow(row);
                            }
                        }
//后台调用分摊方法。
 Dictionary<string, string> messageInputDto = new Dictionary<string, string>();
                messageInputDto.Add("KeyValue", this.Id.ToString());
                messageInputDto.Add("Code", "PS_ControlBudget_CBS");
                messageInputDto.Add("flag", "1");
                //此处可撰写保存后代码 
                var message = new Power.Message.MessageArg<Dictionary<string, string>, string>(null, Power.Message.MessageTypes.Other, "Power.Controls.StdCost.StdCostControl.DirectlyShareForPIP", messageInputDto);
                Power.Message.LocalMessageRouter.Instance.SendMessage(message);
                if (message.MessageExecute.ResponseCount > 0)
                {
                    string result = message.DataResultObject;
                }
                else
                {
                    throw new Exception("对不起， 消息未得到响应,不存在Power.Controls.StdCost.StdCostControl.DirectlyShareForPIP方法，需要引用费用模块");
                }

## 新增时增加默认值。
 PowerForm.EventBeforeAddFormSetDefaultData = function (e, data) {
            if (e.id == "RGY_MenuDict.AddForm" && e.selectedRow) {
                data.Type = e.selectedRow.Code;
                data.MemuId = e.selectedRow.MenuId;
            }
        }

### 升版一个业务对象

```csharp
  public string UpgrateBo(Guid keyvalue)
        {
            var result = Power.Global.ViewResultModel.Create(false, "升版业务对象");
            var supplierOpt = Business.BusinessFactory.CreateBusinessOperate("RGY_Pur_Supplier");
            try
            {
                using (var trans = new XCode.EntityTransaction(supplierOpt.GetEntityOperate()))
                {
                    NewLife.Log.XTrace.WriteLine("进行供应商升版");
                    var supplierBo = supplierOpt.FindByKey(keyvalue);
                    if (supplierBo == null)
                        throw new Exception("供应商不存在");
                    else if (Convert.ToInt32(supplierBo["IsLatestVersion"]) != 1)
                        throw new Exception("不是最新版不能升版" + supplierBo["Version"]);
                    var updatingBoList = supplierOpt.FindAll("ParentId", keyvalue);
                    if (updatingBoList != null && updatingBoList.Count > 0)
                        throw new Exception("已有升版单据，请先处理结束再升版");
                    var id = Guid.NewGuid();
                    //要复制的单据    
                    //RGY_Pur_SupplierEvaluationDtl 供应商评价
                    //RGY_Pur_SupplierBankDtl 银行账户
                    //RGY_Pur_SupplierQualifyDtl 资质明细
                    //DocFile 文档
                    var evalDtlOpt = Business.BusinessFactory.CreateBusinessOperate("RGY_Pur_SupplierEvaluationDtl");
                    var bankDtlOpt = Business.BusinessFactory.CreateBusinessOperate("RGY_Pur_SupplierBankDtl");
                    var quaDtlOpt = Business.BusinessFactory.CreateBusinessOperate("RGY_Pur_SupplierQualifyDtl");
                    var docOpt = Business.BusinessFactory.CreateBusinessOperate("DocFile");
                    var evalDtlList = evalDtlOpt.FindAll("MasterId", keyvalue, Business.SearchFlag.IgnoreRight);
                    var bankDtlList = bankDtlOpt.FindAll("MasterId", keyvalue, Business.SearchFlag.IgnoreRight);
                    var quaDtlList = quaDtlOpt.FindAll("MasterId", keyvalue, Business.SearchFlag.IgnoreRight);
                    var docList = docOpt.FindAll("FolderId", keyvalue, Business.SearchFlag.IgnoreRight);
                    var saveDocList = docOpt.FindAll("1=0", "", "");
                    //开始复制子表业务对象数据
                    foreach (var bo in docList)
                    {
                        var newdoc = Power.Business.BusinessFactory.CreateBusiness("DocFile");
                        newdoc.SetItem("Id", Guid.NewGuid());
                        newdoc.SetItem("BOKeyWord", bo["BOKeyWord"]);
                        newdoc.SetItem("Name", bo["Name"]);
                        newdoc.SetItem("Code", bo["Code"]);
                        newdoc.SetItem("Type", bo["Type"]);
                        newdoc.SetItem("FileExt", bo["FileExt"]);
                        newdoc.SetItem("FileSize", bo["FileSize"]);
                        newdoc.SetItem("FolderId", id);
                        newdoc.SetItem("ServerUrl", bo["ServerUrl"]);
                        newdoc.SetItem("Memo", bo["Memo"]);
                        newdoc.SetItem("UpdDate", DateTime.Now);
                        saveDocList.Add(newdoc);
                    }
                    if (saveDocList.Count > 0)
                        saveDocList.Insert(true);
                    foreach (var qua in quaDtlList)
                    {
                        qua.SetItem("Id", Guid.NewGuid());
                        qua.SetItem("MasterId", id);
                    }
                    if (quaDtlList.Count > 0)
                        quaDtlList.Save(true);
                    foreach (var bank in bankDtlList)
                    {
                        bank.SetItem("Id", Guid.NewGuid());
                        bank.SetItem("MasterId", id);
                    }
                    if (bankDtlList.Count > 0)
                        bankDtlList.Save(true);
                    foreach (var bo in evalDtlList)
                    {
                        bo.SetItem("Id", Guid.NewGuid());
                        bo.SetItem("MasterId", id);
                    }
                    if (evalDtlList.Count > 0)
                        evalDtlList.Save(true);
                    supplierBo.SetItem("Id", id);
                    supplierBo.SetItem("ParentId", keyvalue);
                    var newVersion = Convert.ToDouble(supplierBo["Version"]) + 1;
                    supplierBo.SetItem("Version", newVersion.ToString("f1"));
                    supplierBo.SetItem("IsLatestVersion", "0");
                    supplierBo.SetItem("Status", 0);
                    Power.IBaseCore.ISession session = null;
                    if (Meta.SessionUtil != null)
                    {
                        session = Meta.SessionUtil.getSession();
                        supplierBo.SetItem("RegHumName", session.HumanName);
                        supplierBo.SetItem("RegHumId", session.HumanId);
                    }
                    supplierBo.Save(System.ComponentModel.DataObjectMethodType.Insert);
                    trans.Commit();
                    result.success = true;
                    result.message = "成功";
                    result.detail = id.ToString();
                }
            }
            catch (Exception ex)
            {
                result.message = ex.Message;
                result.success = false;
            }
            return result.ToJson();
        }
```