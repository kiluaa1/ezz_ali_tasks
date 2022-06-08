let fForm = document.querySelector('#addForm')
const userHeads = ["userId", "userName", "age"]
let contentWrap=document.querySelector("#contentWrap")
let divUser=document.querySelector("#userdiv")
const userData = document.querySelector("#userData")
const fakeApi = document.querySelector("#fakeApi")



// function to read from storage :
const readFromStorage = (key, dataType="") =>{
    let data 
    const myData = localStorage.getItem(key)
    if(dataType=="string") return myData
    try{
        data = JSON.parse(myData)
        if(!Array.isArray(data)) throw new Error("is not array")
    }
    catch(e){
        data = []
    }
    return data
}

// function of write to storage :
const writeToStorage = (key,value) =>{
    try{
        localStorage.setItem(key,JSON.stringify(value))
    }
    catch(e){
        localStorage.setItem(key,"[]")
    }   
}

// function to take form and push into local storage
if (fForm){
fForm.addEventListener("submit" , function(e) {
    e.preventDefault()
    const user = {status:"active"}
    userHeads.forEach( i => user[i] = fForm.elements[i].value)
    let allUsers=readFromStorage("users")
    allUsers.push(user)
    writeToStorage("users",allUsers)
    fForm.reset();
    window.location.href='index.html'
})}

// create element
const createMyOwnElement = (parent,ele,text,clas)  =>{
    const myEle=document.createElement(ele)
    if(text) myEle.textContent=text
    if(clas) myEle.classList=clas
    parent.appendChild(myEle)
    return myEle
}


// show all
const showAll = (data)=>{
    contentWrap.innerHTML=""
    if(data.length==0){
        const tr =createMyOwnElement(contentWrap,"tr",null,null)
        const td =createMyOwnElement(contentWrap,"td","no data yet","alert alert-danger")
        td.setAttribute("colspan", "5")
    }
    data.forEach( (user,i) => {
        const tr = createMyOwnElement(contentWrap,"tr",null,null)
        createMyOwnElement(tr,"td",user.userId,null)
        createMyOwnElement(tr,"td",user.userName,null)
        createMyOwnElement(tr,"td",user.status,null)
        createMyOwnElement(tr,"td",user.age,null)
        const td = createMyOwnElement(tr,"td",null,null)
        const showBtn = createMyOwnElement(td, "button", "show","btn btn-primary mx-3")
        const editBtn = createMyOwnElement(td, "button", "Edit","btn btn-warning mx-3")
        const delBtn = createMyOwnElement(td, "button", "Delete","btn btn-danger mx-3")
        const editStatus = createMyOwnElement(td, "button", "edit status","btn btn-dark mx-3")

        editBtn.addEventListener("click",(e)=>editelement(data,user,i))
        delBtn.addEventListener("click", (e)=>{
            data.splice(i,1)
            writeToStorage("users", data)
            showAll(data)
        })
        editStatus.addEventListener("click",(e)=>{
            if (user.status=="active"){
                user.status="inactive"
            }
            else{
                user.status="active"
            }
            writeToStorage("users", data)
            showAll(data)
        })
        showBtn.addEventListener("click", (e)=> showSingle(i))   
    })
}

if(contentWrap){
    let data = readFromStorage("users")
    showAll(data)   
}

// function to edit element
const editelement=(arrayName,data,i)=>{
    localStorage.setItem('index',i)
    location.href="edit.html"
}
if(divUser){
    const myIndex=localStorage.getItem("index")
    const data=readFromStorage("users")
    console.log(data[myIndex])
    const editForm =document.querySelector("#editForm")
    userHeads.forEach(user=> editForm.elements[user].value=data[myIndex][user])
    
    createMyOwnElement(divUser,"h1",data[myIndex].userName)
    editForm.addEventListener("submit",(e)=>{
        e.preventDefault()
        userHeads.forEach(user=> data[myIndex][user]= editForm.elements[user].value)
        writeToStorage("users", data)
        editForm.reset();
        window.location.href='index.html'
        

    })
}

// function to show single element
const showSingle= (i)=>{
    localStorage.setItem("id",i)
    location.href="single.html"
}
if(userData){
    const index = localStorage.getItem("id")
    const allusers = readFromStorage("users")
    try{
        const user = allusers[index]
        createMyOwnElement(userData, "h4", user.userId,null)
        createMyOwnElement(userData, "h4", user.userName,null)
        createMyOwnElement(userData, "h4", user.age,null)    
        createMyOwnElement(userData, "h4", user.status,null)    

    }
    catch(e){
        createMyOwnElement(userData, "div", "no user with this id", "alert alert-danger")
    }
}

// fetch fake api
if (fakeApi){
const apiData=fetch("https://jsonplaceholder.typicode.com/albums")
apiData.then((data)=>{
    jsonData=data.json()
    jsonData.then(res=>{
        writeToStorage("api",res)
    })
})
.catch((error)=>console.log(error))
const data = readFromStorage("api")
data.forEach(ele=>{
    tr=createMyOwnElement(fakeApi,"tr",null,null)
    createMyOwnElement(tr,"td",ele.userId,null)
    createMyOwnElement(tr,"td",ele.id,null)
    createMyOwnElement(tr,"td",ele.title,null)
})
}
