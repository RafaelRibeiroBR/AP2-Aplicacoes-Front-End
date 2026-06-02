import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Aluno } from '../../model/alunos';
import { AlunoService } from '../../services/aluno.service';

@Component({
  selector: 'app-aluno-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './aluno-form.html',
  styleUrls: ['./aluno-form.css']
})
export class AlunoForm {

  @Output() salvo = new EventEmitter<void>();

  private readonly alunoService = inject(AlunoService);

  mensagemSucesso = '';
  mensagemErro = '';

  modoEdicao = false;

  alunoEditandoId: number | string | undefined;

  aluno: Aluno = {
    nome: '',
    idade: '',
    curso: '',
    formado: false
  };

  salvar(): void {

    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.alunoService.criar(this.aluno).subscribe({

      next: () => {

        this.mensagemSucesso =
          'Aluno cadastrado com sucesso!';

        this.aluno = {
          nome: '',
          idade: '',
          curso: '',
          formado: false
        };

        this.salvo.emit();
      },

      error: () => {

        this.mensagemErro =
          'Erro ao cadastrar aluno.';

      }

    });

  }
}