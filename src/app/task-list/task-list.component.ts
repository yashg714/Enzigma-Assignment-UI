import { Component, OnInit, Output, EventEmitter, Input, ViewChild, Renderer2 } from '@angular/core';
import { TaskService, Task } from '../task.service';
import { TaskFormComponent } from '../task-form/task-form.component';



@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  originalTasks: Task[] = [];
  actionFlag: boolean = false;
  @ViewChild('dialog') dialog!: TaskFormComponent;
  isEdit: boolean = false;
  editTask: Task = {userId:'',taskId:'',status:'',priority:'',dueDate:'',description:''};

  constructor(private taskService: TaskService,private renderer: Renderer2) {
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
      this.originalTasks = data;
    })
  }

  createTask(){
    this.isEdit = false;
    this.openDialog();
  }
  editTaskFun(task:Task) {
    this.editTask = task;
    this.isEdit = true;
    this.openDialog(task);
    //   this.openForm.emit(task);
  }

  deleteTask(id:any) {
    this.taskService.deleteTask(id).subscribe(res=>{
      console.log(res);
    });
    this.getTasks();
  }

  openDialog(task?:Task) {
    if(this.isEdit){
      this.dialog.isEdit = true;
      this.dialog.editTask = task || {userId:'',taskId:'',status:'',priority:'',dueDate:'',description:''};
    }else{
      this.dialog.isEdit = false;
      //this.dialog.editTask =;
    }
    this.dialog.open();
  }

  handleClose() {
    this.getTasks();
    console.log('Dialog closed');
  }

  handleSave() {
    this.getTasks();
    console.log('Save action performed');
  }

  toggleDropdown(){
    this.actionFlag = !this.actionFlag;
  }

  checkCheckbox(checkboxId: any) {
    const checkbox = this.renderer.selectRootElement(`#checkbox-${checkboxId}`) as HTMLInputElement;
    return checkbox.checked;
  }

  onKeyPress(event: KeyboardEvent) {
    let pressedKey = event.key;
    this.tasks = this.originalTasks.filter(task => 
      task.userId?.toLowerCase().includes(pressedKey) ||
      task.status?.toLowerCase().includes(pressedKey) ||
      task.dueDate?.toLowerCase().includes(pressedKey) ||
      task.priority?.toLowerCase().includes(pressedKey) ||
      task.description?.toLowerCase().includes(pressedKey)
    );
    if(pressedKey.length==0)
      this.tasks = this.originalTasks
  }
}
