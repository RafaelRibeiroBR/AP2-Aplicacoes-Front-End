import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { AlunoForm } from './components/aluno-form/aluno-form';
import { AlunoList } from './components/aluno-list/aluno-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, AlunoForm, AlunoList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}