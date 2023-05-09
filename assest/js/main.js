

var Course_Name=document.getElementById("courseName");
var Course_Category=document.getElementById("courseCategory");
var Course_Price=document.getElementById("coursePrice");
var Course_Description=document.getElementById("courseDescription");
var Course_Capacity=document.getElementById("courseCapacity");
var addbtn=document.getElementById("click");
var data=document.getElementById("data");
var search=document.getElementById("search");
var Update=document.getElementById("Update");
var currentIndex=0

var isNameValid=0,isGatvalid=0,isPricevalid=0,isDescvalid=0,isCapacityvalid=0

Update.style.display="none";

if(JSON.parse(localStorage.getItem("courses"))==null)
var courses=[];
else
var courses=JSON.parse(localStorage.getItem("courses"));
displayData()

Checkinput()
function Checkinput(){
    if(isNameValid&& isGatvalid && isPricevalid &&isDescvalid  &&isCapacityvalid){
        addbtn.removeAttribute("disabled")
    }
    else    {
    addbtn.setAttribute("disabled","disabled")
    }
}

addbtn.onclick=function(e){
    e.preventDefault();
    addCourse()
    reserTnput()
    displayData()
}


function addCourse(){
    var course= {
        Course_Name: Course_Name.value,
        Course_Category: Course_Category.value,
        Course_Price:Course_Price.value,
        Course_Description:Course_Description.value,
        Course_Capacity: Course_Capacity.value,
    };
    courses.push(course);
    localStorage.setItem("courses",JSON.stringify(courses))
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'course added successfuly',
        showConfirmButton: false,
        timer: 1500
    })
}


function reserTnput(){
    Course_Name.value="";
    Course_Category.value="";
    Course_Price.value="";
    Course_Description.value="";
    Course_Capacity.value="";
}


function displayData(){
    data.innerHTML=``;
    for (var i = 0; i < courses.length; i++) {
        data.innerHTML+=`
        <tr>
            <td>${i+1}</td>
            <td>${courses[i].Course_Name}</td>
            <td>${courses[i].Course_Category}</td>
            <td>${courses[i].Course_Price}</td>
            <td>${courses[i].Course_Description}</td>
            <td>${courses[i].Course_Capacity}</td>
            <td><button class="btn btn-info" onclick="getCourse(${i})">update</button></td>
            <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>
        </tr>
        `
    }
}

document.getElementById("deleteBtn").onclick=function(){
Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
    if (result.isConfirmed) {
        Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
        )
        data.innerHTML="";
        courses=[]
    localStorage.setItem("courses",JSON.stringify(courses))

    }
    })
}

function deleteCourse(index){
Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
    if (result.isConfirmed) {
        Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
        )
        courses.splice(index,1);
        displayData()
    localStorage.setItem("courses",JSON.stringify(courses))

    }
    })
}


search.onkeyup=function(){
    var result=``;
    for(var i=0;i<courses.length;i++){
        if(courses[i].Course_Name.toLowerCase().includes(search.value.toLowerCase())){
            result+=
            `<tr>
                <td>${i+1}</td>
                <td>${courses[i].Course_Name}</td>
                <td>${courses[i].Course_Category}</td>
                <td>${courses[i].Course_Price}</td>
                <td>${courses[i].Course_Description}</td>
                <td>${courses[i].Course_Capacity}</td>
                <td><button class="btn btn-info" onclick="getCourse(${i})">update</button></td>
                <td><button class="btn btn-danger" onclick="deleteCourse(${i})">delete</button></td>
            </tr>`
        }
        data.innerHTML=result
    }
}

function getCourse(index){
var course=courses[index];
currentIndex=index;
Course_Name.value=course.Course_Name;
Course_Price.value=course.Course_Price;
Course_Description.value=course.Course_Description;
Course_Category.value=course.Course_Category;
Course_Capacity.value=course.Course_Capacity;
Update.style.display="inline";
addbtn.style.display="none"
}

Update.onclick=function(e){
    e.preventDefault();
    updatecourse()
    reserTnput()
    displayData()
    Update.style.display="none";
    addbtn.style.display="inline"
}

