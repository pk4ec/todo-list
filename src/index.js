import "./style.css"
import remove from './media/garbage/red.svg'
import edit from './media/edit/edit.svg'
// projects arr

// obj w/ property pjName / tasks arr

// tasks arr contains task data object


// quest
// make a project duplicate thing
// light/dark mode
// anims
// delete pj/tasks
const projects = [{pjName: 'Default'}]
let activeProject = 'Default'
function createTask(project, _title, _desc, _dueDate, _priority) { // tasks to projects
    if (project == '') { // if no project given, set to default (might not even need)
        project = 'Default'
    }
    for (let i in projects) {
        if (projects[i].pjName == project) { // finds the project wiht the same pjName
            if (!projects[i].tasks) {
            projects[i].tasks = []
            }
            projects[i].tasks[projects[i].tasks.length] = {title: _title, desc: _desc, dueDate: _dueDate, priority: _priority}
        }
    }
}
function makeProject(name) {
    createProject(name)
    refreshProject()
}
function createProject(name) {
    projects[projects.length] = {pjName: name}
}
function removeProject(index) {
    projects.splice(index, 1)
}















function changeProjectPage(pjDestination) {
    document.querySelector('.topname').textContent = pjDestination
    if (document.querySelector('.task') || document.querySelector('.taskexpand')) { //check if tasks exists yet
        console.log(document.querySelector('.task'));
        console.log(document.querySelector('.taskexpand'));
    document.querySelector('.tasklibrary').innerHTML = ''
    }
    for (let i in projects) {
        if (projects[i].pjName == pjDestination) {
            // console.log(pjDestination);
            for (let a in projects[i].tasks) { //how many tasks in a given project
                document.querySelector('.tasklibrary').appendChild(Object.assign(document.createElement('div'), {className: 'task'}))
                document.querySelectorAll('.task')[a].appendChild(Object.assign(document.createElement('input'), 
                {type: 'checkbox', className: 'complete', onchange: function () {
                    if (this.checked) {
                        document.querySelectorAll('.taskname')[a].style.textDecoration = 'line-through'
                        document.querySelectorAll('.taskname')[a].style.textDecorationThickness = '0.3vh'
                    } else {
                        document.querySelectorAll('.taskname')[a].style.textDecoration = 'none'
                    }
                }
                }))
                document.querySelectorAll('.task')[a].appendChild(Object.assign(document.createElement('div'), {className: 'taskname', textContent: projects[i].tasks[a].title}))
                document.querySelectorAll('.task')[a].appendChild(Object.assign(document.createElement('img'), {src: remove, className: 'deletetask', onclick: function () {
                    let index = a
                    console.log(a);
                    projects[i].tasks.splice(a, 1) // i thought 'a' might have problems since it updates so i was gonna use index instead but it works ig?
                    changeProjectPage(pjDestination)
                    console.log(projects);
                }}))

                
                document.querySelectorAll('.taskname')[a].addEventListener('click', function (e) { //for expanding
                    e.stopPropagation()
                    // console.log(a);
                    changeProjectPage(pjDestination)
                    document.querySelectorAll('.task')[a].replaceWith(Object.assign(document.createElement('div'), {className: 'taskexpand', onclick: function () {
                        changeProjectPage(activeProject)
                    }}))

                    document.querySelector('.taskexpand').appendChild(Object.assign(document.createElement('input'), 
                    {type: 'checkbox', className: 'complete completeexpand', onchange: function () {
                    if (this.checked) {
                        document.querySelector('.tasknameexpand').style.textDecoration = 'line-through'
                        document.querySelector('.tasknameexpand').style.textDecorationThickness = '0.3vh'
                    } else {
                        document.querySelector('.tasknameexpand').style.textDecoration = 'none'
                    }
                }
                }))
                    document.querySelector('.taskexpand').appendChild(Object.assign(document.createElement('div'), {className: 'taskname tasknameexpand', textContent: projects[i].tasks[a].title}))
                    document.querySelector('.taskexpand').appendChild(Object.assign(document.createElement('div'), {className: 'descexpand', textContent: projects[i].tasks[a].desc}))
                    document.querySelector('.taskexpand').appendChild(Object.assign(document.createElement('div'), {className: 'dateexpand', textContent: projects[i].tasks[a].dueDate}))
                    document.querySelector('.taskexpand').appendChild(Object.assign(document.createElement('div'), {className: 'priorityexpand', textContent: projects[i].tasks[a].priority}))
                    document.querySelector('.taskexpand').appendChild(Object.assign(document.createElement('img'), {className: 'deleteexpand', src: remove, onclick: function () {
                    console.log(a);
                    projects[i].tasks.splice(a, 1)
                    changeProjectPage(pjDestination)
                    console.log(projects);
                }}))

                    

                })
            }
        }
    }
}






















