function Question(result) {
    for (let i = 0; i < result.length; i++) {
        let category = document.createElement('p');
        category.innerHTML = result[i]['category'];

        let question = document.createElement('h3');
        question.innerHTML = result[i]['question'];

        let option = document.createElement('ol');
        
        let br = document.createElement('br');
        let hr = document.createElement('hr');
        
        document.querySelector('.container').append(category);
        document.querySelector('.container').append(question);

        let arr = [...result[i]['incorrect_answers'], result[i]['correct_answer']];
        arr.sort(() => Math.random() - 0.5);

        // Option
        let ul = document.createElement('ul');
        for (let j = 0; j < arr.length; j++) {
            let option = document.createElement('li');
            option.innerHTML = arr[j];
            option.addEventListener('click', function(){
                if(arr[j] === result[i]['correct_answer']){
                    option.style.color = 'green'
                }else{
                    option.style.color = 'red'
                }
            })
            ul.append(option);
        }

        // refresh the page to get next set of question
        let next = document.querySelector('.next-question')
        next.addEventListener('click', () => {
            location.reload()
        })

        document.querySelector('.container').append(ul);
        document.querySelector('.container').append(hr);
    }
}

fetch('https://opentdb.com/api.php?amount=10')
    .then(res => res.json())
    .then(msg => {
        var result = msg['results']
        if(result !== undefined){
            Question(result)
        }else{
            console.log('Api error')
            let container = document.querySelector('.container')
            let error = document.createElement('h1')
            error.innerHTML = "Api error too many request"
            container.append(error)
        }
        
    })
    .catch(error => console.log(`Error ${error}`));