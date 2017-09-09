/**
 * Created by Administrator on 2017/9/7 0007.
 */
$(function () {
    $("#obtain-dataUrl").on("change",function () {
        var files = $(this)[0].files;
        var fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = function (e) {
            $(".dataUrl").text(e.target.result)
        }
    })
    $("#updateTip").on("click",function () {
        $("#phone").data("validateObj").updateTip('该手机号已注册');
    })
    $("#forceValidate").on("click",function () {
        $(this).parents("form").data("validateObj").validateForm();
    })
})
