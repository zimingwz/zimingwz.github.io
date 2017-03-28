$(function () {
    $("#ps1").sortable();
    $("#ps1").disableSelection();
    $(".select>ul>li").controlgroup({
        direction: "vertical"
    });

    $("#dialog-message").dialog({
        autoOpen: false,
        modal: true,
        width: 800,
        buttons: {
            "关闭": function () {
                $(this).dialog("close");
            }
        }
    });

});


var bgcolor = 0;   //0白色  1黑色
var x = '';
var y = '';

$(window).ready(function () {

    $("html,body").css("display","block");




    var tab = false;
    var span = "";
    for (var i = 0; i < 23; i++) {
        span += '<span class="odd"></span><span class="even"></span>';
    }

    var panel = '<span></span><div class="panel"><ul class="font-color"><li>文字</li><li>' + span + '</li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> <li></li> </ul> <ul class="font-bg-color"> <li>背景</li> <li>' + span + '</li><li></li><li></li><li></li> <li></li> <li></li> <li></li> <li></li> <li></li> </ul> <b class="panel-del">删</b><b class="panel-close">关</b> </div>';


    // 命令行内容点击事件
    $("#ps1").on('click', '.text', function (e) {
        e.stopPropagation();
    })

    // $("#ps1").on('mousemove', '.text', function (e) {
    //     // x=e.pageX;
    //     // y=e.pageY;
    //     // tab = true;
    //
    //     // e.stopPropagation();
    // })


    // 命令行鼠标移入事件
    $("#ps1").on('mouseover', '.text', function () {
        $("#ps1>li").css("border", "1px dotted #90bf92")
    })

    //命令行鼠标移出事件
    $("#ps1").on('mouseout', '.text', function () {
        $("#ps1>li").css("border", "1px dotted transparent")
    })

    //命令行鼠标按下
    $("#ps1").on('mousedown', '.text', function (e) {
        tab = false;
        x = e.pageX;
        y = e.pageY;
        $("#ps1>li").css("border", "1px dotted red")
    })

    //命令行鼠标抬起
    $("#ps1").on('mouseup', '.text', function (e) {
        x = Math.abs(e.pageX - x);
        y = Math.abs(e.pageY - y);

        if ((x + y) < 3) {
            $(".panel").prev().remove();
            $(".text").css("box-shadow", "0 0 0 red");
            $(".panel").remove();

            $(this).append(panel);
            $(this).css("box-shadow", "0 0 1px red");
        }


        $("#ps1>li").css("border", "1px dotted transparent")
    })


    $("#ps1").on("mouseover", '.panel', function (e) {
        e.stopPropagation();
    })
    $("#ps1").on("mousedown", '.panel', function (e) {
        e.stopPropagation();
    })
    $("#ps1").on("click", '.panel', function (e) {
        e.stopPropagation();
    })


    //颜色选择
    $("#ps1").on("click", '.font-color>li', function (e) {

        setColor($(this), $(this).index(), "color");
        e.stopPropagation();

    })

    $("#ps1").on("click", '.font-bg-color>li', function (e) {

        setColor($(this), $(this).index(), "background-color");
        e.stopPropagation();

    })


    $("#ps1").on("click", '.panel-close', function (e) {
        $(this).parents(".panel").prev().remove();
        $(this).parents(".panel").remove();
        $(".text").css("box-shadow", "0 0 0 red")
        e.stopPropagation();
    })

    $("#ps1").on("click", '.panel-del', function (e) {
        // $(this).parents(".panel").prev().remove();
        var checkbox = $(this).parents(".text");
        var id = checkbox.attr("id");
        if (id)
            $("#" + id.substring(5)).trigger("click")
        else
            checkbox.remove();
        e.stopPropagation();
    })


    //颜色背景切换单选
    $("#radio-0").click(function () {
        $(".terminal").css({"color": "#000", "background-color": "#FFF"});
        bgcolor = 0;
    })
    $("#radio-1").click(function () {
        $(".terminal").css({"color": "#fff", "background-color": "#000"});
        bgcolor = 1;
    })


    //复选框点击事件
    $(".select input[type=checkbox]").click(function () {

        var id = $(this).attr("id");
        var showid = "show-" + id;
        var name = $(this).attr("name");

        if ($(this).is(":checked")) {

            $("#ps1").append('<li class="text" id=' + showid + ' value="0000">' + name + '</li>');
            // $("#ps1").lastChild.css("box-shadow", "0 0 1px red");

        } else {

            $("#" + showid).remove();
        }
    })


    //自定义内容提交
    $(".input-btn").click(function () {
        var input = $(this).prev().val().trim();
        input = (input == "" ? "&nbsp;" : input);
        $("#ps1").append('<li class="text" value="0000">' + input + '</li>');
        $(this).prev().val("");
    })

    $(".container").click(function () {
        $(".panel").prev().remove();
        $(".text").css("box-shadow", "0 0 0 red")
        $(".panel").remove();
    })


    //生成ps1按钮点击
    $(".build-ps1").click(function () {
        $(".panel").prev().remove();
        $(".panel").remove();
        // showPs1();
        $("#dialog-message").dialog("open");
        $("#dialog-message>p").text(showPs1());
        var ps1 = showPs1();
        $(this).attr("data-clipboard-text", ps1);

        // window.clipboardData.setData("text", "adfsdfsdfsdf");


        var clipboard = new Clipboard(".build-ps1");

    })

})


