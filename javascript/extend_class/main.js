class Student{
	constructor(name, rollno, marks){
		console.log("A student",name,"arrived.");
		this.name = name;
		this.rollno = rollno;
		this.marks = marks;
	}
	rollAccordingToName(){
		return this.name.length;
	}
}

class Tenth extends Student{
	constructor(name, rollno, marks,subject){
		super(name, rollno, marks);
		this.subject = subject;
	}
	subjectStudy(){
		if(this.subject == "Maths"){
			console.log(this.name,"- You like Maths.")
		}else{
			console.log(this.name,"- Chill in Life.")
		}
	}
}

var Mohit = new Tenth("Mohit",1,92,"Math");
Mohit.subjectStudy();