function updatecourse(){
    var course= {
        Course_Name: Course_Name.value,
        Course_Category: Course_Category.value,
        Course_Price:Course_Price.value,
        Course_Description:Course_Description.value,
        Course_Capacity: Course_Capacity.value,
    };
    courses[currentIndex].Course_Name=course.Course_Name;
    courses[currentIndex].Course_Price=course.Course_Price;
    courses[currentIndex].Course_Description=course.Course_Description;
    courses[currentIndex].Course_Category=course.Course_Category;
    courses[currentIndex].Course_Capacity=course.Course_Capacity;
    localStorage.setItem("courses",JSON.stringify(courses))
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'course updated successfuly',
        showConfirmButton: false,
        timer: 1500
    })
}

//validation


// start with capital letter
// 3-10
// no number
var nameAlert=document.getElementById("nameAlert");
nameAlert.style.display="none"
Course_Name.onkeyup=function(){
    var pattern=/^[A-Z][a-z]{2,10}$/
    if(pattern.test(Course_Name.value)){
        if(Course_Name.classList.contains("is-invalid"))
        Course_Name.classList.replace("is-invalid","is-valid")
        Course_Name.classList.add("is-valid")
        nameAlert.style.display="none"

        isNameValid=1
    }
    else
    {
        if(Course_Name.classList.contains("is-valid"))
        Course_Name.classList.replace("is-valid","is-invalid")
        nameAlert.style.display="block"
        Course_Name.classList.add("is-invalid")
        isNameValid=0
    }
Checkinput()
}



// start with capital letter
// 3-20
// no number
Course_Category.onkeyup=function(){
    var pattern=/^[A-Z][a-z]{2,20}$/
    if(pattern.test(Course_Category.value)){
        if(Course_Category.classList.contains("is-invalid"))
        Course_Category.classList.replace("is-invalid","is-valid")
        Course_Category.classList.add("is-valid")
        isGatvalid=1
    }
    else
    {
        if(Course_Category.classList.contains("is-valid"))
        Course_Category.classList.replace("is-valid","is-invalid")
        Course_Category.classList.add("is-invalid")
        isGatvalid=0
    }
Checkinput()
}


// start with capital letter
// 3-4
// only number
Course_Price.onkeyup=function(){
    var pattern=/^[0-9]{3,4}$/
    if(pattern.test(Course_Price.value)&&Course_Price.value>0  ){
        if(Course_Price.classList.contains("is-invalid"))
        Course_Price.classList.replace("is-invalid","is-valid")
        Course_Price.classList.add("is-valid")
        isPricevalid=1
    }
    else
    {
        if(Course_Price.classList.contains("is-valid"))
        Course_Price.classList.replace("is-valid","is-invalid")
        Course_Price.classList.add("is-invalid")
        isPricevalid=0
    }
Checkinput()
}





// start with capital letter
// 3-120
//  number
Course_Description.onkeyup=function(){
    var pattern=/^[A-Z][A-Za-z0-9\s]{3,120}$/
    if(pattern.test(Course_Description.value)){
        if(Course_Description.classList.contains("is-invalid"))
        Course_Description.classList.replace("is-invalid","is-valid")
        Course_Description.classList.add("is-valid")
        isDescvalid=1
    }
    else
    {
        if(Course_Description.classList.contains("is-valid"))
        Course_Description.classList.replace("is-valid","is-invalid")
        Course_Description.classList.add("is-invalid")
        isDescvalid=0
    }
Checkinput()
}





// start with capital letter
// 3-120
//  number
Course_Capacity.onkeyup=function(){
    var pattern=/^[0-9]{2,3}$/
    if(pattern.test(Course_Capacity.value)){
        if(Course_Capacity.classList.contains("is-invalid"))
        Course_Capacity.classList.replace("is-invalid","is-valid")
        Course_Capacity.classList.add("is-valid")
        isCapacityvalid=1
    }
    else
    {
        if(Course_Capacity.classList.contains("is-valid"))
        Course_Capacity.classList.replace("is-valid","is-invalid")
        Course_Capacity.classList.add("is-invalid")
        isCapacityvalid=0
    }
Checkinput()
}




















































































































