// 颜色设置函数
function setColor(dom, index, target) {
    var text = dom.parents(".text");

    if (target == "color") {
        switch (index) {
            case 1:
                if (bgcolor == 0) {
                    text.css(target, "#000");
                } else {
                    text.css(target, "#fff");
                }
                setValue(text, target, "00");
                break;
            case 2:
                text.css(target, "#000000");
                setValue(text, target, "30");
                break;
            case 3:
                text.css(target, "#97080e");
                setValue(text, target, "31");
                break;
            case 4:
                text.css(target, "#23a326");
                setValue(text, target, "32");
                break;
            case 5:
                text.css(target, "#9a9728");
                setValue(text, target, "33");
                break;
            case 6:
                text.css(target, "#0021ad");
                setValue(text, target, "34");
                break;
            case 7:
                text.css(target, "#af25ae");
                setValue(text, target, "35");
                break;
            case 8:
                text.css(target, "#19a6b1");
                setValue(text, target, "36");
                break;
            case 9:
                text.css(target, "#bfbfbf");
                setValue(text, target, "37");
                break;
        }

    } else {

        switch (index) {
            case 1:
                if (bgcolor == 0) {
                    text.css(target, "#fff");
                } else {
                    text.css(target, "#000");
                }
                setValue(text, target, "00");
                break;
            case 2:
                text.css(target, "#000000");
                setValue(text, target, "40");
                break;
            case 3:
                text.css(target, "#97080e");
                setValue(text, target, "41");
                break;
            case 4:
                text.css(target, "#23a326");
                setValue(text, target, "42");
                break;
            case 5:
                text.css(target, "#9a9728");
                setValue(text, target, "43");
                break;
            case 6:
                text.css(target, "#0021ad");
                setValue(text, target, "44");
                break;
            case 7:
                text.css(target, "#af25ae");
                setValue(text, target, "45");
                break;
            case 8:
                text.css(target, "#19a6b1");
                setValue(text, target, "46");
                break;
            case 9:
                text.css(target, "#bfbfbf");
                setValue(text, target, "47");
                break;
        }
    }
}


//value记录颜色值
function setValue(dom, target, val) {

    if (target == "color") {
        var str = (dom.attr("value")).substr(2);
        dom.attr("value", val + str);
        // alert(dom.attr("value"));
    } else {
        var str = (dom.attr("value")).substr(0, 2);
        dom.attr("value", str + val);
        // alert(dom.attr("value"));
    }

}

// ps1生成函数
function showPs1() {
    var li = $("#ps1 li");
    var ps1 = '';
    var color = '';
    var color_tmp = '0000';
    var end = false;


    var array = [];
    array["hostname"] = "\\h";
    array["dir"] = "\\W";
    array["fdir"] = "\\w";
    array["username"] = "\\u";
    array["prompt"] = "\\$";
    array["date"] = "\\d";
    array["time24"] = "\\t";
    array["time12"] = "\\T"
    array["time"] = "\\A";
    array["count"] = "\\#";


    for (var i = 0; i < li.length; i++) {
        var tmp = '';
        color = li.eq(i).attr("value");
        if (color != color_tmp && color != "0000") {
            var front = color.substr(0, 2);
            var back = color.substr(2);
            if (front != "00" && back != '00') {
                tmp = "\\e[" + front + ";" + back + "m";
            } else if (front != "00") {
                tmp = "\\e[" + front + "m";
            } else {
                tmp = "\\e[" + back + "m";
            }
            end = true;
            color_tmp = color;
            ps1 += tmp;
            tmp = ''
        }
        else if (color == color_tmp && color != "0000") {
            ps1 = ps1.slice(0, -5);
            end = true;
            color_tmp = color;
            ps1 += tmp;
            tmp = ''
        } else if (color != color_tmp && color == "0000") {
            color_tmp = color;
        }


        var id = li.eq(i).attr("id");
        var text = li.eq(i).text();
        if (id !== undefined) {
            id = id.substr(5);
            tmp += array[id];
        } else {
            tmp += text;
        }

        if (end) {
            tmp += "\\e[0m";
            end = false;
        }

        ps1 += tmp;

    }


    return "export PS1='" + ps1 + " '";


}



