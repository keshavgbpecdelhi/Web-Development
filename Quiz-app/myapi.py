
from fastapi import FastAPI

app = FastAPI()

Quiz = {
    1: {
        'question' : 'Who is considered the father of modern physics?',
        'option1' : 'Isaac Newton',
        'option2' : 'Albert Einstein',
        'option3' : 'Nikola Tesla',
        'option4' : 'Galileo Galilei',
        'answer' : 'Albert Einstein'
     }
}

@app.get('/')
def index():
    return Quiz