function taskTemplate(options){
    let template = `
        <div class = 'fromLS' data-boxid = ${options.id}>
            <input class = 'allinputs' value='Name ${JSON.stringify(options.name)}' readonly>
            <input class = 'allinputs' value='position ${JSON.stringify(options.position)}' readonly>
            <input class = 'allinputs' value=' mail ${JSON.stringify(options.mail)}' readonly>
            <input class = 'allinputs'value='department ${JSON.stringify(options.department)}'readonly>
            <input class = 'allinputsid'  value='id  ${JSON.stringify(options.id)}' readonly>
            <button class = 'del'>DELETE</button>
        </div>
    `
    return template;
}


if (localStorage.getItem('tasks')){

    let clearAll = document.querySelector('.clearAll')
    clearAll.style.display = 'inline-block'

    let data = JSON.parse(localStorage.getItem('tasks'))
    let values = Object.values(data)
    // console.log(values)
    
    function priority(){
        return `
                <label><input type="radio" value="1" name="my-radio">Managers</label>
                <label><input type="radio" value="2" name="my-radio">Assistants</label>
                <label><input type="radio" value="3" name="my-radio">All users</label>
        `
    }


    function container(){
        return `
        <div class = 'containerBox'></div>
        `
    }

    let btnAdd = document.querySelector('.btn')
    btnAdd.insertAdjacentHTML('afterend', container())


    let addBtn = document.querySelector('.btn')
    addBtn.insertAdjacentHTML('afterend', priority())


    const dataArr = Object.entries(values)

    for (let item of values){

        let options = {
            name: item.name,
            position: item.position,
            mail: item.mail,
            department: item.department,
            id: item.id
        }
        let template = taskTemplate(options);
        document.querySelector('.containerBox').insertAdjacentHTML('beforeend', template)

        // console.log(options)
    }

} 


function removeLS(){

    let noTasks = document.createElement('div')
    noTasks.style.fontSize = '30px'
    noTasks.style.fontWeight = 'bold'

    let btnAdd = document.querySelector('.out')
    btnAdd.insertAdjacentElement('afterend', noTasks)

    localStorage.removeItem('tasks')

    // Удаляем все Радио Интпуты
    let allLabels = document.querySelectorAll('label')
    for(let item of allLabels){
        item.style.display = 'none'
    }
}




function boxTemplait(){
    let idNum = Math.ceil(Math.random(10) * 100)
    // console.log(idNum)
    return `
        <div class = 'box' data-boxid = '${idNum}'>
        <input type="text" name='niall' class='newInputs2' placeholder = 'Display name'>
        <select name='niall' class='newInputs3'>
            <option>It Assistant</option>
            <option>Manager</option>
        </select>
        <input type="text" name='niall' class='newInputs4' placeholder = 'Mail'>
        <input type="text" name='niall' class='newInputs5' placeholder = 'Department'>
        <input type="text" name='niall' class='newInputs6' value='${idNum}' readonly>
        <input type="button" value="save" class="saveBox">
        </div>
    `
}


let btnAdd = document.querySelector('.btn')
btnAdd.addEventListener('click', function(){
    console.log('test')
    btnAdd.insertAdjacentHTML('afterend', boxTemplait())
})





document.addEventListener('click', function(e){
    if(e.target.classList.contains('saveBox')){

        let input1 = document.querySelector('.newInputs2')
        let input2 = document.querySelector('.newInputs3')
        let input3 = document.querySelector('.newInputs4')
        let input4 = document.querySelector('.newInputs5')
        let input5 = document.querySelector('.newInputs6')
        let taskID = Number(input5.value)


        let obj = {
            name: input1.value,
            position: input2.value,
            mail: input3.value,
            department: input4.value,
            id: taskID
        }

        test.push(obj)

        // console.log(test)

        localStorage.setItem('tasks', JSON.stringify(test))

        let saveBtnNone = e.target
        saveBtnNone.style.display = 'none'
    }
})

let test = []



// Удалить из DOM дерева и с localStorage

let allDelButtons = document.querySelectorAll('.del')

// console.log(allDelButtons[0].closest('.alreadyBox'))
for(let i = 0; i < allDelButtons.length; i++){
    allDelButtons[i].addEventListener('click', function (e){
      
    })
}


let tasks = JSON.parse(localStorage.getItem('tasks'))

document.addEventListener('click', function(e){
    if (e.target.classList.contains('del') && confirm('Удалить пользователя?')) {

        let ID = Number(e.target.parentElement.getAttribute('data-boxid'))
        // console.log(`Удаляем элемент`, ID)        
        const newTasks = tasks.filter(task => task.id !== ID) 
        // console.log(newTasks)
        localStorage.setItem('tasks', JSON.stringify(newTasks))

        let deleteFromDom = e.target.parentElement
        deleteFromDom.style.display = 'none'
        location.reload()

    } else {
        return false
    }
})





// =======================================================
// ==================== ФИЛЬТАЦИЯ ========================
// =======================================================
let allInputsLabels = document.getElementsByName('my-radio')

for(let i = 0; i < allInputsLabels.length; i++){
    allInputsLabels[i].addEventListener('change', function(e){
        if(Number(allInputsLabels[i].value) == 1){

            let cont = document.querySelector('.containerBox')
            cont.innerHTML = ''
            
            for(let i of tasks){
                let ii = i
                let iii = i.position
                if(iii == 'Manager'){
                    cont.innerHTML += taskTemplate(ii)
                }
            }
            
        } else if(Number(allInputsLabels[i].value) == 2){

            let cont = document.querySelector('.containerBox')
            cont.innerHTML = ''
            
            for(let i of tasks){
                let ii = i
                let iii = i.position
                if(iii == 'It Assistant'){
                    cont.innerHTML += taskTemplate(ii)
                }
            }
        } else if(Number(allInputsLabels[i].value) == 3){
            let cont = document.querySelector('.containerBox')
            cont.innerHTML = ''

            for(let i of tasks){
                let ii = i
                cont.innerHTML += taskTemplate(ii)
            }
        }
    })
}

let clearAll = document.querySelector('.clearAll').addEventListener('click', function(){
    if(confirm('Удалить всех пользователей?')){
        let clearContainer = document.querySelector('.containerBox')
        clearContainer.innerHTML = ''
        removeLS()
        location.reload()
    } else {
        return false
    }
})