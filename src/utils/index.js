const users = [];
export const capitalize = (text)=>{
    text = text.replace("-", " ");
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export const fetchData = async(url) =>{
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

export const addUser = (user)=>{
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}

export const verifyUser = (userEmail, password)=> {
    const users = JSON.parse(localStorage.getItem("users"));
    let result = null;
    users.forEach((element)=>{
        console.log(element);
        if(element.email === userEmail && element.password === password){
            result = element;
        }
    })
    return result;
}