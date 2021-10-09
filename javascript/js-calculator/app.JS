function btnclick(_this, num){
    _this.className = "btn-custom"
    var res = document.getElementById("calc");
    res.value += num;
}
function btnafterclick(_this){
    _this.className = "afterclick"
}
function getResult(_this, val){
    _this.className = "btn-custom"
    var res = document.getElementById("calc");
    res.value = eval(res.value)
    if(val == "%"){
        getResult(_this)
    }
    else if(val=="sin"){
        Math.sin(res.value)
    }
    else if(val=="cos"){
        Math.cos(res.value)
    }
    else if(val=="tan"){
        Math.tan(res.value)
    }
    else if(val=="ln"){
        Math.log(res.value)
    }
    else if(val=="√"){
        Math.sqrt(res.value)
    }
    else if(val=="^"){
        Math.exp(res.value)
    }
    else if(val == "x2"){
        eval(res.value*res.value)
    }
}
function clearValue(_this){
    var res = document.getElementById("calc");
    res.value = "";
    _this.className = "btn-custom"
}
function del(_this) {
    _this.className = "btn-custom"
    var res = document.getElementById("calc");
    res.value = res.value.slice(0,-1)
}

function scientific(_this,val){
    _this.className = "btn-custom"
    var res = document.getElementById("calc");
    
    if(val=="π"){
        res.value = Math.PI    }
    else if(val == "%"){
        getResult(_this)
    }
    else if(val=="sin"){
        res.value = Math.sin(res.value)
    }
    else if(val=="cos"){
        res.value = Math.cos(res.value)
    }
    else if(val=="tan"){
        res.value = Math.tan(res.value)
    }
    else if(val=="ln"){
       res.value = Math.log(res.value)
    }
    else if(val=="√"){
        res.value = Math.sqrt(res.value)
    }
    else if(val=="!"){
        
    }
    else if(val == "x2"){
        res.value = eval(res.value*res.value)
    }
    else if(val == "e"){
        res.value = Math.exp(res.value)
    }
}
function factorial(_this){
    var i
    _this.className = "btn-custom"
    var res = document.getElementById("calc");
    v = res.value
    console.log(res.value)
        for(i=(v-1); i>=1; i--){
            v=v*i
        }
        res.value= v
}

