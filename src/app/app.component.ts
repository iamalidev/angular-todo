import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatIconModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  todoList: TodoItem[] = [];

  constructor() {
    this.loadTodoList()
  }

  addTask(text: string): void {
    if (text.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        task: text.trim(),
        completed: false
      };
      this.todoList.push(newTodoItem);
      this.saveTodoList();
    }
  }

  deleteTask(id: number): void {
    this.todoList = this.todoList.filter(item => item.id !== id);
    this.saveTodoList();
  }

  toggleCompleted(id: number): void {
    const todoItem = this.todoList.find(item => item.id === id);
    if (todoItem) {
      todoItem.completed = !todoItem.completed;
      this.saveTodoList();
    }
  }

  saveTodoList(): void {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  loadTodoList(): void {
    const storedList = localStorage.getItem('todoList');
    if (storedList) {
      this.todoList = JSON.parse(storedList)
    }
  }
}
