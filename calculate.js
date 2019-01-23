var output=document.getElementById("output");
var button=document.getElementById("keyboard");
var clear=document.getElementsByClassName("clear");
//var del=document.getElementsByClassName("backspace");

var cal=function() {
    this.op1=undefined;
    this.op2=undefined;
    this.operator=null;
    this.outcome='0';
    this.dotcount=0;
    this.lastClick='';
}
cal1=new cal();

for(var j=0;j<button.childElementCount;j++)
{
    add_listener(j);
}
function add_listener(j){
    color_change(j);
    pushbutton(j);
    }
function color_change(j){
    mousedown(j);
    mouseup(j);
    mouseleave(j);
}
function mousedown(j){
    button.children[j].addEventListener("mousedown",function(e){
        var e=e||window.event;
        var target=e.target||e.srcElement;
        if(target.currentStyle)
        {
            var style=target.currentStyle;
        }
        else if(window.getComputedStyle(target,null))
        {
            var style=window.getComputedStyle(target,null);
        }
        if(style.backgroundColor=="rgb(211, 211, 211)")
        {
            target.style.backgroundColor="darkgray";
        }
        else if(style.backgroundColor=="rgb(169, 169, 169)")
        {
            target.style.backgroundColor="gray";
        }
    })
}
function mouseup(j){
    button.children[j].addEventListener("mouseup",function(e){
        var e=e||window.event;
        var target=e.target||e.srcElement;
        target.style.backgroundColor='';
    })
}
function mouseleave(j){
    button.children[j].addEventListener("mouseleave",function(e) {
        var target=e.target||e.srcElement;
        var timer=null;
        timer=setTimeout(function(){
            target.style.backgroundColor='';
        },500);
    },false)
}
function pushbutton(j){
    button.children[j].addEventListener('click',function(e){
        var e=e||window.event;
        var target=e.target||e.srcElement;
        if(target.innerHTML==="C")
        {
            cal1.dotcount=0;
            output.innerHTML='0';
            cal1.op1=0;
            target.innerHTML="AC";
            cal1.lastClick="C";
        }
        else if(target.innerHTML==="AC")
        {
            cal1.outcome='0';
            cal1.op2=undefined;
            cal1.op1=undefined;
            cal1.operator=null;
            output.innerHTML='0';
            cal1.lastClick="AC";
        }
        else if(parseInt(target.innerHTML)>=0) {
            if (clear[0].innerHTML === "AC") {
                clear[0].innerHTML = "C";
            }
            if (parseFloat(cal1.lastClick) >= 0||cal1.lastClick=="backspace"||cal1.lastClick==".") {//last one is oprand or backspace so this time must be oprand 1instead of oprand 2
                if (output.innerHTML == "0") {
                    output.innerHTML = target.innerHTML;
                }
                else {
                    output.innerHTML += target.innerHTML;
                }
                cal1.op1 = parseFloat(output.innerHTML);
            }
            else{
                cal1.op2=parseFloat(output.innerHTML);
                output.innerHTML='';
                output.innerHTML+=target.innerHTML;
                cal1.op1=parseFloat(output.innerHTML);
            }
            cal1.lastClick=target.innerHTML;
        }
        else if(target.innerHTML==".")
        {
            var output_arr=output.innerHTML.split('');
            output_arr.forEach(function (value) {
                if(value==='.')
                {cal1.dotcount++;}
            })
            if(cal1.dotcount==0) {
                output.innerHTML+='.';
            }
        cal1.lastClick=target.innerHTML;
        }
        else if (target.innerHTML=='+'||target.innerHTML=="-"||target.innerHTML=="*"||target.innerHTML=="/")
        {
            if(cal1.op1!=undefined&&cal1.op2!=undefined&&cal1.operator==null)
            {
                cal1.op2=cal1.op1;
                cal1.op1=undefined;
                cal1.operator=target.innerHTML;
            }
            else if(cal1.op1!=undefined&&cal1.op2!=undefined&&cal1.operator!=null)
            {
                cal1.outcome=(calculate(cal1.op1,cal1.op2,cal1.operator)).toString();
                cal1.op2=parseFloat(cal1.outcome);
                cal1.op1=undefined;
                cal1.operator=target.innerHTML;
                output.innerHTML=cal1.outcome;
            }
            else if(cal1.op1==undefined&&cal1.op2!=undefined){
                cal1.operator=target.innerHTML;
            }
            else if(cal1.op1!=undefined&&cal1.op2==undefined){
                cal1.op2=cal1.op1;
                cal1.op1=undefined;
                cal1.operator=target.innerHTML;
            }
            else if(cal1.op1==undefined&&cal1.op2==undefined)
            {
                cal1.op2=0;
                cal1.operator=target.innerHTML;
            }
            cal1.lastClick=target.innerHTML;
        }
        else if(target.innerHTML=="=")
        {
            if(cal1.op1==undefined||cal1.op2==undefined)
            {
                if(cal1.op1==undefined&&cal1.op2==undefined)
                {
                    if(cal1.operator=="/") {
                        cal1.op2=NaN;
                        cal1.outcome="NAN";
                        output.innerHTML=cal1.outcome;
                        cal1.operator=null;
                    }
                    else {
                        cal1.outcome='0';
                        cal1.operator=null;
                        output.innerHTML=cal1.outcome;
                    }
                }
                else{
                    cal1.outcome=(cal1.op1||cal1.op2).toString();
                    output.innerHTML=cal1.outcome;
                    cal1.op2=parseFloat(cal1.outcome);
                    cal1.op1=undefined;
                    cal1.operator=null;
                }
            }
            else {
                if(cal1.operator!=null) {
                    cal1.outcome = (calculate(cal1.op1, cal1.op2, cal1.operator)).toString();
                    output.innerHTML=cal1.outcome;
                    cal1.operator=null;
                    cal1.op2=parseFloat(cal1.outcome);
                    cal1.op1=undefined;
                }
                else{
                    cal1.outcome=cal1.op1.toString();
                    cal1.op2=cal1.op1;
                    cal1.op1=undefined;
                    cal1.operator=null;
                    output.innerHTML=cal1.outcome;
                }
            }
            cal1.lastClick="=";
        }
        else if(target.innerHTML=="%"){
            if(cal1.op1==undefined&&cal1.op2==undefined)
            {
                cal1.outcome='0';
                output.innerHTML=cal1.outcome;
            }
            else if(cal1.op1!=undefined&&cal1.op2!=undefined)
            {
                if(cal1.operator!=null)
                {
                    cal1.outcome=(calculate(cal1.op1, cal1.op2, cal1.operator)/100).toString();
                    output.innerHTML=cal1.outcome;
                    cal1.op2=parseFloat(cal1.outcome);
                    cal1.op1=undefined;
                    cal1.operator=null;
                }
                else if (cal1.operator==null)
                {
                    cal1.outcome=(cal1.op1/100).toString();
                    cal1.op2=cal1.op1/100;
                    cal1.op1=undefined;
                    cal1.operator=null;
                    output.innerHTML=cal1.outcome;
                }
            }
            else {
                if(cal1.operator!=null) {
                    cal1.outcome = ((cal1.op1||cal1.op2)/100).toString();
                    output.innerHTML=cal1.outcome;
                    cal1.operator=null;
                    cal1.op2=parseInt(cal1.outcome);
                    cal1.op1=undefined;
                }
                else{
                    cal1.outcome=(parseFloat(output.innerHTML)/100).toString();
                    cal1.op2=parseFloat(output.innerHTML)/100;
                    cal1.op1=undefined;
                    cal1.operator=null;
                    output.innerHTML=cal1.outcome;
                }
            }
            cal1.lastClick='%';
        }
        else if(target.innerHTML=="oops!"){
            output.innerHTML=output.innerHTML.substr(0,output.innerHTML.length-1);
            if(output.innerHTML[output.innerHTML.length-1]=='.') {
                output.innerHTML=output.innerHTML.substr(0,output.innerHTML.length-1);
            }
            else if(output.innerHTML[output.innerHTML.length-1]=="-"){
            output.innerHTML='0';
            }
            if(output.innerHTML=='') {
                output.innerHTML='0';
            }
            cal1.lastClick='backspace';
        }
    })
}
function calculate(op1,op2,operator) {
    if(isNaN(op2)||isNaN(op1))
        return NaN;
    else if(operator=="+") {
        return op2+op1;
    }
    else if(operator=="-") {
        return op2-op1;
    }
    else if(operator=="*") {
        return op2*op1;
    }
    else if(operator="/") {
        if(op1!=0) {
            return op2/op1;
        }
        else {
            return NaN;
        }
    }
}