function refreshProject() {
    document.querySelector('.projectlibrary').innerHTML = '' //so fucking stupid
    for (let i in projects) {
        document.querySelector('.projectlibrary').appendChild(Object.assign(document.createElement('div'), {
            textContent: projects[i].pjName, className: `project ${projects[i].pjName} pages`}).cloneNode(true))

        document.querySelectorAll('.project')[i].addEventListener('click', function () {
            activeProject = this.className.split(' ')[1]
            // console.log(activeProject); // remove could fuck with activeproject

            for (let i in projects) {
                if (projects[i].pjName == this.className.split(' ')[1]) {
                    // console.log(projects[i].pjName);
                    changeProjectPage(projects[i].pjName)
                }
            }
        })
        if (projects[i].pjName != projects[0].pjName) { //if delete while on said project, return to default project
        document.querySelectorAll('.project')[i].appendChild(Object.assign(document.createElement('img'), {
            src: remove, className: `garbage`, onclick: function(e) {
                e.stopPropagation()
                this.index = i;
                let nameTest = projects[i].pjName
                removeProject(this.index)
                refreshProject() // even though index doesnt update, it seems to work fine, dont touch
                if (nameTest == activeProject) {
                    changeProjectPage('Default')
                }
                console.log(projects);
            }}))
        }
    }
}
let popup = false;
document.querySelector('.addtask').addEventListener('click', function () { //popup
    if (!popup) {
        popup = true
        document.querySelector('body').appendChild(Object.assign(document.createElement('div'), {className: 'popup'}))
        document.querySelector('.popup').appendChild(Object.assign(document.createElement('input'), {className: `popuptitle input`, type:'text', placeholder:'What do you want to do?'}))
        document.querySelector('.popup').appendChild(Object.assign(document.createElement('input'), {className: `popupdesc input`, type:'text', placeholder:'Description'}))
        document.querySelector('.popup').appendChild(Object.assign(document.createElement('div'), {className: `bottomthing`}))
            document.querySelector('.bottomthing').appendChild(Object.assign(document.createElement('div'), {className: `datething`}))
                document.querySelector('.datething').appendChild(Object.assign(document.createElement('p'), {textContent: 'Date'}))
                document.querySelector('.datething').appendChild(Object.assign(document.createElement('input'), {className: `popupdate input`, type:'date'}))
            document.querySelector('.bottomthing').appendChild(Object.assign(document.createElement('div'), {className: `priothing`}))
                document.querySelector('.priothing').appendChild(Object.assign(document.createElement('p'), {textContent: 'Priority'}))
                document.querySelector('.priothing').appendChild(Object.assign(document.createElement('select'), {className: 'popuppriority input', name:'priority'}))
                document.querySelector('select').appendChild(Object.assign(document.createElement('option'), {value: 'high', textContent: 'High'}))
                document.querySelector('select').appendChild(Object.assign(document.createElement('option'), {value: 'medium', textContent: 'Medium'}))
                document.querySelector('select').appendChild(Object.assign(document.createElement('option'), {value: 'low', textContent: 'Low'}))
        document.querySelector('.popup').appendChild(Object.assign(document.createElement('div'), {className: `lastdiv`}))
            document.querySelector('.lastdiv').appendChild(Object.assign(document.createElement('button'), {className: `cancel`, textContent: 'Cancel'}))
            document.querySelector('.lastdiv').appendChild(Object.assign(document.createElement('button'), {className: `submit`, textContent: 'Submit'}))

        document.querySelector('.cancel').addEventListener('click', function () {
            popup = false
            document.querySelector('.popup').remove()
        })
        document.querySelector('.submit').addEventListener('click', function () {
            if (document.querySelector('.popuptitle').value != '' && document.querySelector('.popupdesc').value != '' && document.querySelector('.popupdate').value != '') {
            createTask(activeProject, document.querySelector('.popuptitle').value, document.querySelector('.popupdesc').value, document.querySelector('.popupdate').value, document.querySelector('.popuppriority').value)
            popup = false
            document.querySelector('.popup').remove()
            changeProjectPage(activeProject)
            }




        })
    } else {
        popup = false
        document.querySelector('.popup').remove() // parent.remove(child) is obsolete, do element.remove() instead
    }
})
document.addEventListener("click", function (e) { //create project
  if (document.querySelector('.createproject').contains(e.target)) {
    if (!document.querySelector('.createproject').contains(document.querySelector('.typespace'))) {
    document.querySelector('.createproject').appendChild(Object.assign(document.createElement('input'), {className: 'typespace'})) // create typespace
    document.querySelector('.typespace').addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        makeProject(document.querySelector('.typespace').value)
        document.querySelector('.createproject').removeChild(document.querySelector('.typespace'))
        console.log(projects);
    }
    });
    }
    document.querySelector('.typespace').focus()
  } else if (document.querySelector('.createproject').contains(document.querySelector('.typespace'))) {
    document.querySelector('.createproject').removeChild(document.querySelector('.typespace'))
  }
});
document.querySelector('.content').addEventListener('click', function(e) {
  if (e.target !== parent) return; // Ignore if click came from any child
      console.log('THE FUCK');
    e.stopPropagation()
    changeProjectPage(activeProject)
});



makeProject('test')
makeProject('hw')
makeProject('misc')
createTask('', 'title', 'desxc', 'dduedate', 'highhh')
createTask('', 'a', 'a', 'a', 'Low')
createTask('', 'b', 'b', 'b', 'b')
createTask('', 'z', 'z', 'z', 'z')
createTask('hw', 'c', 'c', 'c', 'c')
createTask('misc', 'w', 'w', 'w', 'w')
refreshProject() // keep this
changeProjectPage('Default')
console.log(projects);