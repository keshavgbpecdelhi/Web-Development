function showheading()
{
    document.getElementById("heading").style.visibility="visible";
}
setTimeout("showheading()",1000);

function showcircle()
{
    document.getElementById("numcontainer").style.visibility="visible";
}
setTimeout("showcircle()",1500);

function showbutton()
{
    document.querySelector(".button-50").style.visibility="visible";
}
setTimeout("showbutton()",2200);



let num_container=document.getElementById("numcontainer");

function randomgen()
{
    // localStorage.clear();
    if("Number" in localStorage)
    {
        document.getElementById("button").innerText="Number generated !!";
        num_container.innerText=localStorage.getItem("Number");
    }
    else
    {
        r1 = 1;
        r2 = 50;
        randy = r1 + (r2 - r1) * Math.random();
        rand = Math.round(randy);
        localStorage.setItem("Number",rand);
        num_container.innerText=rand;
    }
    
}
