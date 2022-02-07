// .classlist.toggle('your class')

let toggle = document.querySelector('.collapsible');

toggle.addEventListener('click', (e)=> {
    e.preventDefault();
    e.stopPropagation()
    toggle.classList.toggle('collapsible--expanded')
})


window.setTimeout(function() {
    document.querySelector('.collapsible__content').style.visibility = 'visible';
}, 500);


const name = document.getElementById('contact_name')
const email = document.getElementById('contact_email')
const message = document.getElementById('contact_message')
const submit = document.getElementById('contact_submit')

submit.addEventListener('click', e=> {
    e.preventDefault();
    if(name.value == '') {
        name.classList.add('error')
        name.insertAdjacentHTML('afterend', '<p>this field is required</p>')
    } if(email.value == '') {
        email.classList.add('error')
        email.insertAdjacentHTML('afterend', '<p>this field is required</p>')
    } else if(!email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        email.classList.add('error')
        email.insertAdjacentHTML('afterend', '<p>this must be an Email</p>')
    }
    let formValue = {
        name: name.value,
        email: email.value,
        message: message.value
    }
    // for(let prop in formValue) {
    //     if(formValue[prop].length == 0) {
    //         console.log('this field is empty', prop)
    //         document.getElementById(`contact_${prop}`).classList.add('error')
    //     }
    // }
    // let fd = new FormData();
    // fd.append(name, formValue.name)
    // fd.append(email, formValue.email)
    // fd.append(message, formValue.message)
    let params = `name=${formValue.name}&email=${formValue.email}&message=${formValue.message}`
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:3000/send', true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {//Call a function when the state changes.
        if(xhr.status == 200) {
            // alert(this.responseText);
            //thank u message
            name.value = '';
            email.value = '';
            message.value = '';
            console.log('done')
        }   
    }
    xhr.send(params);
})

name.addEventListener("keydown", (e)=> {
    if(name.classList.contains('error')){
        name.classList.remove('error');
        name.nextElementSibling.remove();
    }
})
email.addEventListener("keydown", (e)=> {
    if(email.classList.contains('error')){
        email.classList.remove('error')
        email.nextElementSibling.remove();

    }
})