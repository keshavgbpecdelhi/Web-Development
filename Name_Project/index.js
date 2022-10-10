const prev_name = document.getElementById('mytext')
const button = document.getElementById('btn')
const textName = document.getElementById('textName')

const permanent_Name = 'GAURAV'

textName.addEventListener('keypress',function(e){
    if(e.key === 'Enter') {
        if(textName.value === ''){
            prev_name.innerHTML = permanent_Name
        }else{
            const currentName = textName.value.toUpperCase()
            prev_name.innerHTML = currentName
        }
    }
})

button.addEventListener('click',()=>{
    
    if(textName.value === ''){
        prev_name.innerHTML = permanent_Name
    }else{
        const currentName = textName.value.toUpperCase()
        prev_name.innerHTML = currentName
    }
  
})





