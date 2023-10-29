const myForm= document.getElementById("myShop");
const list = document.getElementById("candyList");
myForm.addEventListener("submit",addCandy);

async function addCandy(e){
    e.preventDefault();
    const candyShop={
        name:e.target.name.value,
        des:e.target.des.value,
        price:e.target.price.value,
        qty:e.target.quantity.value
    };
    try{
        const res = await axios.post(`https://crudcrud.com/api/12e1943393904352b500a37028f549b8/candyList`,candyShop);
        add(res.data);
    }
    catch(err){
        console.log(err);
    }
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

window.addEventListener("DOMContentLoaded",async()=>{
    try{
        const res= await axios.get(`https://crudcrud.com/api/12e1943393904352b500a37028f549b8/candyList`);
        res.data.forEach((element) => add(element));
    }
    catch(err){
        console.log(err);

    } 
})

async function dec(total,id){
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
        try{
            axios.put(`https://crudcrud.com/api/12e1943393904352b500a37028f549b8/candyList/${id}`,updateCandy);
            li.firstElementChild.innerHTML= quantity-total;
        }
        catch(err){
            console.log(err);
        }
    }
    else{
        alert("No enough candies Left")
    }
}
    