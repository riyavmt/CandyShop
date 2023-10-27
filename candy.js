const myForm= document.getElementById("myShop");
const list = document.getElementById("candyList");
myForm.addEventListener("submit",addCandy);

function addCandy(e){
    e.preventDefault();
    const candyShop={
        name:e.target.name.value,
        des:e.target.des.value,
        price:e.target.price.value,
        qty:e.target.quantity.value
    };
    axios.post(`https://crudcrud.com/api/006e7efadeef47bc8f58c3292e1e0d7a/candyList`,candyShop)
    .then((res)=>{
        add(res.data)
    })
    .catch((err)=>console.log(err))
}

function add(data){
    const li= document.createElement("li");
    li.id=data._id;
    li.innerHTML= `${data.name}-${data.des}-${data.price}-<span>${data.qty}</span>
      <button class="btn btn-dark btn-outline-light btn-lg" onclick="dec(1,'${li.id}')">Buy 1</button>;
      <button class="btn btn-dark btn-outline-light btn-lg" onclick="dec(2,'${li.id}')">Buy 2</button>;
      <button class="btn btn-dark btn-outline-light btn-lg" onclick="dec(3,'${li.id}')">Buy 3</button>;`;
    list.append(li);
}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get(`https://crudcrud.com/api/006e7efadeef47bc8f58c3292e1e0d7a/candyList`)
    .then((res) => {
        res.data.forEach((element) => add(element))
    })
    .catch(err=> console.log(err));
})

function dec(total,id){
    const li= document.getElementById(id);
    const text = li.innerText;
    const newText= text.split('-');
    //console.log(newText);
    const quantity = li.firstElementChild.innerHTML;
    if(total<=quantity){
        const updateCandy={
            name: newText[0],
            des: newText[1],
            price: newText[2],
            qty: quantity-total 
        };
    
        axios.put(`https://crudcrud.com/api/006e7efadeef47bc8f58c3292e1e0d7a/candyList/${id}`,updateCandy)
        .then((res)=>{
            li.firstElementChild.innerHTML= quantity-total;
        })
    }
    
    else{
        alert("No enough candies Left")
    }
}
    