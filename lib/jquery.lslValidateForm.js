/**
 * Created by Administrator on 2017/9/7 0007.
 */
var hOffsetLeft = 10 ; // tip 左偏移量
var vHeight = '30px'; //垂直方式 ls-tip高度

/**
 * 验证非空  true：非空  false：空
 * @param input
 */
function validateNoEmpty(input) {
    var value = $(input).val().trim();
    if(value){
        updateInputStatus(input,true);
        return true;
    }
    else{
        updateInputStatus(input,false);
        return false;
    }
}
/**
 * 验证手机号
 * @param input
 */
function validatePhone(input) {
    var  reg = /^1[0-9]{10}$/;
    var phone = $(input).val().trim();
    if( reg.test(phone)){
        updateInputStatus(input,true);
      return true;
    }
    else{
        updateInputStatus(input,false);
      return false;
    }
}
/**
 * 验证身份证
 * @param input
 */
function validateIdentityID(input) {
    var  reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
    var identityID = $(input).val().trim();
    if( reg.test(identityID)){
        updateInputStatus(input,true);
        return true;
    }
    else{
        updateInputStatus(input,false);
        return false;
    }
}
/**
 * 验证邮箱
 * @param input
 */
function validateEmail(input) {
    var  reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    var email = $(input).val().trim();
    if( reg.test(email)){
        updateInputStatus(input,true);
        return true;
    }
    else{
        updateInputStatus(input,false);
        return false;
    }
}
/**
 * 验证自定义正则表达式
 * @param input
 */
function validateRegexp(input) {
    var value = $(input).val().trim();
    var regexp = $(input).dataset("regexp").trim();
    var reg = eval(regexp);
    if( reg.test(value)){
        updateInputStatus(input,true);
        return true;
    }
    else{
        updateInputStatus(input,false);
        return false;
    }
}

/**
 * 验证固定电话
 * @param input
 */
function validateFixedPhone(input) {
    var  reg = /^0\d{2,4}-?\d{7,8}$/;
    var fixedPhone = $(input).val().trim();
    if( reg.test(fixedPhone)){
        updateInputStatus(input,true);
        return true;
    }
    else{
        updateInputStatus(input,false);
        return false;
    }
}
/**
 * 获取ie11-  data-type
 */
$.fn.dataset = function (key) {
    var ele = $(this)[0];
    if(ele && ele.dataset){
        var ckey = key.split('-');
        var lastValue = ckey[ckey.length-1].toString().replace(/\w/,function ($1) {
            return $1.toUpperCase();
        })
         ckey.length==1?ckey:ckey.splice(ckey.length-1,1,lastValue);
        return ele.dataset[ckey.join('')];
    }
    else{
        for(var i=0;i< ele.attributes.length;i++){
            if(ele.attributes[i].nodeName=="data-"+key){
                return ele.attributes[i].value;
            }
        }
    }
}
/**
 * 更新input tip
 * @param input  当前input元素
 * @param status 当前验证状态
 */
function updateInputStatus(input,status) {
    $(input).parent().find(".ls-tip").remove();
    var template = '';

    var validateType = $(input).parents("form").dataset("validate-type");
    if(validateType == 'ls-h-validateForm'){
        if(status){
            $(input).removeClass("ls-input-correct");
            template = '<div class="ls-tip ls-h-tip"><i class="ls-icon-correct"></i></div>';
        }
        else{
            $(input).addClass("ls-input-error");
            var msg = $(input).data("validateObj").msg;
            template = '<div class="ls-tip ls-h-tip"><i class="ls-icon-error"></i><span class="ls-error-tip">'+msg+'</span></div>';
        }

        var top = $(input).position().top;
        var left = $(input)[0].offsetLeft+$(input).outerWidth()+hOffsetLeft;
        var height = $(input).outerHeight();
        $(input).after(template);
        $(input).parent().find(".ls-tip").css({
            left:left,
            top:top,
            height:height,
        })
    }
    else{
        // 垂直方式中只有错误才显示
        if(status){
            $(input).removeClass("ls-input-correct");
        }
        else{
            $(input).addClass("ls-input-error");
            var msg = $(input).data("validateObj").msg;
            template = '<div class="ls-tip ls-v-tip"><span class="ls-error-tip">'+msg+'</span></div>';
            var left = $(input)[0].offsetLeft;
            var height = $(input).outerHeight();
            var width = $(input).outerWidth();
            $(input).after(template);
            $(input).parent().find(".ls-tip").css({
                'margin-left':left,
                height:vHeight,
                width:width,
                position:'static'
            })
        }
    }
}
//初始化input
function initFormValidate(form) {
    var inputs = $(form).find($("input[data-vtype]"));
    inputs.each(function (index,input) {
        var validateObj = new ValidateObj(input);
        $(input).data("validateObj",validateObj)
        initEvent(input)
    })
}
// input validateObj对象，包含 input、msg、types、updateTip
function ValidateObj(input) {
    this.input = input;
    this.msg = $(input).dataset("vmsg");
    this.types = $(input).dataset("vtype").trim().split(" ");
    $(input)[0].hasAttribute("required")?this.types.unshift('required'):false;  // 必须先验证是否必填，否则updateInputStatus会干扰required与其它验证
    this.updateTip= function (msg) {
        $(input).parent().find(".ls-tip").children().remove();
        var template = '';
        if($(input).parents("form").dataset("validate-type")=='ls-h-validateForm'){
            template = '<i class="ls-icon-error"></i><span class="ls-error-tip">'+msg+'</span>';
            $(input).parent().find(".ls-tip").append(template);
        }
        else{
            template = '<div class="ls-tip ls-v-tip"><span class="ls-error-tip">'+msg+'</span></div>';
            var left = $(input)[0].offsetLeft;
            var width = $(input).outerWidth();
            $(input).parent().find(".ls-tip").remove();
            $(input).after(template);
            $(input).parent().find(".ls-tip").css({
                'margin-left':left,
                height:vHeight,
                width:width,
                position:'static'
            })
        }
    }
}
//初始化input 事件 focus blur
function initEvent(input) {
    var validateObj =  $(input).data("validateObj");
    $(input).on("focus",function () {
        $(this).removeClass("ls-input-error");
        $(this).parent().find(".ls-tip").remove();
    })
    $(input).on("blur",function () {
        var _this = this;
        $(input).parent().css("position","relative"); //必须，tip提示才能准确定位
        if(!validateObj.types || validateObj.types.length<1){
            return ;
        }
        $.each(validateObj.types,function (index,item) {
            validateByType(_this,item);
        })
    })
}
//根据不同type分别验证input
function validateByType(input,type) {
    var status = true;
    var value = $(input).val();
    switch (type){
        case 'required':status = validateNoEmpty(input);break;  //required
        case 'phone':value && (status = validatePhone(input));break;       //phone,只有在不为空的时候才参与验证（保证可为空）
        case 'email':value && (status = validateEmail(input));break;       //email
        case 'identityID':value && (status = validateIdentityID(input));break;       //identityID
        case 'fixedPhone':value && (status = validateFixedPhone(input));break;       //fixedPhone
        case 'regexp':value && (status = validateRegexp(input));break;       //validateRegexp
    }
    return status;
}
$(function () {
    //初始化页面form
    (function() {
        if(($("form").length!=0) ){
            $("form").each(function (index,item) {
                if($(item).dataset("validate-type")) {
                    initFormValidate(item);
                }
                else{
                    console.log("使用浏览器默认验证");
                }
            })
        }
    })();
})
