import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService,Task } from '../task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit{
  task = {userId:'',taskId:'',status:'',priority:'',dueDate:'',description:''};
  statusList:String[] = ['Not Started','In Progress','Completed','Waiting on someone else','Deffered'];
  priorityList:String[] = ['Normal','Low','High'];
  userList: string[] = ['User 1','User 2','User 3','User 4'];
  heading:string = 'New Task';
  taskForm: FormGroup;
  isOpen = false;

  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();
  isEdit: boolean = false;
  editTask: Task = {userId:'',taskId:'',status:'',priority:'',dueDate:'',description:''};

  constructor(private fb: FormBuilder,private taskService:TaskService){
    this.taskForm = this.fb.group({
      userId: ['null', Validators.required],
      status: ['null', Validators.required],
      dueDate: ['null', Validators.required],
      priority: ['null', Validators.required],
      description: ['null'],
      taskId:['']
    });
  
  }

  ngOnInit(): void {
    
  }
  open() {
    if(this.isEdit){
      this.heading = "Edit Task";
      this.taskForm.patchValue({taskId:this.editTask.taskId,userId:this.editTask.userId,status:this.editTask.status,priority:this.editTask.priority,dueDate:this.editTask.dueDate?.substring(0, 10),description:this.editTask.description});
    }else{
      this.heading = "New Task";
    }
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    this.taskForm.reset();
    this.onClose.emit();
  }

  save() {
    // Perform save action
    this.isOpen = false;
    this.onSave.emit();
  }
  onSubmit() {
    if(this.taskForm.valid){
      this.task = this.taskForm.value;
      if(this.isEdit){
        this.taskService.updateTask(this.task).subscribe(res =>{
          console.log("Response:-",res);
          this.taskForm.reset();
          this.save();
        });
      }else{
        this.taskService.addTask(this.task).subscribe(res =>{
          console.log("Response:-",res);
          this.taskForm.reset();
          this.save();
        });
      }
      
    } else{
      console.log('Invalid Form');
    }
    
  }
}
